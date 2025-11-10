import { Injectable } from '@nestjs/common';
import { companyUsers, rolePermissions, type RolePermission, type User, type UserRole } from '@jeduardoes/shared';

@Injectable()
export class UsersService {
  getUsers(role?: UserRole): User[] {
    if (!role) {
      return companyUsers;
    }

    return companyUsers.filter((user) => user.role === role);
  }

  getRolePermissions(): RolePermission[] {
    return rolePermissions;
  }
}
