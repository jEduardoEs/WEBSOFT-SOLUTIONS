'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  catalogProducts,
  catalogServices,
  companyProfile,
  partners,
  rolePermissions,
  testimonials,
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

  return (
    <main>
      <header className="container" style={{ paddingTop: '2rem' }}>
        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #1d4ed8, #38bdf8)',
                display: 'grid',
                placeItems: 'center',
                fontWeight: 700,
                color: '#0b1120',
                fontSize: '1.05rem',
              }}
            >
              WS
            </div>
            <div>
              <strong style={{ fontSize: '1.25rem' }}>{companyProfile.name}</strong>
              <p style={{ margin: 0, color: '#94a3b8' }}>{companyProfile.tagline}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', fontWeight: 600 }}>
            <a href="#productos">Productos</a>
            <a href="#servicios">Servicios</a>
            <a href="#roles">Roles</a>
            <a href="#contacto">Contacto</a>
          </div>
        </nav>
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
              <Link className="button-primary" href="/dashboard">
                Explorar plataforma
              </Link>
              <Link className="button-secondary" href="#contacto">
                Habla con un experto
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
                  {product.currency} {product.price.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
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
                  {service.currency} {service.price.toLocaleString('es-MX')} · {service.billingCycle === 'one-time' ? 'Pago único' : `Plan ${service.billingCycle}`}
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

      <section id="roles">
        <div className="container">
          <h2 className="section-title">Roles y accesos escalables</h2>
          <div className="role-switcher">
            <div className="role-tabs">
              {rolePermissions.map((role) => (
                <button
                  key={role.role}
                  type="button"
                  className={`role-tab${role.role === activeRole.role ? ' active' : ''}`}
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
                <Link className="button-primary" href={`/dashboard/${activeRole.role}`}>
                  Ver experiencia
                </Link>
                <Link className="button-secondary" href="#contacto">
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
