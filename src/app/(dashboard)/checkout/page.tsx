"use client";

import { ShoppingBag, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PortalHeader } from "@/components/portal-header";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useCreateOrder } from "@/services/order/order.hook";
import { OrderSummary } from "@/components/dashboard/order-summary";
import { DeliverySelection } from "@/components/dashboard/delivery-selection";
import Link from "next/link";
import { CheckoutSkeleton } from "@/components/skeleton/checkout-skeleton";
import {
  getOrCreateIdempotencyKey,
  resetIdempotencyKey,
} from "@/lib/idempotency";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    subtotal,
    total,
    totalWeightKg,
    charges,
    refetch,
    ready: cartReady,
    isFetching: cartFetching,
  } = useCart();
  const { user, ready: authReady } = useAuth();

  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    refetch();
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const status = params.get("status");
      const reason = params.get("reason");

      if (status === "cancelled") {
        resetIdempotencyKey();
        const cancelMsg =
          reason === "expired"
            ? "Payment session expired. Please try placing your order again."
            : "Payment was cancelled on PayPal.";
        setError(cancelMsg);
        toast.error(cancelMsg);
        window.history.replaceState({}, "", ROUTES.CHECKOUT);
      } else {
        getOrCreateIdempotencyKey();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createOrderMutation = useCreateOrder({
    onSuccess: (response) => {
      const data = response?.data;
      if (data?.approvalUrl) {
        window.location.href = data.approvalUrl;
      } else if (data?.id || data?._id) {
        router.push(ROUTES.ORDER_SUCCESS(data.id || data._id));
      }
    },
    onError: (err: any) => {
      const msg =
        err.response?.data?.message ||
        "Failed to place order. Please try again.";
      setError(msg);
      toast.error(msg);
    },
  });

  const addresses = user?.addresses || [];

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");

    if (!selectedAddressId) {
      const msg = "Please select a delivery address.";
      setError(msg);
      toast.error(msg);
      return;
    }

    if (!items.length) {
      const msg = "Your basket is empty.";
      setError(msg);
      toast.error(msg);
      return;
    }

    const idempotencyKey = getOrCreateIdempotencyKey();

    createOrderMutation.mutate({
      addressId: selectedAddressId,
      notes: notes?.trim() || undefined,
      idempotencyKey,
    });
  }

  const ready = cartReady && authReady;

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <PortalHeader />
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8 flex-1 w-full">
        <Link
          href={ROUTES.CART}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="size-3.5 sm:size-4" /> Back to cart
        </Link>

        {!ready ? (
          <CheckoutSkeleton />
        ) : items?.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <ShoppingBag className="size-8" />
            </div>
            <h2 className="mt-4 font-serif text-2xl font-bold">
              Your cart is empty
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm">
              You don&apos;t have any items in your shopping cart to checkout.
            </p>
            <Button asChild className="mt-6" size="lg">
              <Link href={ROUTES.CATALOGUE}>
                Browse Catalogue <ArrowRight className="size-4 ml-1.5" />
              </Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 sm:mt-8 space-y-6">
            {error && (
              <div
                className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-xs sm:text-sm font-semibold text-destructive flex items-center justify-between"
                role="alert">
                <span>{error}</span>
              </div>
            )}
            <div className="grid gap-6 lg:gap-8 lg:grid-cols-[1fr_360px] w-full min-w-0">
              <div className="flex flex-col gap-6 min-w-0 w-full">
                <DeliverySelection
                  addresses={addresses}
                  selectedAddressId={selectedAddressId}
                  onSelectAddress={setSelectedAddressId}
                  notes={notes}
                  onChangeNotes={setNotes}
                />
              </div>
              <div className="min-w-0 w-full">
                <OrderSummary
                  items={items}
                  subtotal={subtotal}
                  total={total}
                  totalWeightKg={totalWeightKg}
                  charges={charges}
                  placing={createOrderMutation.isPending}
                  disabled={createOrderMutation.isPending || !!cartFetching}
                />
              </div>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
