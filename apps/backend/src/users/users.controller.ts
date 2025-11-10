import { Controller, Get, Query } from '@nestjs/common';
import { type RolePermission, type User, type UserRole } from '@jeduardoes/shared';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(@Query('role') role?: UserRole): User[] {
    return this.usersService.getUsers(role);
  }

  @Get('roles')
  getRoles(): RolePermission[] {
    return this.usersService.getRolePermissions();
  }
}
