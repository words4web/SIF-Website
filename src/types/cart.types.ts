import { Product } from "./product/product.types";

export interface CartItem {
  productId: string;
  weight: number;
  price: number;
  quantity: number;
  product: Product;
}

export interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, weight: number, quantity?: number) => void;
  updateQuantity: (productId: string, weight: number, quantity: number) => void;
  increment: (product: Product, weight: number) => void;
  decrement: (productId: string, weight: number) => void;
  removeItem: (productId: string, weight: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string, weight: number) => number;
  isInCart: (productId: string, weight: number) => boolean;
  itemCount: number;
  subtotal: number;
  ready: boolean;
  isFetching: boolean;
  refetch: () => void;
}
