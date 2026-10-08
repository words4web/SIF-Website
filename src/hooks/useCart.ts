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

function normalizeCartItem(item: any): CartItem | null {
  const prod = item?.productId;
  if (!prod?._id) return null;
  return {
    product: {
      id: prod?._id,
      name: prod?.name,
      slug: prod?.slug,
      description: prod?.description,
      pack: prod?.pack || null,
      price: prod?.price || null,
      unit: prod?.unit,
      images: Array.isArray(prod?.images) ? prod?.images : [],
      imageUrl:
        Array.isArray(prod?.images) && prod?.images.length > 0
          ? prod?.images[0]
          : undefined,
      categoryId:
        typeof prod?.categoryId === "object"
          ? prod?.categoryId?._id
          : prod?.categoryId || "",
      categoryName:
        typeof prod?.categoryId === "object" ? prod?.categoryId?.name : "",
      isVatApplicable: prod?.isVatApplicable ?? false,
    },
    quantity: item.quantity,
  };
}

export function useCart(): CartContextValue {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const user = useSelector((state: RootState) => state?.auth?.user);
  const items = useSelector((state: RootState) => state?.cart?.items || []);

  const { data: cartData, isLoading, refetch } = useCartQuery(!!user);
  const addToCartMutation = useAddToCartMutation();
  const removeFromCartMutation = useRemoveFromCartMutation();
  const clearCartMutation = useClearCartMutation();

  const pendingDeltas = useRef<Record<string, number>>({});
  const debounceTimers = useRef<Record<string, NodeJS.Timeout>>({});

  const flushDebouncedMutation = useCallback(
    (productId: string) => {
      const netDiff = pendingDeltas.current[productId];
      delete pendingDeltas.current[productId];
      delete debounceTimers.current[productId];

      if (!netDiff || netDiff === 0) return;

      const handleSuccess = () => {
        if (Object.keys(pendingDeltas.current).length === 0) {
          queryClient.invalidateQueries({ queryKey: cartKeys.all });
        }
      };

      if (netDiff > 0) {
        addToCartMutation.mutate(
          { productId, quantity: netDiff },
          { onSuccess: handleSuccess, onError: () => refetch() },
        );
      } else {
        removeFromCartMutation.mutate(
          { productId, quantity: Math.abs(netDiff) },
          { onSuccess: handleSuccess, onError: () => refetch() },
        );
      }
    },
    [addToCartMutation, removeFromCartMutation, refetch, queryClient],
  );

  useEffect(() => {
    return () => {
      Object.values(debounceTimers.current).forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    if (user && cartData?.data?.items) {
      const hasActiveDebounce = Object.keys(pendingDeltas.current).length > 0;
      if (!hasActiveDebounce) {
        const mappedItems = cartData.data.items
          ?.map(normalizeCartItem)
          ?.filter((item: CartItem | null): item is CartItem => item !== null);

        dispatch(setCart(mappedItems));
      }
    }
  }, [user, cartData, dispatch]);

  const queueDebouncedDelta = useCallback(
    (productId: string, delta: number) => {
      queryClient.cancelQueries({ queryKey: cartKeys.all });

      pendingDeltas.current[productId] =
        (pendingDeltas.current[productId] || 0) + delta;

      if (debounceTimers.current[productId]) {
        clearTimeout(debounceTimers.current[productId]);
      }

      debounceTimers.current[productId] = setTimeout(() => {
        flushDebouncedMutation(productId);
      }, 500);
    },
    [flushDebouncedMutation, queryClient],
  );

  const getItemQuantity = useCallback(
    (productId: string): number => {
      const found = items.find((item) => item?.product?.id === productId);
      return found ? found.quantity : 0;
    },
    [items],
  );

  const isInCart = useCallback(
    (productId: string): boolean => getItemQuantity(productId) > 0,
    [getItemQuantity],
  );

  const addItem = useCallback(
    (product: Product, quantity = 1) => {
      if (!user || !product?.id) return;

      dispatch(addItemAction({ product, quantity }));
      queueDebouncedDelta(product.id, quantity);
    },
    [user, dispatch, queueDebouncedDelta],
  );

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      if (!user || !id) return;

      const currentItem = items.find((item) => item?.product?.id === id);
      const currentQty = currentItem?.quantity || 0;
      const diff = quantity - currentQty;

      if (diff === 0) return;

      dispatch(updateQuantityAction({ id, quantity }));

      if (quantity <= 0) {
        queryClient.cancelQueries({ queryKey: cartKeys.all });
        if (debounceTimers.current[id])
          clearTimeout(debounceTimers.current[id]);
        delete pendingDeltas.current[id];
        delete debounceTimers.current[id];

        removeFromCartMutation.mutate(
          { productId: id },
          {
            onSuccess: () => {
              if (Object.keys(pendingDeltas.current).length === 0) {
                queryClient.invalidateQueries({ queryKey: cartKeys.all });
              }
            },
            onError: () => refetch(),
          },
        );
        return;
      }

      queueDebouncedDelta(id, diff);
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
    (product: Product) => {
      const currentQty = getItemQuantity(product.id);
      if (currentQty === 0) {
        addItem(product, 1);
      } else {
        updateQuantity(product.id, currentQty + 1);
      }
    },
    [getItemQuantity, addItem, updateQuantity],
  );

  const decrement = useCallback(
    (id: string) => {
      const currentQty = getItemQuantity(id);
      if (currentQty <= 1) {
        updateQuantity(id, 0);
      } else {
        updateQuantity(id, currentQty - 1);
      }
    },
    [getItemQuantity, updateQuantity],
  );

  const removeItem = useCallback(
    (id: string) => {
      if (!user || !id) return;

      queryClient.cancelQueries({ queryKey: cartKeys.all });
      if (debounceTimers.current[id]) clearTimeout(debounceTimers.current[id]);
      delete pendingDeltas.current[id];
      delete debounceTimers.current[id];

      dispatch(removeItemAction(id));
      removeFromCartMutation.mutate(
        { productId: id },
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
    Object.values(debounceTimers.current).forEach(clearTimeout);
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
        (sum, item) => sum + (item?.product?.price ?? 0) * item.quantity,
        0,
      ),
    [items],
  );

  const vat = useMemo(
    () =>
      items.reduce(
        (sum, item) =>
          sum +
          (item?.product?.isVatApplicable
            ? (item?.product?.price ?? 0) * 0.2 * item.quantity
            : 0),
        0,
      ),
    [items],
  );

  return {
    items,
    ready: !isLoading,
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
    vat,
  };
}

export default useCart;
