export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency: 'USD' | 'EUR' | 'MXN' | string;
  isActive: boolean;
  tags?: string[];
}

export type UserRole = 'admin' | 'customer' | 'guest';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
}

export type OrderStatus = 'draft' | 'paid' | 'canceled' | 'fulfilled';

export interface OrderItem {
  productId: string;
  quantity: number;
  unitPrice?: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: string;
  updatedAt?: string;
  notes?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
