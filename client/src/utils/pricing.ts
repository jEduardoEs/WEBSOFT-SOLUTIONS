import type { CartItem } from '../types';

const TAX_RATE = 0.16; // 16%
const SHIPPING_THRESHOLD = 150;
const SHIPPING_FLAT_RATE = 12;

export interface CartTotals {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

export const roundCurrency = (value: number) =>
  Math.round((value + Number.EPSILON) * 100) / 100;

export const calculateCartTotals = (items: CartItem[]): CartTotals => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = roundCurrency(subtotal * TAX_RATE);
  const shipping = subtotal >= SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FLAT_RATE;
  const total = roundCurrency(subtotal + tax + shipping);

  return {
    subtotal: roundCurrency(subtotal),
    tax,
    shipping,
    total
  };
};

export const formatCurrency = (value: number, currency = 'usd') =>
  new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: currency.toUpperCase()
  }).format(value);
