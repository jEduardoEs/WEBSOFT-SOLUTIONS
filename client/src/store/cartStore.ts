import { create } from 'zustand';
import type { CartItem, Product } from '../types';
import { calculateCartTotals } from '../utils/pricing';

type CartState = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: CartItem['id']) => void;
  setQuantity: (id: CartItem['id'], quantity: number) => void;
  clear: () => void;
};

const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (product) => {
    set((state) => {
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        };
      }

      return {
        items: [...state.items, { ...product, quantity: 1 }]
      };
    });
  },
  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id)
    }));
  },
  setQuantity: (id, quantity) => {
    const safeQuantity = Math.max(0, Math.floor(quantity));
    if (safeQuantity <= 0) {
      get().removeItem(id);
      return;
    }

    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity: safeQuantity } : item
      )
    }));
  },
  clear: () => set({ items: [] })
}));

export const selectCartItems = (state: CartState) => state.items;
export const selectCartTotals = (state: CartState) => calculateCartTotals(state.items);
export const selectCartCount = (state: CartState) =>
  state.items.reduce((acc, item) => acc + item.quantity, 0);

export default useCartStore;
