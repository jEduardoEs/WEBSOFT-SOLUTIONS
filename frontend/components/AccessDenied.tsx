import type { Role } from '../lib/roles';

interface Props {
  requiredRoles?: Role[];
  roles?: Role[];
}

export function AccessDenied({ requiredRoles, roles }: Props) {
  return (
    <div>
      <h2>Acceso denegado</h2>
      <p>No tienes permisos para ver este contenido.</p>
      {requiredRoles?.length ? (
        <p>
          Roles requeridos: <strong>{requiredRoles.join(', ')}</strong>
        </p>
      ) : null}
      {roles?.length ? <p>Tus roles: {roles.join(', ')}</p> : null}
    </div>
  );
}
