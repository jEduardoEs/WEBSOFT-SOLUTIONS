import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3 md:px-6">
        <div>
          <h3 className="text-lg font-semibold">jEduardoEs</h3>
          <p className="mt-3 text-sm text-white/80">
            Acompañamos a organizaciones latinoamericanas en su transformación digital
            mediante soluciones ágiles, diseño centrado en las personas y tecnologías emergentes.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-secondary">Enlaces</h4>
          <nav className="mt-4 flex flex-col gap-2 text-sm text-white/80">
            <Link to="/">Inicio</Link>
            <Link to="/catalogo">Catálogo</Link>
            <Link to="/servicios">Servicios</Link>
            <Link to="/contacto">Contacto</Link>
          </nav>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-secondary">Contáctanos</h4>
          <p className="mt-4 text-sm text-white/80">hola@jeduardoes.com</p>
          <p className="mt-2 text-sm text-white/80">+52 55 1234 5678</p>
          <p className="mt-2 text-sm text-white/80">CDMX, México</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-white/60 md:px-6">
          © {new Date().getFullYear()} jEduardoEs. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
