import { CartItem, CartCharge } from "./cart.types";
import { Address } from "./address.types";

export type OrderStatus =
  | "PAYMENT_PENDING"
  | "IN_PROCESS"
  | "DELIVERED"
  | "CANCELLED";

export interface OrderItemProduct {
  _id: string;
  name: string;
  slug: string;
  pack?: string;
  price: number;
  description?: string;
  images?: string[];
}

export interface OrderItem {
  productId: OrderItemProduct | string;
  weight?: number;
  quantity: number;
  price: number;
}

export interface DeliveryDetails {
  businessName: string;
  contactPerson: string;
  phone: string;
  address: string;
  notes?: string;
}

export interface Order {
  _id: string;
  userId: string;
  orderId: string;
  items: OrderItem[];
  subtotal: number;
  total: number;
  totalWeightKg?: number;
  charges?: CartCharge[];
  delivery: DeliveryDetails;
  status: OrderStatus;
  paymentMethod?: string;
  paymentStatus?: string;
  approvalUrl?: string;
  invoiceUrl?: string;
  deliveryNoteUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderCardProps {
  order: Order;
}

export interface OrderTabsProps {
  activeTab: OrderStatus;
  onTabChange: (tab: OrderStatus) => void;
  inProcessCount: number;
  deliveredCount: number;
}

export interface OrderConfirmation {
  orderId: string;
  placedAt: string;
  itemCount: number;
  total: number;
  delivery: DeliveryDetails;
}

export interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  total?: number;
  totalWeightKg?: number;
  charges?: CartCharge[];
  placing: boolean;
  disabled: boolean;
}

export interface DeliverySelectionProps {
  addresses: Address[];
  selectedAddressId: string;
  onSelectAddress: (id: string) => void;
  notes: string;
  onChangeNotes: (value: string) => void;
}

export interface OrderSuccessProps {
  order: Order;
}
