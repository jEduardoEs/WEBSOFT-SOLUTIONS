const Contacto = () => {
  return (
    <div className="bg-surface pb-20">
      <section className="mx-auto max-w-6xl px-4 pt-16 md:px-6">
        <div className="text-center">
          <h1 className="section-title">Conversemos sobre tu reto</h1>
          <p className="section-subtitle">
            Completa el formulario y agenda una sesión con nuestro equipo para explorar oportunidades, validar ideas y
            priorizar próximos pasos.
          </p>
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <form className="space-y-6 rounded-3xl bg-white p-8 shadow-card">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-muted">
                Nombre completo
                <input
                  type="text"
                  placeholder="Laura Martínez"
                  className="mt-1 w-full rounded-2xl border border-primary/20 px-4 py-3 text-sm text-body focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                  required
                />
              </label>
              <label className="text-sm font-medium text-muted">
                Correo electrónico
                <input
                  type="email"
                  placeholder="laura@empresa.com"
                  className="mt-1 w-full rounded-2xl border border-primary/20 px-4 py-3 text-sm text-body focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                  required
                />
              </label>
            </div>
            <label className="text-sm font-medium text-muted">
              Organización
              <input
                type="text"
                placeholder="Nombre de la empresa"
                className="mt-1 w-full rounded-2xl border border-primary/20 px-4 py-3 text-sm text-body focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </label>
            <label className="text-sm font-medium text-muted">
              Cuéntanos sobre tu proyecto
              <textarea
                rows="4"
                placeholder="Buscamos lanzar una plataforma de servicios con experiencia personalizada..."
                className="mt-1 w-full rounded-2xl border border-primary/20 px-4 py-3 text-sm text-body focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
              ></textarea>
            </label>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-muted">
                Presupuesto estimado
                <select className="mt-1 w-full rounded-2xl border border-primary/20 px-4 py-3 text-sm text-body focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40">
                  <option value="">Selecciona una opción</option>
                  <option value="25k">Hasta $25k USD</option>
                  <option value="50k">$25k - $50k USD</option>
                  <option value="100k">$50k - $100k USD</option>
                  <option value="100kplus">Más de $100k USD</option>
                </select>
              </label>
              <label className="text-sm font-medium text-muted">
                Urgencia del proyecto
                <select className="mt-1 w-full rounded-2xl border border-primary/20 px-4 py-3 text-sm text-body focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40">
                  <option value="">Selecciona una opción</option>
                  <option value="inmediato">Inmediato</option>
                  <option value="1-3">1 a 3 meses</option>
                  <option value="3-6">3 a 6 meses</option>
                  <option value="6+">Más de 6 meses</option>
                </select>
              </label>
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-secondary"
            >
              Enviar mensaje
            </button>
          </form>
          <aside className="space-y-6 rounded-3xl border border-primary/10 bg-white p-8 shadow-sm">
            <div>
              <h2 className="text-lg font-semibold text-body">¿Prefieres agendar directamente?</h2>
              <p className="mt-2 text-sm text-muted">
                Reserva una sesión estratégica de 45 minutos para hablar de objetivos, alcance y métricas clave.
              </p>
              <a
                href="https://cal.com"
                className="mt-4 inline-flex items-center justify-center rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary"
              >
                Agendar ahora
              </a>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-secondary">Información de contacto</h3>
              <ul className="mt-3 space-y-3 text-sm text-muted">
                <li>hola@jeduardoes.com</li>
                <li>+52 55 1234 5678</li>
                <li>CDMX, México</li>
              </ul>
            </div>
            <div className="rounded-3xl bg-primary/5 p-5 text-sm text-muted">
              <p className="font-semibold text-primary">SLA de respuesta</p>
              <p className="mt-1">
                Respondemos todos los mensajes en un máximo de 24 horas hábiles y coordinamos follow-ups semanales.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default Contacto;
