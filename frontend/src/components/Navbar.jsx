import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/contacto', label: 'Contacto' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white/90 backdrop-blur border-b border-primary/10 sticky top-0 z-50 shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center gap-2 text-primary">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-serif text-xl">
            JE
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-base font-semibold uppercase tracking-wider">jEduardoEs</span>
            <span className="text-xs text-muted">Innovación tecnológica</span>
          </div>
        </Link>
        <button
          className="inline-flex items-center rounded-md border border-primary/20 p-2 text-primary transition md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Menú"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative transition-colors duration-200 hover:text-primary ${
                  isActive ? 'text-primary' : ''
                }`
              }
            >
              {({ isActive }) => (
                <span className="flex flex-col items-center">
                  {link.label}
                  <span
                    className={`mt-1 h-0.5 w-6 rounded-full bg-primary transition-opacity ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </span>
              )}
            </NavLink>
          ))}
          <Link
            to="/contacto"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-card transition hover:bg-secondary"
          >
            Agenda una reunión
          </Link>
        </nav>
      </div>
      {open && (
        <div className="border-t border-primary/10 bg-white/95 shadow-inner md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-4 text-sm font-medium text-muted">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 transition-colors duration-200 ${
                    isActive ? 'bg-primary/10 text-primary' : 'hover:bg-primary/5'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/contacto"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-primary px-4 py-2 text-center font-semibold text-white shadow-card transition hover:bg-secondary"
            >
              Agenda una reunión
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
