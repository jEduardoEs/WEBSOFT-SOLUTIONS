import { ComponentType } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { AccessDenied } from './AccessDenied';
import { useAuthorization } from '../hooks/useAuthorization';
import type { Role } from '../lib/roles';

interface Options {
  roles?: Role[];
}

export function withRoleProtection<P>(Component: ComponentType<P>, options?: Options) {
  const WrappedComponent = (props: P) => {
    const { status } = useSession({
      required: true,
      onUnauthenticated() {
        signIn();
      }
    });

    const { isAuthorized, roles, isLoading } = useAuthorization(options?.roles);

    if (status === 'loading' || isLoading) {
      return <p>Cargando permisos...</p>;
    }

    if (!isAuthorized) {
      return <AccessDenied requiredRoles={options?.roles} roles={roles} />;
    }

    return <Component {...props} />;
  };

  WrappedComponent.displayName = `withRoleProtection(${Component.displayName ?? Component.name ?? 'Component'})`;

  return WrappedComponent;
}
