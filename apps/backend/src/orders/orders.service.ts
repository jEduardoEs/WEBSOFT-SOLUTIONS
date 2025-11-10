import { Injectable } from '@nestjs/common';
import type { Order, Product, User } from '@jeduardoes/shared';

@Injectable()
export class OrdersService {
  private readonly user: User = {
    id: 'user-1',
    email: 'cliente@example.com',
    name: 'Cliente Demo',
    role: 'customer',
  };

  private readonly products: Product[] = [
    { id: 'prod-1', name: 'Suscripción Pro', price: 29.99, currency: 'USD', isActive: true },
    { id: 'prod-2', name: 'Consultoría', price: 99.0, currency: 'USD', isActive: true },
  ];

  getOrders(): Order[] {
    return [
      {
        id: 'order-1',
        userId: this.user.id,
        items: this.products.map((product) => ({ productId: product.id, quantity: 1 })),
        status: 'paid',
        createdAt: new Date().toISOString(),
      },
    ];
  }
}
