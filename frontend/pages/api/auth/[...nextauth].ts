import NextAuth from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';
import EmailProvider from 'next-auth/providers/email';
import type { NextAuthOptions } from 'next-auth';
import { exchangeAuth0TokenForBackendCredentials } from '../../../services/backendAuthExchange';
import type { Role } from '../../../lib/roles';

const AUTH0_ROLES_NAMESPACE = process.env.AUTH0_ROLES_NAMESPACE ?? 'https://jeduardoes.com/roles';

export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID ?? '',
      clientSecret: process.env.AUTH0_CLIENT_SECRET ?? '',
      issuer: process.env.AUTH0_ISSUER ?? ''
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (account && account.provider === 'auth0') {
        const namespaceRoles = profile?.[AUTH0_ROLES_NAMESPACE] as Role[] | undefined;
        if (namespaceRoles?.length) {
          token.roles = namespaceRoles;
        }
        token.auth0AccessToken = account.access_token;
      }

      if (user && !token.roles) {
        token.roles = ['user'];
      }

      if (account && token.auth0AccessToken) {
        const exchange = await exchangeAuth0TokenForBackendCredentials(token.auth0AccessToken);
        if (exchange) {
          token.backendTokens = exchange;
          token.roles = exchange.roles;
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.user = session.user ?? { email: token.email ?? '' };
      session.user.roles = (token.roles as Role[] | undefined) ?? ['visitor'];
      session.backendTokens = token.backendTokens as any;
      return session;
    }
  }
};

export default NextAuth(authOptions);
