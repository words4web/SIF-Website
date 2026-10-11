import { useCallback, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import {
  setCart,
  addItem as addItemAction,
  updateQuantity as updateQuantityAction,
  removeItem as removeItemAction,
  clearCart as clearCartAction,
} from "@/lib/store/cartSlice";
import { Product } from "@/types/product/product.types";
import { CartContextValue, CartItem } from "@/types/cart.types";
import { useQueryClient } from "@tanstack/react-query";
import {
  cartKeys,
  useCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} from "@/services/cart/cart.hook";
import { toast } from "sonner";

function normalizeCartItem(item: any): CartItem | null {
  const prod = item?.productId;
  if (!prod?._id) return null;

  const matchingVariant = Array.isArray(prod?.variants)
    ? prod?.variants?.find(
        (v: any) => Number(v?.weight) === Number(item?.weight),
      )
    : null;

  const itemPrice =
    typeof item?.price === "number"
      ? item?.price
      : matchingVariant
        ? Number(matchingVariant?.price)
        : 0;

  return {
    productId: prod?._id,
    weight: item?.weight,
    price: itemPrice,
    quantity: item?.quantity,
    product: {
      id: prod?._id,
      name: prod?.name,
      slug: prod?.slug,
      sku: prod?.sku,
      description: prod?.description,
      variants: Array.isArray(prod?.variants) ? prod?.variants : [],
      pack: prod?.pack || null,
      price: itemPrice,
      unit: prod?.unit,
      stock: prod?.stock,
      stockStatus: prod?.stockStatus,
      images: Array.isArray(prod?.images) ? prod?.images : [],
      imageUrl:
        Array.isArray(prod?.images) && prod?.images?.length > 0
          ? prod?.images[0]
          : undefined,
      categoryId:
        typeof prod?.categoryId === "object"
          ? prod?.categoryId?._id
          : prod?.categoryId || "",
      categoryName:
        typeof prod?.categoryId === "object" ? prod?.categoryId?.name : "",
    },
  };
}

export function useCart(): CartContextValue {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const user = useSelector((state: RootState) => state?.auth?.user);
  const items = useSelector((state: RootState) => state?.cart?.items || []);

  const {
    data: cartData,
    isLoading,
    isFetching,
    refetch,
  } = useCartQuery(!!user);
  const addToCartMutation = useAddToCartMutation();
  const removeFromCartMutation = useRemoveFromCartMutation();
  const clearCartMutation = useClearCartMutation();

  const pendingDeltas = useRef<
    Record<string, { productId: string; weight: number; delta: number }>
  >({});
  const debounceTimers = useRef<Record<string, NodeJS.Timeout>>({});
  const shownMessagesRef = useRef<Set<string>>(new Set());

  const flushDebouncedMutation = useCallback(
    (key: string) => {
      const entry = pendingDeltas.current[key];
      delete pendingDeltas.current[key];
      delete debounceTimers.current[key];

      if (!entry || entry.delta === 0) return;

      const handleSuccess = () => {
        if (Object.keys(pendingDeltas.current).length === 0) {
          queryClient.invalidateQueries({ queryKey: cartKeys.all });
        }
      };

      const handleError = (error: any) => {
        const message =
          error?.response?.data?.message || "Failed to update cart";
        toast.error(message);
      };

      if (entry.delta > 0) {
        addToCartMutation.mutate(
          {
            productId: entry.productId,
            weight: entry.weight,
            quantity: entry.delta,
          },
          {
            onSuccess: handleSuccess,
            onError: handleError,
          },
        );
      } else {
        removeFromCartMutation.mutate(
          {
            productId: entry.productId,
            weight: entry.weight,
            quantity: Math.abs(entry.delta),
          },
          {
            onSuccess: handleSuccess,
            onError: handleError,
          },
        );
      }
    },
    [addToCartMutation, removeFromCartMutation, queryClient],
  );

  useEffect(() => {
    return () => {
      Object.values(debounceTimers.current).forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    if (user && cartData?.data) {
      if (
        Array.isArray(cartData?.data?.messages) &&
        cartData.data.messages.length > 0
      ) {
        cartData.data.messages.forEach((msg: string) => {
          if (!shownMessagesRef.current.has(msg)) {
            shownMessagesRef.current.add(msg);
            toast.warning(msg, { id: msg });
          }
        });
      }

      if (cartData?.data?.items) {
        const hasActiveDebounce = Object.keys(pendingDeltas.current).length > 0;
        if (!hasActiveDebounce) {
          const mappedItems = cartData.data.items
            ?.map(normalizeCartItem)
            ?.filter(
              (item: CartItem | null): item is CartItem => item !== null,
            );

          dispatch(setCart(mappedItems));
        }
      }
    }
  }, [user, cartData, dispatch]);

  const queueDebouncedDelta = useCallback(
    (productId: string, weight: number, delta: number) => {
      queryClient.cancelQueries({ queryKey: cartKeys.all });

      const key = `${productId}_${weight}`;
      const currentDelta = pendingDeltas.current[key]?.delta || 0;
      pendingDeltas.current[key] = {
        productId,
        weight,
        delta: currentDelta + delta,
      };

      if (debounceTimers.current[key]) {
        clearTimeout(debounceTimers.current[key]);
      }

      debounceTimers.current[key] = setTimeout(() => {
        flushDebouncedMutation(key);
      }, 500);
    },
    [flushDebouncedMutation, queryClient],
  );

  const getItemQuantity = useCallback(
    (productId: string, weight: number): number => {
      const found = items.find(
        (item) =>
          item?.productId === productId &&
          Number(item?.weight) === Number(weight),
      );
      return found ? found.quantity : 0;
    },
    [items],
  );

  const isInCart = useCallback(
    (productId: string, weight: number): boolean =>
      getItemQuantity(productId, weight) > 0,
    [getItemQuantity],
  );

  const addItem = useCallback(
    (product: Product, weight: number, quantity = 1) => {
      if (!user || !product?.id) return;

      dispatch(addItemAction({ product, weight, quantity }));
      queueDebouncedDelta(product.id, weight, quantity);
    },
    [user, dispatch, queueDebouncedDelta],
  );

  const updateQuantity = useCallback(
    (productId: string, weight: number, quantity: number) => {
      if (!user || !productId) return;

      const currentItem = items.find(
        (item) =>
          item?.productId === productId &&
          Number(item?.weight) === Number(weight),
      );
      const currentQty = currentItem?.quantity || 0;
      const diff = quantity - currentQty;

      if (diff === 0) return;

      dispatch(updateQuantityAction({ productId, weight, quantity }));

      const key = `${productId}_${weight}`;
      if (quantity <= 0) {
        queryClient.cancelQueries({ queryKey: cartKeys.all });
        if (debounceTimers.current[key])
          clearTimeout(debounceTimers.current[key]);
        delete pendingDeltas.current[key];
        delete debounceTimers.current[key];

        removeFromCartMutation.mutate(
          { productId, weight },
          {
            onSuccess: () => {
              if (Object.keys(pendingDeltas.current).length === 0) {
                queryClient.invalidateQueries({ queryKey: cartKeys.all });
              }
            },
            onError: (error: any) => {
              const message =
                error?.response?.data?.message || "Failed to remove item";
              toast.error(message);
            },
          },
        );
        return;
      }

      queueDebouncedDelta(productId, weight, diff);
    },
    [
      user,
      items,
      dispatch,
      queueDebouncedDelta,
      removeFromCartMutation,
      refetch,
      queryClient,
    ],
  );

  const increment = useCallback(
    (product: Product, weight: number) => {
      const currentQty = getItemQuantity(product.id, weight);
      if (currentQty === 0) {
        addItem(product, weight, 1);
      } else {
        updateQuantity(product.id, weight, currentQty + 1);
      }
    },
    [getItemQuantity, addItem, updateQuantity],
  );

  const decrement = useCallback(
    (productId: string, weight: number) => {
      const currentQty = getItemQuantity(productId, weight);
      if (currentQty <= 1) {
        updateQuantity(productId, weight, 0);
      } else {
        updateQuantity(productId, weight, currentQty - 1);
      }
    },
    [getItemQuantity, updateQuantity],
  );

  const removeItem = useCallback(
    (productId: string, weight: number) => {
      if (!user || !productId) return;

      const key = `${productId}_${weight}`;
      queryClient.cancelQueries({ queryKey: cartKeys.all });
      if (debounceTimers.current[key])
        clearTimeout(debounceTimers.current[key]);
      delete pendingDeltas.current[key];
      delete debounceTimers.current[key];

      dispatch(removeItemAction({ productId, weight }));
      removeFromCartMutation.mutate(
        { productId, weight },
        {
          onSuccess: () => {
            if (Object.keys(pendingDeltas.current).length === 0) {
              queryClient.invalidateQueries({ queryKey: cartKeys.all });
            }
          },
          onError: () => refetch(),
        },
      );
    },
    [user, dispatch, removeFromCartMutation, refetch, queryClient],
  );

  const clearCart = useCallback(() => {
    if (!user) return;

    queryClient.cancelQueries({ queryKey: cartKeys.all });
    Object.values(debounceTimers.current)?.forEach(clearTimeout);
    pendingDeltas.current = {};
    debounceTimers.current = {};

    dispatch(clearCartAction());
    clearCartMutation.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: cartKeys.all });
      },
      onError: () => refetch(),
    });
  }, [user, dispatch, clearCartMutation, refetch, queryClient]);

  const itemCount = useMemo(
    () => items?.filter((item) => item?.quantity > 0)?.length,
    [items],
  );

  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) =>
          sum + (item?.price ?? item?.product?.price ?? 0) * item?.quantity,
        0,
      ),
    [items],
  );

  return {
    items,
    ready: !isLoading,
    isFetching,
    addItem,
    updateQuantity,
    increment,
    decrement,
    removeItem,
    clearCart,
    getItemQuantity,
    isInCart,
    refetch,
    itemCount,
    subtotal,
  };
}

export default useCart;
