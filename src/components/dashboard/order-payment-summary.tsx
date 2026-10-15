import { useTranslations } from "next-intl";
import { formatPounds } from "@/lib/format";
import { Receipt } from "lucide-react";
import { CartCharge } from "@/types/cart.types";

export function OrderPaymentSummary({
  subtotal,
  total,
  charges,
}: {
  subtotal: number;
  total: number;
  charges?: CartCharge[];
}) {
  const t = useTranslations("orders.detail");

  return (
    <div className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs space-y-3">
      <div className="flex items-center gap-2 border-b border-border/60 pb-3">
        <Receipt className="size-4.5 text-primary" />
        <h2 className="font-serif text-base font-bold text-foreground">
          {t("paymentSummary")}
        </h2>
      </div>

      <div className="space-y-2.5 text-sm pt-1">
        <div className="flex justify-between text-muted-foreground">
          <span>{t("subtotal")}</span>
          <span className="font-medium text-foreground">
            {formatPounds(subtotal || 0)}
          </span>
        </div>

        {charges && charges?.length > 0
          ? charges?.map((charge, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center text-muted-foreground">
                <span>{charge?.name}</span>
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
            ))
          : null}

        <div className="flex justify-between pt-3 border-t border-border font-serif text-lg sm:text-xl font-extrabold text-foreground">
          <span>{t("totalAmount")}</span>
          <span className="text-primary">
            {formatPounds(total || subtotal || 0)}
          </span>
        </div>
      </div>
    </div>
  );
}
