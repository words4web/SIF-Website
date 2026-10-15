"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { formatPrice, formatWeight } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/common/ProductImage";
import { OrderSummaryProps } from "@/types/order.types";

export function OrderSummary({
  items,
  subtotal,
  total,
  totalWeightKg,
  charges = [],
  placing,
  disabled,
}: OrderSummaryProps) {
  const t = useTranslations("checkout.summary");
  const estimatedTotal = typeof total === "number" ? total : subtotal;

  return (
    <aside className="order-first lg:order-last h-fit rounded-2xl border border-border/80 bg-card p-4 sm:p-6 shadow-sm space-y-4 w-full min-w-0 max-w-full">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <h2 className="font-serif text-lg sm:text-xl font-bold text-foreground">
          {t("title")}
        </h2>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
          {t("itemCount", { count: items?.length || 0 })}
        </span>
      </div>

      <div className="space-y-2.5 max-h-64 sm:max-h-72 overflow-y-auto pr-2 custom-scrollbar">
        {items?.map(({ product, weight, price, quantity }) => {
          const itemUnitPrice = price ?? product?.price ?? 0;
          return (
            <div
              key={`${product?.id}-${weight}`}
              className="group flex items-center gap-3 p-2 sm:p-2.5 rounded-xl border border-border/50 bg-background/60 hover:bg-accent/40 transition-colors">
              <div className="relative shrink-0">
                <ProductImage
                  src={
                    product?.imageUrl ||
                    (Array.isArray(product?.images) &&
                    product?.images?.length > 0
                      ? product.images[0]
                      : undefined)
                  }
                  alt={product?.name || t("productFallback")}
                  size="sm"
                />
                <span className="absolute bottom-0.5 right-0.5 min-w-5 h-4 px-1 rounded-md bg-foreground/90 text-[10px] font-bold text-background flex items-center justify-center shadow-xs z-10">
                  x{quantity}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="text-xs sm:text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                  {product?.name}
                </h4>
                <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                  {weight ? (
                    <span className="font-semibold text-primary">
                      {formatWeight(weight)}
                    </span>
                  ) : product?.pack ? (
                    <span className="font-medium truncate">{product.pack}</span>
                  ) : null}
                  {(weight || product?.pack) && <span>•</span>}
                  <span>
                    {formatPrice(itemUnitPrice)} {t("each")}
                  </span>
                </p>
              </div>

              <div className="shrink-0 text-right">
                <span className="font-bold text-xs sm:text-sm text-foreground">
                  {formatPrice(itemUnitPrice * quantity)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>{t("subtotal")}</span>
          <span className="font-semibold text-foreground">
            {formatPrice(subtotal)}
          </span>
        </div>

        {charges?.map((charge, idx) => {
          const isShipping = charge?.type === "SHIPPING";
          const hasWeight =
            typeof totalWeightKg === "number" && totalWeightKg > 0;
          const chargeName = isShipping
            ? hasWeight
              ? t("shippingChargeWithWeight", { weight: totalWeightKg })
              : t("shippingCharge")
            : charge?.name;

          return (
            <div
              key={`${charge?.type}-${idx}`}
              className="flex justify-between items-center text-muted-foreground">
              <span>{chargeName}</span>
              {Number(charge?.amount) === 0 ? (
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {t("free")}
                </span>
              ) : (
                <span className="font-semibold text-foreground">
                  {formatPrice(charge?.amount)}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="border-t border-border/60 pt-3 flex justify-between items-baseline">
        <div>
          <span className="font-bold text-sm sm:text-base text-foreground block">
            {t("estimatedTotal")}
          </span>
        </div>
        <span className="font-serif text-xl sm:text-2xl font-extrabold text-primary">
          {formatPrice(estimatedTotal)}
        </span>
      </div>

      <Button
        type="submit"
        className="mt-2 w-full h-11 sm:h-12 rounded-xl font-bold text-sm shadow-md cursor-pointer transition-all hover:shadow-lg"
        size="lg"
        disabled={disabled || placing}>
        {placing ? t("redirecting") : t("proceedToPayPal")}{" "}
        <ArrowRight className="size-4 ml-1.5" />
      </Button>
    </aside>
  );
}

export default OrderSummary;
