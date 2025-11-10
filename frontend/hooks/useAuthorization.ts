import { useMemo } from 'react';
import { useSession } from 'next-auth/react';
import type { Role } from '../lib/roles';

export function useAuthorization(requiredRoles?: Role[]) {
  const { data: session, status } = useSession();

  const roles = (session?.user?.roles ?? ['visitor']) as Role[];

  const isAuthorized = useMemo(() => {
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }
    return requiredRoles.some((role) => roles.includes(role));
  }, [requiredRoles, roles]);

  return {
    roles,
    isAuthorized,
    isLoading: status === 'loading'
  };
}
