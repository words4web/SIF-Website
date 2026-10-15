import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { orderService, CreateOrderPayload } from "./order.service";

export interface CreateOrderMutationParams extends CreateOrderPayload {
  idempotencyKey?: string;
}

export const useCreateOrder = (options?: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: ({ idempotencyKey, ...payload }: CreateOrderMutationParams) =>
      orderService.create(payload, { idempotencyKey }),
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to place order.");
      options?.onError?.(error);
    },
  });
};

export const useOrdersQuery = (enabled: boolean) => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => orderService.list(),
    enabled,
  });
};

export const useOrderDetailQuery = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => orderService.getById(id),
    enabled: enabled && !!id,
  });
};
