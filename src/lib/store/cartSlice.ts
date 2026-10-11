import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@/types/cart.types";
import { Product } from "@/types/product/product.types";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action?.payload || [];
    },
    addItem(
      state,
      action: PayloadAction<{
        product: Product;
        weight: number;
        quantity?: number;
      }>,
    ) {
      const { product, weight, quantity = 1 } = action.payload;
      const matchingVariant = product?.variants?.find(
        (v) => Number(v.weight) === Number(weight),
      );
      const variantPrice = matchingVariant ? Number(matchingVariant.price) : 0;

      const existing = state?.items?.find(
        (item) =>
          item?.productId === product?.id &&
          Number(item?.weight) === Number(weight),
      );

      if (existing) {
        existing.quantity = Math.min(99, existing?.quantity + quantity);
        existing.price = variantPrice;
        existing.product = product;
      } else {
        state?.items?.push({
          productId: product.id,
          weight,
          price: variantPrice,
          quantity,
          product,
        });
      }
    },
    updateQuantity(
      state,
      action: PayloadAction<{
        productId: string;
        weight: number;
        quantity: number;
      }>,
    ) {
      const { productId, weight, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state?.items?.filter(
          (item) =>
            !(
              item?.productId === productId &&
              Number(item?.weight) === Number(weight)
            ),
        );
      } else {
        const item = state?.items?.find(
          (item) =>
            item?.productId === productId &&
            Number(item?.weight) === Number(weight),
        );
        if (item) {
          item.quantity = Math.min(99, quantity);
        }
      }
    },
    removeItem(
      state,
      action: PayloadAction<{ productId: string; weight: number }>,
    ) {
      const { productId, weight } = action.payload;
      state.items = state?.items?.filter(
        (item) =>
          !(
            item?.productId === productId &&
            Number(item?.weight) === Number(weight)
          ),
      );
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { setCart, addItem, updateQuantity, removeItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
