import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { addressService } from "./address.service";
import { AddressPayload } from "@/types/address.types";

const PROFILE_QUERY_KEY = ["profile"];

export const useCreateAddress = (options?: {
  onSuccess?: (data: any) => void;
}) => {
  const queryClient = useQueryClient();
  const t = useTranslations("toasts");

  return useMutation({
    mutationFn: (payload: AddressPayload) => addressService.create(payload),
    onSuccess: (data) => {
      toast.success(data?.message || t("addressAdded"));
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
      options?.onSuccess?.(data);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || t("addressAddFailed"));
    },
  });
};

export const useUpdateAddress = (options?: {
  onSuccess?: (data: any) => void;
}) => {
  const queryClient = useQueryClient();
  const t = useTranslations("toasts");

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<AddressPayload>;
    }) => addressService.update(id, payload),
    onSuccess: (data) => {
      toast.success(data?.message || t("addressUpdated"));
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
      options?.onSuccess?.(data);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || t("addressUpdateFailed"));
    },
  });
};

export const useDeleteAddress = (options?: {
  onSuccess?: (data: any) => void;
}) => {
  const queryClient = useQueryClient();
  const t = useTranslations("toasts");

  return useMutation({
    mutationFn: (id: string) => addressService.delete(id),
    onSuccess: (data) => {
      toast.success(data?.message || t("addressRemoved"));
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
      options?.onSuccess?.(data);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || t("addressRemoveFailed"));
    },
  });
};
