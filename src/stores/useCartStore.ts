import { persist } from 'zustand/middleware';
import type { Product } from '../@types';
import { create } from 'zustand';

export type CartItem = Product & {
  quantity: number;
};

type CartState = {
  products: CartItem[];
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  removeAll: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      products: [],
      addProduct: (product: Product) => {
        const products = get().products;
        const productExists = products.find(
          (p: Product) => p.id === product.id,
        );

        if (productExists) {
          set({
            products: products.map((p: CartItem) =>
              // Se um produto já existe na lista, adicina mais um do mesmo produto, ou seja, incrementa a quantidade
              p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
            ),
          });
        } else {
          set({
            products: [...products, { ...product, quantity: 1 }],
          });
        }
      },
      removeProduct: (productId: string) => {
        const products = get().products;

        const productSelected = products.find(p => p.id === productId);

        if (!productSelected) {
          // Se o produto não existe, não faz nada
          return;
        }

        if (productSelected?.quantity > 1) {
          // Se o produto existe e a quantidade é maior que 1, decrementa a quantidade
          set({
            products: products.map((p: CartItem) =>
              p.id === productId ? { ...p, quantity: p.quantity - 1 } : p,
            ),
          });
          return;
        }

        set({
          products: products.filter((p: CartItem) => p.id !== productId),
        });
      },
      removeAll: () => set({ products: [] }),
    }),
    { name: 'cart-storage' },
  ),
);
