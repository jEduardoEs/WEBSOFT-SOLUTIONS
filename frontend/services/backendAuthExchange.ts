import { getBackendClient } from '../lib/backendClient';
import type { BackendTokens } from '../lib/types';

interface BackendLoginResponse extends BackendTokens {
  user?: unknown;
}

export async function exchangeAuth0TokenForBackendCredentials(auth0AccessToken: string) {
  try {
    const client = getBackendClient();
    const response = await client.post<BackendLoginResponse>('/auth/login', {
      email: 'auth0-token-exchange',
      password: auth0AccessToken
    });
    const { accessToken, refreshToken, roles } = response.data;
    const tokens: BackendTokens = { accessToken, refreshToken, roles };
    return tokens;
  } catch (error) {
    console.warn('Could not exchange Auth0 token for backend credentials', error);
    return null;
  }
}
