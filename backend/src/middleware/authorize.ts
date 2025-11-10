import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './authenticate';
import { Role } from '../types';

export function authorizeRoles(...allowedRoles: Role[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const roles = req.user?.roles ?? [];

    if (allowedRoles.length === 0) {
      return next();
    }

    const hasRole = roles.some((role) => allowedRoles.includes(role));
    if (!hasRole) {
      return res.status(403).json({ message: 'Insufficient permissions', requiredRoles: allowedRoles });
    }

    return next();
  };
}
