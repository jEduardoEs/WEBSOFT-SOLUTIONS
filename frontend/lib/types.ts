import type { Role } from './roles';

export interface BackendProfile {
  sub: string;
  email: string;
  roles: Role[];
}

export interface BackendTokens {
  accessToken: string;
  refreshToken: string;
  roles: Role[];
}
