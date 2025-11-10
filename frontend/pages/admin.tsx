import { withRoleProtection } from '../components/withRoleProtection';

function AdminPage() {
  return (
    <main>
      <section>
        <h1>Panel administrativo</h1>
        <p>Solo usuarios con roles admin o superadmin pueden ver esta página.</p>
      </section>
    </main>
  );
}

export default withRoleProtection(AdminPage, { roles: ['admin', 'superadmin'] });
