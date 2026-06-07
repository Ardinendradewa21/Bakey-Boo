import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, selectedFlavor?: string, selectedSize?: string) => boolean;
  removeItem: (productId: string, selectedFlavor?: string, selectedSize?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedFlavor?: string, selectedSize?: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product: Product, quantity: number = 1, selectedFlavor?: string, selectedSize?: string) => {
        const state = get();
        const existingItem = state.items.find(
          (item) => 
            item.product.id === product.id && 
            item.selectedFlavor === selectedFlavor && 
            item.selectedSize === selectedSize
        );
        
        if (existingItem) {
          // Bakery product with same variant already in cart — increment quantity
          set({
            items: state.items.map((item) =>
              item.product.id === product.id && 
              item.selectedFlavor === selectedFlavor && 
              item.selectedSize === selectedSize
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
          return true;
        }
        
        // Add new item with variants
        set({ items: [...state.items, { product, quantity, selectedFlavor, selectedSize }] });
        return true;
      },
      
      removeItem: (productId: string, selectedFlavor?: string, selectedSize?: string) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.product.id === productId && item.selectedFlavor === selectedFlavor && item.selectedSize === selectedSize)
          ),
        }));
      },
      
      updateQuantity: (productId: string, quantity: number, selectedFlavor?: string, selectedSize?: string) => {
        if (quantity <= 0) {
          get().removeItem(productId, selectedFlavor, selectedSize);
          return;
        }
        
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId && item.selectedFlavor === selectedFlavor && item.selectedSize === selectedSize
              ? { ...item, quantity } 
              : item
          ),
        }));
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },
      
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'bakeyboo-cart', // unique name for localStorage key
      storage: createJSONStorage(() => localStorage), // use localStorage
    }
  )
);
