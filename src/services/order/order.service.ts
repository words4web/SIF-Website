import { axiosInstance } from "@/lib/axiosInstance";
import { API_ROUTES } from "@/constants/api";

export interface CreateOrderPayload {
  addressId: string;
  notes?: string;
}

export const orderService = {
  create: async (
    payload: CreateOrderPayload,
    options?: { idempotencyKey?: string },
  ) => {
    const headers: Record<string, string> = {};
    if (options?.idempotencyKey) {
      headers["Idempotency-Key"] = options.idempotencyKey;
    }
    const response = await axiosInstance.post(API_ROUTES.ORDERS, payload, {
      headers,
    });
    return response?.data;
  },

  list: async () => {
    const response = await axiosInstance.get(API_ROUTES.ORDERS);
    return response?.data;
  },

  getById: async (id: string) => {
    const response = await axiosInstance.get(API_ROUTES.ORDER_DETAIL(id));
    return response?.data;
  },
};
export default orderService;
