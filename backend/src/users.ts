import bcrypt from 'bcryptjs';
import { User } from './types';

const seedUsers: Array<Omit<User, 'passwordHash'>> = [
  {
    id: '1',
    email: 'visitor@example.com',
    roles: ['visitor'],
    firstName: 'Valeria',
    lastName: 'Visitante'
  },
  {
    id: '2',
    email: 'user@example.com',
    roles: ['user'],
    firstName: 'Ursula',
    lastName: 'Usuario'
  },
  {
    id: '3',
    email: 'employee@example.com',
    roles: ['employee'],
    firstName: 'Emilio',
    lastName: 'Empleado'
  },
  {
    id: '4',
    email: 'admin@example.com',
    roles: ['admin'],
    firstName: 'Ana',
    lastName: 'Admin'
  },
  {
    id: '5',
    email: 'superadmin@example.com',
    roles: ['superadmin', 'admin'],
    firstName: 'Sofía',
    lastName: 'SuperAdmin'
  }
];

const DEFAULT_PASSWORD = 'P@ssword123';

export const users: User[] = seedUsers.map((user) => ({
  ...user,
  passwordHash: bcrypt.hashSync(DEFAULT_PASSWORD, 10)
}));

export function findUserByEmail(email: string): User | undefined {
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(id: string): User | undefined {
  return users.find((user) => user.id === id);
}
