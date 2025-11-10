import { Link } from 'react-router-dom';

const Hero = ({ title, subtitle, ctaLabel, ctaTo, secondaryCta }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-surface to-primary/10">
      <div className="absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-secondary/30 blur-3xl" />
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-24 md:flex-row md:items-center md:px-6">
        <div className="z-10 flex-1 space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            Transformación digital
          </span>
          <h1 className="text-3xl font-serif font-bold text-primary sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="max-w-xl text-base text-muted sm:text-lg">{subtitle}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to={ctaTo}
              className="rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-white shadow-card transition hover:bg-secondary"
            >
              {ctaLabel}
            </Link>
            {secondaryCta}
          </div>
        </div>
        <div className="relative flex-1">
          <div className="relative z-10 ml-auto max-w-sm rounded-3xl bg-white p-6 shadow-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Casos de éxito</p>
            <ul className="mt-4 space-y-4 text-sm text-muted">
              <li className="rounded-2xl border border-primary/20 p-4 shadow-sm">
                <p className="font-semibold text-body">Escalamiento de plataforma e-commerce</p>
                <p className="mt-1 text-xs text-muted/80">+120% en ventas en 6 meses.</p>
              </li>
              <li className="rounded-2xl border border-primary/20 p-4 shadow-sm">
                <p className="font-semibold text-body">Implementación de analítica avanzada</p>
                <p className="mt-1 text-xs text-muted/80">Reducción del 35% en costos operativos.</p>
              </li>
              <li className="rounded-2xl border border-primary/20 p-4 shadow-sm">
                <p className="font-semibold text-body">Diseño de experiencias digitales</p>
                <p className="mt-1 text-xs text-muted/80">Mejora del 40% en satisfacción de usuarios.</p>
              </li>
            </ul>
          </div>
          <div className="absolute -top-10 left-12 h-24 w-24 rounded-full bg-accent/60 blur-3xl" />
          <div className="absolute -bottom-16 right-0 h-32 w-32 rounded-full bg-secondary/40 blur-3xl" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
