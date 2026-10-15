"use client";

import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  Package,
  MapPin,
  Phone,
  Building2,
  Clock,
  FileText,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { formatPounds } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { OrderSuccessProps } from "@/types/order.types";
import { ROUTES } from "@/constants/routes";

export function OrderSuccess({ order }: OrderSuccessProps) {
  const t = useTranslations("orderSuccess");
  const totalItems =
    order?.items?.reduce((acc, item) => acc + (item?.quantity || 0), 0) || 0;

  return (
    <main className="mx-auto max-w-2xl px-3.5 sm:px-6 py-8 sm:py-16 animate-fade-in w-full min-w-0">
      <div className="text-center">
        <div className="relative mx-auto flex size-14 sm:size-20 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 sm:ring-8 ring-primary/5">
          <CheckCircle2 className="size-7 sm:size-10" />
        </div>
        <span className="mt-4 sm:mt-6 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-primary">
          <Clock className="size-3 sm:size-3.5 animate-spin" />
          {t("placedBadge")}
        </span>
        <h1 className="mt-2 sm:mt-3 font-serif text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          {t("thankYouTitle")}
        </h1>
        <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed px-2">
          {t("thankYouSubtitle", { orderId: order?.orderId })}
        </p>
      </div>

      <div className="mt-6 sm:mt-8 overflow-hidden rounded-xl sm:rounded-2xl border border-border/80 bg-card shadow-md sm:shadow-lg shadow-black/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 border-b border-border/60 bg-muted/40 px-4 sm:px-6 py-3.5 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <Package className="size-4 sm:size-5 text-primary shrink-0" />
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-muted-foreground block leading-tight">
                {t("orderIdLabel")}
              </span>
              <span className="font-mono text-sm sm:text-base font-extrabold text-foreground">
                #{order?.orderId}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              {t("statusLabel")}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs font-bold text-amber-700 dark:text-amber-400 border border-amber-500/20">
              <span className="size-1.5 sm:size-2 rounded-full bg-amber-500 animate-ping" />
              {t("statusInProcess")}
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
          {order?.delivery && (
            <div className="rounded-lg sm:rounded-xl border border-border/60 bg-background/50 p-3.5 sm:p-4 space-y-2.5 sm:space-y-3">
              <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <MapPin className="size-3.5 sm:size-4 text-primary shrink-0" />
                <span>{t("deliveryDetails")}</span>
              </div>
              <div className="grid gap-2 text-xs sm:text-sm">
                <div className="flex items-start gap-2 min-w-0">
                  <Building2 className="size-3.5 sm:size-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span className="font-semibold text-foreground truncate sm:whitespace-normal">
                    {order?.delivery?.businessName} —{" "}
                    {order?.delivery?.contactPerson}
                  </span>
                </div>
                <div className="flex items-start gap-2 min-w-0">
                  <MapPin className="size-3.5 sm:size-4 text-muted-foreground shrink-0 mt-0.5 opacity-40" />
                  <span className="text-muted-foreground leading-snug break-words">
                    {order?.delivery?.address}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                  <Phone className="size-3 sm:size-3.5 shrink-0" />
                  <span>{order?.delivery?.phone}</span>
                </div>
                {order?.delivery?.notes && (
                  <div className="mt-1 sm:mt-2 flex items-start gap-2 text-xs bg-muted/60 p-2 sm:p-2.5 rounded-lg border border-border/40 text-muted-foreground break-words">
                    <FileText className="size-3.5 shrink-0 mt-0.5 text-primary" />
                    <span>
                      <strong className="text-foreground">
                        {t("notePrefix")}
                      </strong>{" "}
                      {order?.delivery?.notes}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="space-y-3 text-xs sm:text-sm">
            <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {t("orderSummary")}
            </h4>
            <div className="space-y-2 border-b border-border/60 pb-3 sm:pb-4">
              <div className="flex justify-between items-center text-muted-foreground">
                <span>{t("totalItems")}</span>
                <span className="font-bold text-foreground bg-muted px-2 py-0.5 rounded-full text-[11px] sm:text-xs">
                  {t("itemCount", { count: totalItems })}
                </span>
              </div>
              <div className="flex justify-between items-center text-muted-foreground">
                <span>{t("subtotal")}</span>
                <span className="font-semibold text-foreground">
                  {formatPounds(order?.subtotal)}
                </span>
              </div>
              {order?.charges && order?.charges?.length > 0
                ? order?.charges?.map((charge, idx) => {
                    const isShipping = charge?.type === "SHIPPING";
                    const hasWeight =
                      typeof order?.totalWeightKg === "number" &&
                      order.totalWeightKg > 0;
                    const weightVal = order?.totalWeightKg ?? 0;
                    const chargeName = isShipping
                      ? hasWeight
                        ? t("shippingChargeWithWeight", {
                            weight: weightVal,
                          })
                        : t("shippingCharge")
                      : charge?.name;

                    return (
                      <div
                        key={idx}
                        className="flex justify-between items-center text-muted-foreground">
                        <span>{chargeName}</span>
                        <span
                          className={
                            charge?.amount === 0
                              ? "text-emerald-600 dark:text-emerald-400 font-bold"
                              : "font-semibold text-foreground"
                          }>
                          {charge?.amount === 0
                            ? t("free")
                            : formatPounds(charge?.amount)}
                        </span>
                      </div>
                    );
                  })
                : null}
            </div>

            <div className="flex justify-between items-center pt-1 sm:pt-2">
              <span className="font-bold text-sm sm:text-base text-foreground">
                {t("totalPaid")}
              </span>
              <span className="text-primary font-serif text-xl sm:text-2xl font-extrabold tracking-tight">
                {formatPounds(order?.total)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 w-full">
        <Button
          asChild
          size="lg"
          className="w-full sm:w-auto font-semibold shadow-md transition-all hover:shadow-lg h-11 sm:h-12">
          <Link href={ROUTES.CATALOGUE}>
            {t("continueShopping")} <ArrowRight className="size-4 ml-1.5" />
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="w-full sm:w-auto font-semibold h-11 sm:h-12">
          <Link href={ROUTES.ORDERS}>{t("viewOrderHistory")}</Link>
        </Button>
      </div>
    </main>
  );
}

export default OrderSuccess;
