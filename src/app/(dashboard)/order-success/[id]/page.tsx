"use client";

import { use, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { PortalHeader } from "@/components/portal-header";
import { OrderSuccess } from "@/components/dashboard/order-success";
import { useOrderDetailQuery } from "@/services/order/order.hook";
import { useCart } from "@/hooks/useCart";
import { clearIdempotencyKey } from "@/lib/idempotency";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { ShoppingBag, ArrowLeft } from "lucide-react";

export default function OrderSuccessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const t = useTranslations("orderSuccess");
  const { id } = use(params);
  const { refetch } = useCart();
  const { data, isLoading, isError } = useOrderDetailQuery(id);
  const hasCleanedUp = useRef(false);

  useEffect(() => {
    if (hasCleanedUp.current) return;
    hasCleanedUp.current = true;

    clearIdempotencyKey();
    refetch();
  }, [refetch]);

  const order = data?.data;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PortalHeader />
      <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 sm:px-6 sm:py-10">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <div className="size-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            <p className="text-sm font-medium text-muted-foreground">
              {t("loading")}
            </p>
          </div>
        ) : isError || !order ? (
          <div className="max-w-md mx-auto text-center py-20 space-y-4">
            <div className="size-16 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
              <ShoppingBag className="size-8" />
            </div>
            <h2 className="font-serif text-2xl font-bold">
              {t("notFoundTitle")}
            </h2>
            <p className="text-sm text-muted-foreground">{t("notFoundDesc")}</p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <Button asChild variant="outline">
                <Link href={ROUTES.ORDERS}>
                  <ArrowLeft className="size-4 mr-1.5" /> {t("orderHistory")}
                </Link>
              </Button>
              <Button asChild>
                <Link href={ROUTES.CATALOGUE}>{t("browseCatalogue")}</Link>
              </Button>
            </div>
          </div>
        ) : (
          <OrderSuccess order={order} />
        )}
      </div>
    </div>
  );
}
