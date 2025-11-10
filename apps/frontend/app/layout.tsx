import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'WEBSOFT SOLUTIONS | Tecnología inteligente para tu negocio',
  description:
    'WEBSOFT SOLUTIONS ofrece soluciones tecnológicas, servicios administrados y plataformas digitales para impulsar tu empresa.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <div style={{ isolation: 'isolate' }}>{children}</div>
      </body>
    </html>
  );
}
