"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ProductImage } from "@/components/common/ProductImage";
import { CartItem } from "@/types/cart.types";
import { formatPrice, formatWeight } from "@/lib/format";
import { ROUTES } from "@/constants/routes";
import { CartControl } from "@/components/cart/cart-control";

export function CartItemCard({
  item,
}: {
  item: CartItem;
  updateQuantity?: (
    productId: string,
    weight: number,
    quantity: number,
  ) => void;
  removeItem?: (productId: string, weight: number) => void;
}) {
  const t = useTranslations("cart");
  const { product, weight, price, quantity } = item;
  const itemUnitPrice = price ?? product?.price ?? 0;
  const itemTotal = itemUnitPrice * quantity;

  const imgUrl =
    product?.imageUrl ||
    (Array.isArray(product?.images) && product?.images?.length > 0
      ? product?.images?.[0]
      : undefined);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border border-border/80 bg-card p-4 sm:p-5 shadow-sm">
      <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
        <Link
          href={ROUTES.PRODUCT_DETAIL(product?.slug)}
          className="shrink-0 hover:opacity-90 transition-opacity">
          <ProductImage
            src={imgUrl}
            alt={product?.name || t("productFallback")}
            size="md"
          />
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href={ROUTES.PRODUCT_DETAIL(product?.slug)}
              className="font-serif text-base sm:text-lg font-bold hover:text-primary transition-colors line-clamp-2">
              {product?.name}
            </Link>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-extrabold border border-primary/20">
              {formatWeight(weight)}
            </span>
            {product?.sku && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-muted text-muted-foreground text-[11px] font-mono font-medium border border-border/60">
                {product?.sku}
              </span>
            )}
          </div>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground flex items-center gap-2 flex-wrap">
            <span>{t("pack", { weight: formatWeight(weight) })}</span>
            <span>·</span>
            <span>{t("perPack", { price: formatPrice(itemUnitPrice) })}</span>
          </p>
          <div className="mt-3 sm:mt-4">
            <CartControl
              product={product}
              selectedWeight={weight}
              variant="cart-item"
            />
          </div>
        </div>
      </div>
      <div className="flex sm:flex-col items-center justify-between sm:items-end border-t sm:border-t-0 border-border/40 pt-3 sm:pt-0">
        <span className="sm:hidden text-xs text-muted-foreground font-medium">
          {t("itemTotal")}
        </span>
        <p className="font-serif text-base sm:text-lg font-extrabold text-foreground">
          {formatPrice(itemTotal)}
        </p>
      </div>
    </div>
  );
}
