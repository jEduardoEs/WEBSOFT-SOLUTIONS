import Link from 'next/link';
import {
  dashboardStats,
  executiveReports,
  invoices,
  crmModules,
  customerAccounts,
  supportTickets,
  billingSummaries,
  activityTimeline,
  salesGoals,
  rolePermissions,
  salesPipeline,
  sampleOrders,
} from '@jeduardoes/shared';

const roleSummaries = rolePermissions.filter((role) => role.role !== 'guest');

export default function DashboardOverviewPage() {
  return (
    <>
      <section className="dashboard-section">
        <header>
          <span className="badge">Panel central</span>
          <h2>Bienvenido al hub operativo de WEBSOFT SOLUTIONS</h2>
        </header>
        <p>
          Desde este dashboard coordinamos la experiencia de clientes, empleados, administradores y el equipo ejecutivo. Aquí
          tienes una vista previa de los módulos clave habilitados para tu negocio.
        </p>
        <div className="metrics-grid">
          {dashboardStats.map((stat) => (
            <div className="metric-card" key={stat.label}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <small>{stat.trend > 0 ? '▲' : '▼'} {Math.abs(stat.trend)}% · {stat.trendLabel}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="dashboard-section">
        <h2>Resumen rápido de ventas y operaciones</h2>
        <div className="card-grid">
          <div className="card" style={{ background: 'rgba(37, 99, 235, 0.12)' }}>
            <h3>Ventas registradas</h3>
            <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
              {salesPipeline.map((sale) => (
                <li key={sale.id}>
                  {sale.customerName} · {sale.status === 'completed' ? 'Completada' : sale.status === 'pending' ? 'Pendiente' : 'Reembolsada'} ·
                  ${sale.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </li>
              ))}
            </ul>
          </div>
          <div className="card" style={{ background: 'rgba(15, 23, 42, 0.85)', color: '#f8fafc' }}>
            <h3>Últimas órdenes de clientes</h3>
            <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
              {sampleOrders.map((order) => (
                <li key={order.id}>
                  Orden {order.id} · {order.status.toUpperCase()} · {order.items.length} productos
                </li>
              ))}
            </ul>
          </div>
          <div className="card" style={{ background: 'rgba(59, 130, 246, 0.16)' }}>
            <h3>Facturación reciente</h3>
            <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
              {invoices.map((invoice) => (
                <li key={invoice.id}>
                  Factura {invoice.id} · {invoice.currency} {invoice.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="dashboard-section">
        <h2>CRM y relacionamiento con clientes</h2>
        <div className="card-grid">
          <div className="card">
            <h3>Módulos destacados</h3>
            <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
              {crmModules.slice(0, 3).map((module) => (
                <li key={module.id}>{module.title} · {module.highlights[0]}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3>Clientes activos</h3>
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
                    {account.companyName} · Valor anual ${account.annualValue.toLocaleString('es-MX')} · Salud {healthLabel}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="card">
            <h3>Tickets de soporte</h3>
            <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
              {supportTickets.slice(0, 3).map((ticket) => (
                <li key={ticket.id}>
                  {ticket.subject} · {ticket.priority.toUpperCase()} · {ticket.status.toUpperCase()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="dashboard-section">
        <h2>Experiencias por rol</h2>
        <div className="card-grid">
          {roleSummaries.map((role) => (
            <article className="card" key={role.role}>
              <span className="badge">{role.role.toUpperCase()}</span>
              <h3>{role.description}</h3>
              <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                {role.capabilities.map((capability) => (
                  <li key={capability}>{capability}</li>
                ))}
              </ul>
              <Link
                className="button-primary glass-interactive"
                href={`/dashboard/${role.role}`}
                style={{ justifySelf: 'flex-start' }}
              >
                Entrar al módulo
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="dashboard-section">
        <h2>Reportería ejecutiva</h2>
        <div className="card-grid">
          {executiveReports.map((report) => (
            <article className="card" key={report.id}>
              <h3>{report.title}</h3>
              <p>{report.description}</p>
              <p style={{ margin: 0, color: '#1d4ed8', fontWeight: 600 }}>Actualizado: {new Date(report.generatedAt).toLocaleDateString()}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="dashboard-section">
        <h2>Finanzas y seguimiento de objetivos</h2>
        <div className="card-grid">
          <div className="card">
            <h3>Resumen de facturación</h3>
            <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
              {billingSummaries.map((summary) => (
                <li key={summary.month}>
                  {summary.month}: {summary.currency} {summary.revenue.toLocaleString('es-MX')} · Cobro{' '}
                  {(summary.collectedRate * 100).toFixed(0)}%
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3>Objetivos comerciales</h3>
            <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
              {salesGoals.map((goal) => (
                <li key={goal.id}>
                  {goal.label}: {goal.progress}% de {goal.target}%
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3>Últimas actividades</h3>
            <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
              {activityTimeline.slice(0, 4).map((activity) => (
                <li key={activity.id}>
                  {activity.description} · {new Date(activity.timestamp).toLocaleDateString('es-MX')}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
