import bcrypt from 'bcrypt';
import { users, budgets, pots } from '../lib/placeholder-data';
import { getSql } from '../lib/db';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/* -------------------- SEED FUNCTIONS -------------------- */

async function seedUsers(sql: ReturnType<typeof getSql>) {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );
}

async function seedBudgets(sql: ReturnType<typeof getSql>) {
  await sql`
    CREATE TABLE IF NOT EXISTS budgets (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      category VARCHAR(255) NOT NULL,
      maximum_spend INT NOT NULL,
      theme VARCHAR(50) NOT NULL,
      amount INT NOT NULL
    );
  `;

  await Promise.all(
    budgets.map((budget) =>
      sql`
        INSERT INTO budgets (id, category, maximum_spend, theme, amount)
        VALUES (
          ${budget.id},
          ${budget.category},
          ${budget.maximum_spend},
          ${budget.theme},
          ${budget.amount}
        )
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );
}

async function seedPots(sql: ReturnType<typeof getSql>) {
  await sql`
    CREATE TABLE IF NOT EXISTS pots (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      target INT NOT NULL,
      theme VARCHAR(50) NOT NULL,
      total INT NOT NULL
    );
  `;

  await Promise.all(
    pots.map((pot) =>
      sql`
        INSERT INTO pots (id, name, target, theme, total)
        VALUES (
          ${pot.id},
          ${pot.name},
          ${pot.target},
          ${pot.theme},
          ${pot.total}
        )
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );
}

/* -------------------- ROUTE HANDLER -------------------- */

export async function GET() {
  const sql = getSql(); // ✅ runtime-only DB connection

  try {
    // Reset only what you want
    await sql`DROP TABLE IF EXISTS budgets CASCADE`;
    await sql`DROP TABLE IF EXISTS pots CASCADE`;

    // Seed
    await seedUsers(sql);
    console.log('Users checked/seeded');

    await seedBudgets(sql);
    console.log('Budgets seeded');

    await seedPots(sql);
    console.log('Pots seeded');

    return Response.json({
      message: 'Essential tables seeded successfully',
    });
  } catch (error: any) {
    console.error('Seeding Error:', error.message);
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
