import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cartService } from "./cart.service";

export const cartKeys = {
  all: ["cart"] as const,
  detail: () => [...cartKeys.all, "detail"] as const,
};

export const useCartQuery = (enabled: boolean = true) => {
  return useQuery({
    queryKey: cartKeys.detail(),
    queryFn: ({ signal }) => cartService.getCart(signal),
    enabled,
  });
};

export const useAddToCartMutation = () => {
  return useMutation({
    mutationFn: ({
      productId,
      weight,
      quantity,
    }: {
      productId: string;
      weight: number;
      quantity?: number;
    }) => cartService.addToCart(productId, weight, quantity),
  });
};

export const useRemoveFromCartMutation = () => {
  return useMutation({
    mutationFn: ({
      productId,
      weight,
      quantity,
    }: {
      productId: string;
      weight: number;
      quantity?: number;
    }) => cartService.removeFromCart(productId, weight, quantity),
  });
};

export const useClearCartMutation = () => {
  return useMutation({
    mutationFn: () => cartService.clearCart(),
  });
};
