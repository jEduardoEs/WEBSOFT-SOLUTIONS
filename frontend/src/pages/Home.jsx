import { Link } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import Card from '../components/Card.jsx';

const beneficios = [
  {
    icon: '🚀',
    title: 'Ejecución ágil',
    description:
      'Sprints colaborativos, discovery continuo y entregables listos para medir impacto desde el primer mes.',
  },
  {
    icon: '🤝',
    title: 'Alianzas duraderas',
    description:
      'Trabajamos como parte de tu equipo con transparencia, rituales compartidos y foco en resultados.',
  },
  {
    icon: '📊',
    title: 'Decisiones basadas en datos',
    description:
      'Integramos analítica avanzada y dashboards accionables para mantener iniciativas en curso.',
  },
];

const Home = () => {
  return (
    <div className="space-y-24 pb-20">
      <Hero
        title="Diseñamos experiencias y productos que aceleran negocios latinoamericanos"
        subtitle="Combinamos estrategia, diseño y tecnología para crear soluciones digitales que habilitan crecimiento sostenible y experiencias memorables."
        ctaLabel="Explora nuestro catálogo"
        ctaTo="/catalogo"
        secondaryCta={
          <Link
            to="/servicios"
            className="rounded-full border border-primary px-6 py-3 text-center text-sm font-semibold text-primary transition hover:border-secondary hover:text-secondary"
          >
            Conoce nuestros servicios
          </Link>
        }
      />

      <section className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center">
          <h2 className="section-title">¿Por qué las empresas confían en nosotros?</h2>
          <p className="section-subtitle">
            Nuestro equipo multidisciplinario guía proyectos desde la visión hasta la ejecución con foco en resultados
            medibles y experiencias humanas.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {beneficios.map((beneficio) => (
            <Card key={beneficio.title} {...beneficio} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl rounded-3xl bg-primary/10 px-4 py-16 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-center">
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl font-serif font-semibold text-primary">Construyamos el siguiente caso de éxito</h2>
            <p className="text-base text-muted">
              Nuestro equipo te acompaña desde la ideación hasta la operación continua. Agenda una sesión de 45 minutos
              para identificar oportunidades y definir próximos pasos.
            </p>
          </div>
          <div className="flex flex-1 flex-col gap-4 rounded-3xl bg-white p-6 shadow-card">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Próxima sesión disponible</p>
            <p className="text-2xl font-serif text-body">Jueves 12:00 hrs (CDMX)</p>
            <Link
              to="/contacto"
              className="rounded-full bg-secondary px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-primary"
            >
              Reservar llamada exploratoria
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
