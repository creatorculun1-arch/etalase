import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string | null;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotals: () => { totalItems: number; totalPrice: number };
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (item) => {
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { ...item, quantity: 1 }] };
    });
  },

  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    }));
  },

  updateQuantity: (id, quantity) => {
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(0, quantity) } : i
      ).filter((i) => i.quantity > 0),
    }));
  },

  clearCart: () => set({ items: [] }),

  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  getTotals: () => {
    const { items } = get();
    return items.reduce(
      (totals, item) => ({
        totalItems: totals.totalItems + item.quantity,
        totalPrice: totals.totalPrice + item.price * item.quantity,
      }),
      { totalItems: 0, totalPrice: 0 }
    );
  },
}));
