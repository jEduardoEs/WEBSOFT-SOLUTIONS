export type Role = 'visitor' | 'user' | 'employee' | 'admin' | 'superadmin';

export const roleLabels: Record<Role, string> = {
  visitor: 'Visitante',
  user: 'Usuario',
  employee: 'Empleado',
  admin: 'Administrador',
  superadmin: 'Super Administrador'
};
