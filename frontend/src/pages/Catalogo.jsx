import Card from '../components/Card.jsx';
import { solucionesCatalogo } from '../data/catalogo.js';

const Catalogo = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <div className="text-center">
        <h1 className="section-title">Catálogo de soluciones</h1>
        <p className="section-subtitle">
          Explora nuestra selección de aceleradores, frameworks y productos listos para personalizarse a las
          necesidades de tu empresa.
        </p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {solucionesCatalogo.map((solucion) => (
          <Card key={solucion.title} {...solucion} />
        ))}
      </div>
      <div className="mt-16 rounded-3xl bg-white p-8 text-center shadow-card">
        <h2 className="text-2xl font-serif font-semibold text-primary">¿Buscas algo a la medida?</h2>
        <p className="mt-4 text-sm text-muted">
          Nuestro equipo diseña soluciones personalizadas. Escríbenos y agenda una reunión para co-crear el siguiente
          hito digital de tu organización.
        </p>
        <a
          href="mailto:hola@jeduardoes.com"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-secondary"
        >
          hola@jeduardoes.com
        </a>
      </div>
    </div>
  );
};

export default Catalogo;
