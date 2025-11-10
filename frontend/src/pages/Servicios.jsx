import Card from '../components/Card.jsx';
import { servicios } from '../data/servicios.js';

const Servicios = () => {
  return (
    <div className="space-y-16 bg-white pb-20">
      <section className="mx-auto max-w-6xl px-4 pt-16 md:px-6">
        <div className="text-center">
          <h1 className="section-title">Servicios estratégicos</h1>
          <p className="section-subtitle">
            Diseñamos, construimos y escalamos soluciones digitales centradas en usuarios con equipos híbridos y
            metodologías ágiles.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {servicios.map((servicio) => (
            <Card key={servicio.title} {...servicio} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-8 rounded-3xl bg-primary text-white p-10 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl font-serif font-semibold">Equipo multidisciplinario</h2>
            <p className="text-sm text-white/80">
              Al trabajar con nosotros accedes a especialistas en estrategia, investigación, diseño de servicios, data,
              ingeniería y producto. Configuramos squads a la medida con acompañamiento senior.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-secondary">Cómo colaboramos</h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li>Diagnóstico inicial de 2 semanas para priorizar oportunidades.</li>
              <li>Roadmap trimestral con hitos, métricas y responsables.</li>
              <li>Rituales compartidos: dailies ejecutivas, reviews y sesiones de co-creación.</li>
              <li>Entregables iterativos listos para lanzar y medir continuamente.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Servicios;
