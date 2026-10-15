import { OrderStatus } from "@/types/order.types";
import { CheckCircle2, Clock, AlertCircle, XCircle } from "lucide-react";

export interface OrderStatusMeta {
  badgeClass: string;
  icon: any;
  labelKey: `statuses.${OrderStatus}.label`;
  descriptionKey: `statuses.${OrderStatus}.description`;
}

export const ORDER_STATUS_CONFIG: Record<OrderStatus, OrderStatusMeta> = {
  PAYMENT_PENDING: {
    badgeClass:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    icon: AlertCircle,
    labelKey: "statuses.PAYMENT_PENDING.label",
    descriptionKey: "statuses.PAYMENT_PENDING.description",
  },
  IN_PROCESS: {
    badgeClass:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    icon: Clock,
    labelKey: "statuses.IN_PROCESS.label",
    descriptionKey: "statuses.IN_PROCESS.description",
  },
  DELIVERED: {
    badgeClass: "bg-primary/10 text-primary border-primary/20",
    icon: CheckCircle2,
    labelKey: "statuses.DELIVERED.label",
    descriptionKey: "statuses.DELIVERED.description",
  },
  CANCELLED: {
    badgeClass:
      "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    icon: XCircle,
    labelKey: "statuses.CANCELLED.label",
    descriptionKey: "statuses.CANCELLED.description",
  },
};
