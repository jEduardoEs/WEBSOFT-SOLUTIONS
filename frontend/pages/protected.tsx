import { withRoleProtection } from '../components/withRoleProtection';
import type { Role } from '../lib/roles';

function ProtectedPage() {
  return (
    <main>
      <section>
        <h1>Área protegida</h1>
        <p>Solo los usuarios autenticados con rol de usuario, empleado o superior pueden ver esto.</p>
      </section>
    </main>
  );
}

const allowedRoles: Role[] = ['user', 'employee', 'admin', 'superadmin'];

export default withRoleProtection(ProtectedPage, { roles: allowedRoles });
