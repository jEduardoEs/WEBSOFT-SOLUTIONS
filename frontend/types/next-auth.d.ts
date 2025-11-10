import NextAuth from 'next-auth';
import 'next-auth/jwt';
import type { Role } from '../lib/roles';
import type { BackendTokens } from '../lib/types';

declare module 'next-auth' {
  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      roles: Role[];
    };
    backendTokens?: BackendTokens | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    roles?: Role[];
    auth0AccessToken?: string;
    backendTokens?: BackendTokens | null;
  }
}
