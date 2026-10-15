import Link from "next/link";
import { useTranslations } from "next-intl";
import { ExternalLink, Package } from "lucide-react";
import { ProductImage } from "@/components/common/ProductImage";
import { formatPrice, formatWeight } from "@/lib/format";
import { ROUTES } from "@/constants/routes";
import { OrderItem } from "@/types/order.types";

export function OrderItemsList({ items }: { items: OrderItem[] }) {
  const t = useTranslations("orders.detail");

  return (
    <div className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <Package className="size-5 text-primary" />
          <h2 className="font-serif text-lg font-bold text-foreground">
            {t("orderedItems", { count: items?.length || 0 })}
          </h2>
        </div>
      </div>

      <div className="divide-y divide-border/60 max-h-[520px] overflow-y-auto pr-1">
        {items?.map((item, idx) => {
          const prod =
            typeof item?.productId === "object" ? item?.productId : null;
          const name = prod?.name || t("productFallback");
          const pack = prod?.pack ? ` (${prod?.pack})` : "";
          const imgUrl =
            Array.isArray(prod?.images) && prod?.images?.length > 0
              ? prod?.images[0]
              : undefined;

          return (
            <div
              key={prod?._id ? `${prod._id}-${item?.weight || idx}` : idx}
              className="py-3.5 first:pt-1 last:pb-1 flex items-center justify-between gap-3 text-sm">
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                <ProductImage
                  src={imgUrl}
                  alt={name}
                  size="sm"
                  containerClassName="shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    {prod?.slug ? (
                      <Link
                        href={ROUTES.PRODUCT_DETAIL(prod.slug)}
                        className="font-bold text-foreground hover:text-primary transition-colors flex items-center gap-1.5 group truncate text-sm">
                        <span className="truncate">{name}</span>
                        <ExternalLink className="size-3 text-muted-foreground group-hover:text-primary shrink-0 opacity-70" />
                      </Link>
                    ) : (
                      <p className="font-bold text-foreground truncate text-sm">
                        {name}
                      </p>
                    )}
                    {item?.weight ? (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-extrabold bg-primary/10 text-primary border border-primary/20">
                        {formatWeight(item.weight)}
                      </span>
                    ) : null}
                  </div>

                  <p className="text-xs text-muted-foreground mt-0.5">
                    <span className="font-semibold text-foreground/80">
                      {t("qty", { qty: item?.quantity })}
                    </span>{" "}
                    × {formatPrice(item?.price || 0)}
                    {pack && !item?.weight && (
                      <span className="ml-1 text-muted-foreground/70">
                        • {pack}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <p className="font-serif font-bold text-foreground text-sm sm:text-base">
                  {formatPrice((item?.price || 0) * (item?.quantity || 0))}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
