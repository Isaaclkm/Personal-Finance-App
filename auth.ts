import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcryptjs';
import postgres from 'postgres';

export const runtime = 'nodejs'; // ✅ REQUIRED

function getSql() {
  return postgres(process.env.POSTGRES_URL_NON_POOLING!, {
    ssl: 'require',
  });
}

async function getUser(email: string): Promise<User | undefined> {
  const sql = getSql();

  try {
    const users = await sql<User[]>`
      SELECT * FROM users WHERE email = ${email}
    `;
    return users[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return undefined;
  }
  console.log('DB HOST:', process.env.POSTGRES_URL_NON_POOLING);
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const parsed = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const user = await getUser(email);
        if (!user) return null;

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return null;

        const { password: _, ...safeUser } = user;
        return safeUser;
      },
    }),
  ],
});
