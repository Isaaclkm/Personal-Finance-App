import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/',
  },
  callbacks: {
  authorized({ auth, request: { nextUrl } }) {
    const { pathname } = nextUrl;

    // ✅ Allow static assets & images
    if (
      pathname.startsWith('/_next') ||
      pathname.startsWith('/assets') ||
      pathname === '/favicon.ico'
    ) {
      return true;
    }

    const isLoggedIn = !!auth?.user;
    const isOnDashboard = pathname.startsWith('/dashboard');

    if (isOnDashboard) {
      return isLoggedIn;
    }

    if (isLoggedIn) {
      return Response.redirect(new URL('/dashboard', nextUrl));
    }

    return true;
  },
},
  providers: [],
} satisfies NextAuthConfig;