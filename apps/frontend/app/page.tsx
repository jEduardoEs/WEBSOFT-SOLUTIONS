'use client';

import { useMemo } from 'react';
import type { Order, Product, User } from '@jeduardoes/shared';

const sampleUser: User = {
  id: 'user-1',
  email: 'cliente@example.com',
  name: 'Cliente Demo',
  role: 'customer',
};

const sampleProducts: Product[] = [
  { id: 'prod-1', name: 'Suscripción Pro', price: 29.99, currency: 'USD', isActive: true },
  { id: 'prod-2', name: 'Consultoría', price: 99.0, currency: 'USD', isActive: false },
];

export default function HomePage() {
  const orders = useMemo<Order[]>(
    () => [
      {
        id: 'order-1',
        userId: sampleUser.id,
        items: sampleProducts.map((product) => ({
          productId: product.id,
          quantity: product.isActive ? 1 : 0,
        })),
        status: 'draft',
        createdAt: new Date().toISOString(),
      },
    ],
    [],
  );

  return (
    <main>
      <h1>Bienvenido al monorepo</h1>
      <p>
        Este frontend consume los tipos compartidos desde <code>@jeduardoes/shared</code> y sirve como
        punto de partida para construir interfaces ricas.
      </p>
      <section>
        <h2>Usuario</h2>
        <p>
          <strong>{sampleUser.name}</strong> ({sampleUser.email}) — Rol: {sampleUser.role}
        </p>
      </section>
      <section>
        <h2>Productos</h2>
        <ul>
          {sampleProducts.map((product) => (
            <li key={product.id}>
              {product.name} — {product.currency} {product.price.toFixed(2)}{' '}
              {product.isActive ? '✅ Disponible' : '⏸️ Pausado'}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Órdenes</h2>
        <pre>{JSON.stringify(orders, null, 2)}</pre>
      </section>
    </main>
  );
}
