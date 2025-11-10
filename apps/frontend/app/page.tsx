'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  catalogProducts,
  catalogServices,
  companyProfile,
  partners,
  crmModules,
  customerAccounts,
  customerPortalFeatures,
  rolePermissions,
  testimonials,
  billingSummaries,
  formatCurrency,
} from '@jeduardoes/shared';

const heroHighlights = [
  'Consultoría y soluciones tecnológicas de clase mundial',
  'Implementaciones rápidas con soporte 24/7',
  'Paneles inteligentes para administradores y empleados',
];

export default function HomePage() {
  const [activeRole, setActiveRole] = useState(rolePermissions[1]);

  const featuredProducts = useMemo(() => catalogProducts.slice(0, 3), []);
  const featuredServices = useMemo(() => catalogServices.slice(0, 3), []);
  const highlightedModules = useMemo(() => crmModules.slice(0, 3), []);
  const spotlightAccounts = useMemo(() => customerAccounts.slice(0, 3), []);
  const portalHighlights = useMemo(() => customerPortalFeatures, []);
  const latestBilling = useMemo(() => billingSummaries.slice(-3).reverse(), []);

  return (
    <main>
      <header className="glass-header">
        <div className="container">
          <nav className="nav-shell glass-panel">
            <div className="brand">
              <div className="brand-mark">WS</div>
              <div>
                <strong>{companyProfile.name}</strong>
                <p>{companyProfile.tagline}</p>
              </div>
            </div>
            <div className="menu">
              <a className="menu-link glass-interactive" href="#productos">
                Productos
              </a>
              <a className="menu-link glass-interactive" href="#servicios">
                Servicios
              </a>
              <a className="menu-link glass-interactive" href="#crm">
                CRM 360°
              </a>
              <a className="menu-link glass-interactive" href="#clientes">
                Clientes
              </a>
              <a className="menu-link glass-interactive" href="#roles">
                Roles
              </a>
              <a className="menu-link glass-interactive" href="#contacto">
                Contacto
              </a>
            </div>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <div className="card">
            <span className="badge">Plataforma integral B2B</span>
            <h1>
              Elevamos tu negocio con soluciones tecnológicas, comercio electrónico y operaciones centralizadas.
            </h1>
            <p>{companyProfile.mission}</p>
            <div className="cta-group">
              <Link className="button-primary glass-interactive" href="/dashboard">
                Explorar plataforma
              </Link>
              <Link className="button-secondary glass-interactive" href="#crm">
                Ver CRM en acción
              </Link>
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#cbd5f5' }}>
              {heroHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="crm">
        <div className="container">
          <h2 className="section-title">CRM operativo para toda tu organización</h2>
          <div className="card-grid">
            {highlightedModules.map((module) => (
              <article className="card" key={module.id}>
                <span className="badge">{module.title}</span>
                <p>{module.description}</p>
                <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                  {module.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <small style={{ display: 'block', marginTop: '1rem', color: '#1d4ed8' }}>
                  Equipos clave: {module.roleFocus.map((role) => role.toUpperCase()).join(', ')}
                </small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <h2 className="section-title">Portal de clientes listo para producción</h2>
          <div className="card-grid">
            {portalHighlights.map((feature) => (
              <article className="card" key={feature.id}>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <Link className="button-secondary glass-interactive" href="#contacto">
                  {feature.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="productos">
        <div className="container">
          <h2 className="section-title">Soluciones destacadas</h2>
          <div className="card-grid">
            {featuredProducts.map((product) => (
              <article className="card" key={product.id}>
                <span className="badge">{product.featured ? 'Recomendado' : 'Disponible'}</span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <strong style={{ fontSize: '1.15rem', color: '#1d4ed8' }}>
                  {formatCurrency(product.price, product.currency)}
                </strong>
                {product.tags ? (
                  <div className="tag-list">
                    {product.tags.map((tag) => (
                      <span className="tag" key={tag}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="servicios">
        <div className="container">
          <h2 className="section-title">Servicios profesionales</h2>
          <div className="card-grid">
            {featuredServices.map((service) => (
              <article className="card" key={service.id}>
                <span className="badge">{service.category.toUpperCase()}</span>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <strong style={{ color: '#0f172a' }}>
                  {formatCurrency(service.price, service.currency)} ·{' '}
                  {service.billingCycle === 'one-time' ? 'Pago único' : `Plan ${service.billingCycle}`}
                </strong>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#1f2937' }}>
                  {service.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="clientes">
        <div className="container">
          <h2 className="section-title">Clientes y contratos gestionados en línea</h2>
          <div className="card-grid">
            {spotlightAccounts.map((account) => (
              <article className="card" key={account.id}>
                <span className="badge">{account.plan}</span>
                <h3>{account.companyName}</h3>
                <p>
                  Contacto: {account.contactName} · {account.email}
                </p>
                <p style={{ margin: 0 }}>
                  Estado: {account.status === 'active' ? 'Activo' : account.status === 'onboarding' ? 'Onboarding' : 'Suspendido'} · Salud:{' '}
                  {account.health === 'excellent'
                    ? 'Excelente'
                    : account.health === 'good'
                      ? 'Buena'
                      : 'En riesgo'}
                </p>
                <p style={{ margin: 0, color: '#1d4ed8', fontWeight: 600 }}>
                  Valor anual: {formatCurrency(account.annualValue)}
                </p>
                <small style={{ display: 'block', marginTop: '0.75rem', color: '#334155' }}>
                  Último contacto: {new Date(account.lastInteraction).toLocaleDateString('es-MX')}
                </small>
                <div className="tag-list">
                  {account.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <h2 className="section-title">Facturación y cobros al día</h2>
          <div className="card-grid">
            {latestBilling.map((billing) => (
              <article className="card" key={billing.month}>
                <h3>{billing.month}</h3>
                <p>Ingresos: {formatCurrency(billing.revenue, billing.currency)}</p>
                <p>Facturas emitidas: {billing.invoicesIssued}</p>
                <p>Tasa de cobro: {(billing.collectedRate * 100).toFixed(0)}%</p>
              </article>
            ))}
            <article className="card" style={{ background: 'rgba(37, 99, 235, 0.12)' }}>
              <h3>Automatiza tu ciclo de cobro</h3>
              <p>
                Integra tu pasarela de pago favorita, programa recordatorios inteligentes y descarga conciliaciones para tu
                equipo contable.
              </p>
              <Link className="button-primary glass-interactive" href="/dashboard/admin">
                Ver tablero financiero
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section id="roles">
        <div className="container">
          <h2 className="section-title">Roles y accesos escalables</h2>
          <div className="role-switcher">
            <div className="role-tabs">
              {rolePermissions.map((role) => (
                <button
                  key={role.role}
                  type="button"
                  className={`role-tab glass-interactive${role.role === activeRole.role ? ' active' : ''}`}
                  onClick={() => setActiveRole(role)}
                >
                  {role.role.toUpperCase()}
                </button>
              ))}
            </div>
            <div>
              <h3 style={{ marginBottom: '0.35rem', color: '#1d4ed8' }}>{activeRole.description}</h3>
              <ul className="role-capabilities">
                {activeRole.capabilities.map((capability) => (
                  <li key={capability}>{capability}</li>
                ))}
              </ul>
              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link className="button-primary glass-interactive" href={`/dashboard/${activeRole.role}`}>
                  Ver experiencia
                </Link>
                <Link className="button-secondary glass-interactive" href="#contacto">
                  Solicitar demo personalizada
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <h2 className="section-title">Testimonios de clientes</h2>
          <div className="testimonials">
            {testimonials.map((testimonial) => (
              <article className="testimonial-card" key={testimonial.id}>
                <p>“{testimonial.quote}”</p>
                <div>
                  <strong>{testimonial.name}</strong>
                  <p style={{ margin: 0, color: '#cbd5f5' }}>{testimonial.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <h2 className="section-title">Aliados estratégicos</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '1rem',
            }}
          >
            {partners.map((partner) => (
              <div
                key={partner.id}
                style={{
                  padding: '1rem 1.5rem',
                  borderRadius: '1rem',
                  background: 'rgba(15, 23, 42, 0.65)',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  color: '#cbd5f5',
                  textAlign: 'center',
                  fontWeight: 600,
                  letterSpacing: '0.03em',
                }}
              >
                {partner.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" style={{ paddingBottom: '4rem' }}>
        <div className="container">
          <h2 className="section-title">Conversemos sobre tu proyecto</h2>
          <div className="card" style={{ background: 'rgba(248, 250, 252, 0.96)', color: '#0f172a' }}>
            <p style={{ margin: 0 }}>
              Escríbenos a <a href={`mailto:${companyProfile.contactEmail}`}>{companyProfile.contactEmail}</a> o
              llámanos al <strong>{companyProfile.phone}</strong>. También podemos agendar una sesión estratégica en nuestra
              oficina ubicada en {companyProfile.address}.
            </p>
            <p style={{ margin: 0 }}>
              ¿Listo para avanzar? Solicita tu demo y recibe un plan a la medida que incluya e-commerce, POS, facturación y
              dashboards ejecutivos.
            </p>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <p>© {new Date().getFullYear()} {companyProfile.name}. Todos los derechos reservados.</p>
          <p>Soluciones web, servicios administrados y experiencias digitales de alto impacto.</p>
        </div>
      </footer>
    </main>
  );
}
