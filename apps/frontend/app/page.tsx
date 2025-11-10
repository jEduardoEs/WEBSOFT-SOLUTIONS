'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

type AgendaSession = {
  time: string;
  title: string;
  speaker: string;
  description: string;
};

type AgendaDay = {
  id: string;
  label: string;
  date: string;
  theme: string;
  sessions: AgendaSession[];
};

type Speaker = {
  id: string;
  name: string;
  role: string;
  company: string;
  bio: string;
};

type SponsorTier = {
  tier: string;
  companies: string[];
};

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

const navLinks = [
  { href: '#agenda', label: 'Agenda' },
  { href: '#ponentes', label: 'Ponentes' },
  { href: '#patrocinadores', label: 'Patrocinadores' },
  { href: '#faq', label: 'FAQ' },
];

const heroHighlights = [
  '3 días de inmersión total en innovación tecnológica y transformación digital',
  'Más de 30 speakers internacionales compartiendo casos de éxito',
  'Espacios de networking, mentorías y experiencias interactivas',
];

const stats = [
  { value: '3', label: 'Escenarios en simultáneo' },
  { value: '+2K', label: 'Asistentes esperados' },
  { value: '40', label: 'Charlas y workshops' },
  { value: '15', label: 'Países representados' },
];

const agendaDays: AgendaDay[] = [
  {
    id: 'dia-1',
    label: 'Día 1',
    date: 'Jueves 12 de septiembre',
    theme: 'Visión y tendencias del futuro digital',
    sessions: [
      {
        time: '09:00 - 09:45',
        title: 'Keynote: El nuevo mapa de la innovación latinoamericana',
        speaker: 'Valeria Gómez · CIO, NovaLabs',
        description: 'Cómo las empresas están acelerando sus hojas de ruta digitales con IA generativa y data fabric.',
      },
      {
        time: '10:15 - 11:00',
        title: 'Panel: Crecimiento exponencial con estrategias customer-first',
        speaker: 'Banco Digital MX · RetailNow · Inmotion Logistics',
        description: 'Casos reales de escalamiento basado en datos, automatización y experiencias omnicanal.',
      },
      {
        time: '12:00 - 13:30',
        title: 'Workshops inmersivos',
        speaker: 'Salas simultáneas',
        description: 'Selecciona entre journey maps, laboratorios de ciberseguridad o diseño de productos basados en IA.',
      },
      {
        time: '16:00 - 17:30',
        title: 'Experiencia de networking con startups y venture capitals',
        speaker: 'Open Innovation Hub',
        description: 'Pitch stage con los proyectos más prometedores y sesiones 1:1 con mentores especializados.',
      },
    ],
  },
  {
    id: 'dia-2',
    label: 'Día 2',
    date: 'Viernes 13 de septiembre',
    theme: 'Operaciones inteligentes y cultura data-driven',
    sessions: [
      {
        time: '09:00 - 09:45',
        title: 'Keynote: Industrias 4.0 y automatización centrada en las personas',
        speaker: 'Dr. Mauricio Pineda · Director, FutureWorks Institute',
        description: 'Tecnologías exponenciales aplicadas a manufactura, salud y servicios financieros.',
      },
      {
        time: '11:00 - 11:45',
        title: 'Sesión de casos: Cómo construir data products escalables',
        speaker: 'Dataloop · Insightful · CloudBoost',
        description: 'Blueprint para gobernanza de datos, arquitectura moderna y analítica accionable.',
      },
      {
        time: '14:00 - 15:30',
        title: 'Laboratorio: Domina tu estrategia de inteligencia artificial',
        speaker: 'AI Strategy Studio',
        description: 'Guía paso a paso para definir casos de uso, pilotos rápidos y métricas de impacto.',
      },
      {
        time: '17:45 - 18:30',
        title: 'Fireside chat: El futuro del trabajo y las organizaciones híbridas',
        speaker: 'Sofía Rivas · VP People, Hivemind',
        description: 'Modelos colaborativos, upskilling y cultura digital como ventaja competitiva.',
      },
    ],
  },
  {
    id: 'dia-3',
    label: 'Día 3',
    date: 'Sábado 14 de septiembre',
    theme: 'Construyendo ecosistemas sostenibles',
    sessions: [
      {
        time: '09:30 - 10:15',
        title: 'Keynote: Tecnología para el impacto social y ambiental',
        speaker: 'Andrea León · CEO, GreenTech Alliance',
        description: 'Iniciativas que conectan innovación, sostenibilidad y crecimiento económico.',
      },
      {
        time: '11:30 - 12:15',
        title: 'Mesa redonda: Alianzas entre corporativos, startups y academia',
        speaker: 'Universidad Tec · Impact Ventures · Corporativo Neón',
        description: 'Modelos de colaboración que aceleran la transferencia de conocimiento.',
      },
      {
        time: '13:00 - 14:30',
        title: 'Demo Day: Escenario de soluciones emergentes',
        speaker: 'Startups seleccionadas',
        description: 'Presentaciones de tecnologías listas para escalar en mercados globales.',
      },
      {
        time: '17:00 - 18:00',
        title: 'Clausura y cocktail de networking',
        speaker: 'Comité Congreso Tecnología 2024',
        description: 'Celebra los aprendizajes junto a speakers, patrocinadores y aliados estratégicos.',
      },
    ],
  },
];

const experienceHighlights = [
  {
    title: 'Zona de experiencias inmersivas',
    description:
      'Interactúa con laboratorios de realidad aumentada, simuladores industriales y demos guiados por expertos.',
  },
  {
    title: 'Mentorías uno a uno',
    description:
      'Reserva sesiones personalizadas con especialistas en estrategia, producto, data y cultura de innovación.',
  },
  {
    title: 'Red de negocios',
    description:
      'Conecta con líderes, startups y corporativos en espacios diseñados para impulsar alianzas clave.',
  },
];

const speakers: Speaker[] = [
  {
    id: 'speaker-valeria',
    name: 'Valeria Gómez',
    role: 'Chief Innovation Officer',
    company: 'NovaLabs',
    bio: 'Reconocida estratega en transformación digital con proyectos en 12 países y foco en IA generativa.',
  },
  {
    id: 'speaker-mauricio',
    name: 'Dr. Mauricio Pineda',
    role: 'Director Ejecutivo',
    company: 'FutureWorks Institute',
    bio: 'Investigador y consultor para industrias 4.0, especializado en automatización centrada en las personas.',
  },
  {
    id: 'speaker-andrea',
    name: 'Andrea León',
    role: 'CEO & Co-founder',
    company: 'GreenTech Alliance',
    bio: 'Emprendedora social impulsora de proyectos de tecnología sostenible en América Latina.',
  },
  {
    id: 'speaker-sofia',
    name: 'Sofía Rivas',
    role: 'VP People & Culture',
    company: 'Hivemind',
    bio: 'Líder en construcción de culturas ágiles, talento híbrido y programas de upskilling masivo.',
  },
  {
    id: 'speaker-leo',
    name: 'Leo Fernández',
    role: 'Head of Data Products',
    company: 'Insightful',
    bio: 'Arquitecto de soluciones data-driven que ha escalado plataformas analíticas para empresas Fortune 500.',
  },
  {
    id: 'speaker-samira',
    name: 'Samira Alí',
    role: 'Global Partnerships Lead',
    company: 'Impact Ventures',
    bio: 'Especialista en alianzas público-privadas para proyectos de innovación abierta y emprendimiento.',
  },
];

const sponsorTiers: SponsorTier[] = [
  {
    tier: 'Platino',
    companies: ['Aurelia Systems', 'QuantumLeap', 'Skybridge Cloud'],
  },
  {
    tier: 'Oro',
    companies: ['BrightData', 'NextWave Robotics', 'SecureNet', 'NovaPay'],
  },
  {
    tier: 'Plata',
    companies: ['FlowOps', 'Intellisense', 'CodeFoundry', 'EcoGrid', 'Talent360'],
  },
];

const faqs: FaqItem[] = [
  {
    id: 'faq-entradas',
    question: '¿Qué incluye mi pase al Congreso de Tecnología 2024?',
    answer:
      'Acceso completo a las tres jornadas, keynotes, paneles, workshops, zona de experiencias, coffee breaks y las sesiones de networking. También recibirás certificados digitales y acceso on-demand a los contenidos grabados.',
  },
  {
    id: 'faq-descuentos',
    question: '¿Existen descuentos para grupos o instituciones educativas?',
    answer:
      'Sí, contamos con tarifas preferenciales para grupos corporativos y universidades. Escríbenos a registro@congresotecnologia.com y nuestro equipo te compartirá los paquetes disponibles.',
  },
  {
    id: 'faq-lugar',
    question: '¿Dónde se llevará a cabo el congreso?',
    answer:
      'El evento se realizará en el Centro de Convenciones Innovare, Ciudad de México. Disponemos de estacionamiento, transporte oficial y convenios con hoteles aliados.',
  },
  {
    id: 'faq-streaming',
    question: '¿Puedo seguir las conferencias de manera virtual?',
    answer:
      'Sí, ofrecemos accesos híbridos con transmisión en vivo, interacción con speakers y descarga de materiales exclusivos.',
  },
];

export default function HomePage() {
  const [activeDayId, setActiveDayId] = useState<string>(agendaDays[0].id);
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqs[0].id);

  const activeDay = useMemo(() => agendaDays.find((day) => day.id === activeDayId) ?? agendaDays[0], [activeDayId]);

  return (
    <main className="landing-page">
      <header className="site-header">
        <div className="container">
          <nav className="nav">
            <div className="brand">
              <span className="brand-mark">CT</span>
              <div>
                <p className="brand-eyebrow">12 · 13 · 14 septiembre · CDMX</p>
                <strong>Congreso de Tecnología 2024</strong>
              </div>
            </div>
            <div className="nav-links">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
            <Link className="button-primary nav-cta" href="#registro">
              Adquiere tu pase
            </Link>
          </nav>
        </div>
      </header>

      <section className="hero" id="inicio">
        <div className="container hero-content">
          <div className="hero-copy glass-card">
            <span className="hero-badge">La cita más grande de innovación en habla hispana</span>
            <h1>
              Impulsa tu organización con estrategias, alianzas y tecnología listas para implementar hoy.
            </h1>
            <p>
              Vive tres días de keynotes, talleres prácticos y experiencias inmersivas diseñadas para líderes que
              transforman el futuro digital de sus empresas.
            </p>
            <div className="cta-group">
              <Link className="button-primary" href="#agenda">
                Ver agenda destacada
              </Link>
              <a className="button-secondary" href="mailto:registro@congresotecnologia.com">
                Solicitar información
              </a>
            </div>
            <ul className="hero-list">
              {heroHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="hero-stats">
            <div className="stat-grid">
              {stats.map((stat) => (
                <article className="stat-card" key={stat.label}>
                  <span>{stat.value}</span>
                  <p>{stat.label}</p>
                </article>
              ))}
            </div>
            <div className="hero-note glass-card">
              <p>
                Regístrate antes del <strong>31 de julio</strong> y obtén acceso prioritario a mentorías especializadas y
                la app oficial del evento.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="experiencia">
        <div className="container">
          <div className="section-heading">
            <h2>Una experiencia diseñada para acelerar tu transformación</h2>
            <p>
              Cada espacio del congreso está pensado para que regreses con un plan claro, aliados estratégicos y
              soluciones validadas por expertos internacionales.
            </p>
          </div>
          <div className="feature-grid">
            {experienceHighlights.map((feature) => (
              <article className="feature-card glass-card" key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="agenda">
        <div className="container agenda">
          <div className="section-heading">
            <h2>Agenda destacada</h2>
            <p>
              Inspírate con líderes globales, talleres prácticos y espacios diseñados para crear alianzas de alto impacto.
            </p>
          </div>
          <div className="agenda-tabs">
            {agendaDays.map((day) => (
              <button
                key={day.id}
                type="button"
                className={`agenda-tab${day.id === activeDay.id ? ' active' : ''}`}
                onClick={() => setActiveDayId(day.id)}
              >
                <span>{day.label}</span>
                <small>{day.date}</small>
              </button>
            ))}
          </div>
          <div className="agenda-highlight glass-card">
            <h3>{activeDay.theme}</h3>
            <p className="agenda-date">{activeDay.date}</p>
            <ul>
              {activeDay.sessions.map((session) => (
                <li key={session.title}>
                  <div>
                    <span className="session-time">{session.time}</span>
                    <h4>{session.title}</h4>
                    <p className="session-speaker">{session.speaker}</p>
                    <p>{session.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="agenda-cta">
              <Link className="button-secondary" href="#registro">
                Descargar agenda completa
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="ponentes">
        <div className="container">
          <div className="section-heading">
            <h2>Ponentes confirmados</h2>
            <p>
              Conoce a las voces que están definiendo el rumbo de la innovación tecnológica en la región y el mundo.
            </p>
          </div>
          <div className="speaker-grid">
            {speakers.map((speaker) => (
              <article className="speaker-card glass-card" key={speaker.id}>
                <div className="speaker-meta">
                  <span className="speaker-tag">{speaker.company}</span>
                  <h3>{speaker.name}</h3>
                  <p className="speaker-role">{speaker.role}</p>
                </div>
                <p>{speaker.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="patrocinadores">
        <div className="container">
          <div className="section-heading">
            <h2>Patrocinadores y aliados</h2>
            <p>
              Gracias a las organizaciones que hacen posible el Congreso de Tecnología 2024 y apoyan la innovación de la
              región.
            </p>
          </div>
          <div className="sponsor-grid">
            {sponsorTiers.map((tier) => (
              <article className="sponsor-card glass-card" key={tier.tier}>
                <h3>{tier.tier}</h3>
                <ul>
                  {tier.companies.map((company) => (
                    <li key={company}>{company}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="container faq">
          <div className="section-heading">
            <h2>Preguntas frecuentes</h2>
            <p>Resuelve las dudas más comunes antes de asegurar tu lugar en el congreso.</p>
          </div>
          <div className="faq-list">
            {faqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <article className={`faq-item glass-card${isOpen ? ' open' : ''}`} key={faq.id}>
                  <button type="button" onClick={() => setOpenFaqId(isOpen ? null : faq.id)}>
                    <span>{faq.question}</span>
                    <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen ? <p>{faq.answer}</p> : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" id="registro">
        <div className="container final-cta glass-card">
          <div>
            <h2>Reserva tu pase hoy</h2>
            <p>
              Aparta tu lugar para el Congreso de Tecnología 2024 y accede a preventas exclusivas, mentorías y la
              comunidad digital de líderes que están transformando Latinoamérica.
            </p>
          </div>
          <div className="final-cta-actions">
            <a className="button-primary" href="https://congresotecnologia.com/registro" target="_blank" rel="noreferrer">
              Comprar entradas
            </a>
            <a className="button-secondary" href="mailto:registro@congresotecnologia.com">
              Solicitar paquete corporativo
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container">
          <p>© {new Date().getFullYear()} Congreso de Tecnología. Todos los derechos reservados.</p>
          <p>Organiza: Comité de Innovación LATAM · contacto@congresotecnologia.com</p>
        </div>
      </footer>
    </main>
  );
}
