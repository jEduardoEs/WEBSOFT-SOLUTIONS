import { notFound } from 'next/navigation';
import {
  catalogProducts,
  catalogServices,
  dashboardStats,
  executiveReports,
  invoices,
  rolePermissions,
  salesPipeline,
  sampleOrders,
  crmModules,
  customerPortalFeatures,
  customerAccounts,
  supportTickets,
  salesGoals,
  activityTimeline,
  type RolePermission,
  formatCurrency,
} from '@jeduardoes/shared';

const allowedRoles = ['guest', 'customer', 'employee', 'admin', 'superadmin'] as const;

type AllowedRole = (typeof allowedRoles)[number];

type RolePageProps = {
  params: { role: string };
};

const roleTitles: Record<AllowedRole, string> = {
  guest: 'Experiencia pública: catálogo sin iniciar sesión',
  customer: 'Panel del cliente: catálogo inteligente y compras seguras',
  employee: 'Panel del empleado: punto de venta y facturación en vivo',
  admin: 'Panel del administrador: reportes, catálogo y campañas',
  superadmin: 'Panel del super admin: gobernanza, seguridad y auditoría',
};

function getRoleDefinition(role: AllowedRole): RolePermission {
  const definition = rolePermissions.find((item) => item.role === role);
  if (!definition) {
    throw new Error(`Role definition missing for ${role}`);
  }
  return definition;
}

export default function RoleDashboardPage({ params }: RolePageProps) {
  const roleParam = params.role as AllowedRole;

  if (!allowedRoles.includes(roleParam)) {
    notFound();
  }

  const definition = getRoleDefinition(roleParam);

  return (
    <section className="dashboard-section">
      <header>
        <span className="badge">{definition.role.toUpperCase()}</span>
        <h2>{roleTitles[roleParam]}</h2>
        <p>{definition.description}</p>
      </header>

      <div className="card-grid">
        {roleParam === 'guest' ? (
          <>
            <article className="card">
              <h3>Explora nuestras soluciones</h3>
              <p>
                Los visitantes pueden conocer productos, servicios y testimonios antes de registrarse. El formulario de contacto
                está disponible para agendar una demo.
              </p>
            </article>
            <article className="card">
              <h3>Catálogo público</h3>
              <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                {catalogProducts.slice(0, 3).map((product) => (
                  <li key={product.id}>{product.name}</li>
                ))}
              </ul>
            </article>
            <article className="card">
              <h3>Vista previa del CRM</h3>
              <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                {crmModules.slice(0, 2).map((module) => (
                  <li key={module.id}>{module.title}</li>
                ))}
              </ul>
            </article>
          </>
        ) : null}

        {roleParam === 'customer' ? (
          <>
            <article className="card">
              <h3>Productos sugeridos para ti</h3>
              <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                {catalogProducts.slice(0, 3).map((product) => (
                  <li key={product.id}>
                    {product.name} · {formatCurrency(product.price, product.currency)}
                  </li>
                ))}
              </ul>
            </article>
            <article className="card">
              <h3>Historial de compras</h3>
              <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                {sampleOrders.map((order) => (
                  <li key={order.id}>
                    Orden {order.id} · {order.status.toUpperCase()} · {order.items.length} productos
                  </li>
                ))}
              </ul>
            </article>
            <article className="card">
              <h3>Portal de clientes</h3>
              <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                {customerPortalFeatures.map((feature) => (
                  <li key={feature.id}>{feature.title}</li>
                ))}
              </ul>
            </article>
          </>
        ) : null}

        {roleParam === 'employee' ? (
          <>
            <article className="card">
              <h3>Ventas en curso</h3>
              <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                {salesPipeline.map((sale) => (
                  <li key={sale.id}>
                    {sale.customerName} · {sale.status === 'completed' ? 'Completada' : sale.status === 'pending' ? 'Pendiente' : 'Reembolsada'} · {formatCurrency(sale.total)}
                  </li>
                ))}
              </ul>
            </article>
            <article className="card">
              <h3>Facturas listas para envío</h3>
              <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                {invoices.map((invoice) => (
                  <li key={invoice.id}>
                    {invoice.id} · {formatCurrency(invoice.total, invoice.currency)}
                  </li>
                ))}
              </ul>
            </article>
            <article className="card">
              <h3>Tickets en seguimiento</h3>
              <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                {supportTickets.slice(0, 3).map((ticket) => (
                  <li key={ticket.id}>{ticket.subject} · {ticket.status.toUpperCase()}</li>
                ))}
              </ul>
            </article>
          </>
        ) : null}

        {roleParam === 'admin' ? (
          <>
            <article className="card">
              <h3>Métricas clave</h3>
              <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                {dashboardStats.map((metric) => (
                  <li key={metric.label}>
                    {metric.label}: {metric.value} ({metric.trend > 0 ? '▲' : '▼'} {Math.abs(metric.trend)}%)
                  </li>
                ))}
              </ul>
            </article>
            <article className="card">
              <h3>Servicios para impulsar campañas</h3>
              <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                {catalogServices.slice(0, 3).map((service) => (
                  <li key={service.id}>
                    {service.name} · {service.billingCycle === 'one-time' ? 'Pago único' : `Plan ${service.billingCycle}`}
                  </li>
                ))}
              </ul>
            </article>
            <article className="card">
              <h3>Clientes clave</h3>
              <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                {customerAccounts.slice(0, 3).map((account) => {
                  const healthLabel =
                    account.health === 'excellent'
                      ? 'Excelente'
                      : account.health === 'good'
                        ? 'Buena'
                        : 'En riesgo';
                  return (
                    <li key={account.id}>
                      {account.companyName} · Salud {healthLabel}
                    </li>
                  );
                })}
              </ul>
            </article>
          </>
        ) : null}

        {roleParam === 'superadmin' ? (
          <>
            <article className="card">
              <h3>Reportes ejecutivos</h3>
              <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                {executiveReports.map((report) => (
                  <li key={report.id}>
                    {report.title} · Actualizado {new Date(report.generatedAt).toLocaleDateString('es-MX')}
                  </li>
                ))}
              </ul>
            </article>
            <article className="card">
              <h3>Acciones recomendadas</h3>
              <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                <li>Auditar actividad crítica y accesos privilegiados.</li>
                <li>Configurar respaldos automáticos de base de datos.</li>
                <li>Actualizar integraciones con pasarelas de pago y branding.</li>
              </ul>
            </article>
            <article className="card">
              <h3>Metas y actividad</h3>
              <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                {salesGoals.slice(0, 2).map((goal) => (
                  <li key={goal.id}>{goal.label}: {goal.progress}%</li>
                ))}
                {activityTimeline.slice(0, 2).map((activity) => (
                  <li key={activity.id}>{activity.description}</li>
                ))}
              </ul>
            </article>
          </>
        ) : null}
      </div>
    </section>
  );
}
