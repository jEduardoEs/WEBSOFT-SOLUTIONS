export type Role = 'visitor' | 'user' | 'employee' | 'admin' | 'superadmin';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  roles: Role[];
  firstName: string;
  lastName: string;
}

export interface JwtPayload {
  sub: string;
  email: string;
  roles: Role[];
}
