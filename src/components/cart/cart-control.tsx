"use client";

import { useRouter } from "next/navigation";
import { Check, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Product, ProductVariant } from "@/types/product/product.types";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { formatPrice, formatWeight, resolveLocalized } from "@/lib/format";
import { useLocale } from "next-intl";

interface CartControlProps {
  product: Product;
  selectedWeight?: number;
  onWeightChange?: (weight: number) => void;
  showWeightSelector?: boolean;
  variant?: "card" | "detail" | "cart-item";
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm";
  className?: string;
  showRemoveButton?: boolean;
}

export function CartControl({
  product,
  selectedWeight: externalWeight,
  onWeightChange,
  showWeightSelector,
  variant = "card",
  size,
  className,
  showRemoveButton = true,
}: CartControlProps) {
  const t = useTranslations("cart");
  const locale = useLocale();
  const router = useRouter();
  const { user } = useAuth();
  const { items, getItemQuantity, addItem, increment, decrement, removeItem } =
    useCart();

  const variants: ProductVariant[] =
    Array.isArray(product?.variants) && product.variants.length > 0
      ? product.variants
      : [{ weight: 500, price: product?.price || 0, stock: 0 }];

  const [internalWeight, setInternalWeight] = useState<number>(
    variants[0]?.weight || 500,
  );
  const [detailStepperQty, setDetailStepperQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const activeWeight =
    externalWeight !== undefined ? externalWeight : internalWeight;

  const handleSelectWeight = (weight: number) => {
    if (externalWeight === undefined) {
      setInternalWeight(weight);
    }
    onWeightChange?.(weight);
  };

  const activeVariant =
    variants?.find((v) => Number(v?.weight) === Number(activeWeight)) ||
    variants[0];
  const activePrice = activeVariant?.price ?? product?.price ?? 0;
  const activeStock = activeVariant?.stock ?? 0;

  const quantity = getItemQuantity(product?.id, activeWeight);

  const isStockLimitReached = quantity >= activeStock;

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(ROUTES.LOGIN);
  };

  const isOutOfStock = activeStock <= 0;

  if (variant === "detail") {
    const handleDetailAdd = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (isOutOfStock || isStockLimitReached) return;
      if (!user) {
        router.push(ROUTES.LOGIN);
        return;
      }
      const qtyToAdd = Math.min(
        detailStepperQty,
        Math.max(0, activeStock - quantity),
      );
      if (qtyToAdd <= 0) return;
      addItem(product, activeWeight, qtyToAdd);
      setJustAdded(true);
      window.setTimeout(() => setJustAdded(false), 1600);
    };

    return (
      <div className={cn("space-y-4", className)}>
        {showWeightSelector && variants.length > 1 && (
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
              {t("selectVariant")}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {variants?.map((v) => {
                const isSelected = Number(activeWeight) === Number(v?.weight);
                const vStock = v?.stock ?? 0;
                const isVOutOfStock = vStock <= 0;
                return (
                  <button
                    key={v?.weight}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleSelectWeight(v?.weight);
                    }}
                    className={cn(
                      "flex flex-col items-start p-3 rounded-xl border text-left transition-all cursor-pointer",
                      isSelected
                        ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-xs"
                        : "border-border/70 bg-card hover:bg-muted/40",
                      isVOutOfStock && "opacity-60 bg-muted/30 border-dashed",
                    )}>
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs sm:text-sm font-extrabold text-foreground">
                        {formatWeight(v?.weight)}
                      </span>
                      {isVOutOfStock && (
                        <span className="text-[9px] font-bold text-destructive bg-destructive/10 px-1.5 py-0.5 rounded">
                          {t("outOfStock")}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-bold text-primary mt-0.5">
                      {formatPrice(v?.price)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex flex-row items-center gap-2.5 sm:gap-3">
          <div className="flex items-center justify-between rounded-xl border border-input bg-card shadow-sm overflow-hidden h-10 sm:h-11 shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDetailStepperQty((prev) => Math.max(1, prev - 1));
              }}
              disabled={!user || isOutOfStock}
              className="px-3 sm:px-4 h-full hover:bg-muted transition-colors disabled:opacity-50 cursor-pointer"
              aria-label={t("decreaseAria")}>
              <Minus className="size-3.5 sm:size-4" />
            </button>
            <span className="px-3 sm:px-4 text-xs sm:text-sm font-extrabold min-w-[2rem] sm:min-w-[2.5rem] text-center">
              {isOutOfStock ? 0 : detailStepperQty}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDetailStepperQty((prev) =>
                  Math.min(activeStock > 0 ? activeStock : 1, prev + 1),
                );
              }}
              disabled={
                !user || isOutOfStock || detailStepperQty >= activeStock
              }
              className="px-3 sm:px-4 h-full hover:bg-muted transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
              aria-label={t("increaseAria")}>
              <Plus className="size-3.5 sm:size-4" />
            </button>
          </div>

          {isOutOfStock ? (
            <Button
              disabled
              size="lg"
              variant="outline"
              className="flex-1 h-10 sm:h-11 text-xs sm:text-sm rounded-xl font-bold bg-muted/60 text-muted-foreground border-border/80 cursor-not-allowed">
              <span>{t("outOfStock")}</span>
            </Button>
          ) : user ? (
            <Button
              onClick={handleDetailAdd}
              disabled={isStockLimitReached}
              size="lg"
              className="flex-1 h-10 sm:h-11 text-xs sm:text-sm rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
              {justAdded ? (
                <Check className="size-3.5 sm:size-4" />
              ) : (
                <ShoppingCart className="size-3.5 sm:size-4" />
              )}
              <span>{justAdded ? t("addedToCart") : t("addToCart")}</span>
            </Button>
          ) : (
            <Button
              asChild
              className="flex-1 h-10 sm:h-11 text-xs sm:text-sm rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              size="lg">
              <button type="button" onClick={handleLoginClick}>
                {t("loginToAdd")}
              </button>
            </Button>
          )}
        </div>
      </div>
    );
  }

  if (variant === "cart-item") {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <div className="flex items-center rounded-xl border border-input bg-card shadow-sm overflow-hidden h-9">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              decrement(product?.id, activeWeight);
            }}
            className="px-3 h-full hover:bg-muted transition-colors cursor-pointer"
            aria-label={t("decreaseAria")}>
            <Minus className="size-3.5" />
          </button>
          <span className="px-3 text-xs sm:text-sm font-extrabold min-w-[2rem] text-center">
            {quantity}
          </span>
          <button
            type="button"
            disabled={isStockLimitReached}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              increment(product, activeWeight);
            }}
            className="px-3 h-full hover:bg-muted transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label={t("increaseAria")}>
            <Plus className="size-3.5" />
          </button>
        </div>

        {showRemoveButton && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              removeItem(product?.id, activeWeight);
            }}
            className="inline-flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-destructive transition-colors cursor-pointer">
            <Trash2 className="size-3.5" /> {t("remove")}
          </button>
        )}
      </div>
    );
  }

  const renderActionControl = () => {
    if (isOutOfStock) {
      return (
        <Button
          size={size || "sm"}
          variant="outline"
          disabled
          className="relative z-10 text-[10px] sm:text-[11px] h-7 sm:h-8 px-2 sm:px-2.5 bg-muted/50 text-muted-foreground border-border/80 cursor-not-allowed opacity-80 font-medium"
          aria-label={t("outOfStock")}>
          {t("outOfStock")}
        </Button>
      );
    }

    if (!user) {
      return (
        <Button
          size={size || "sm"}
          variant="outline"
          onClick={handleLoginClick}
          className="relative z-10 text-[10px] sm:text-[11px] h-7 sm:h-8 px-2 sm:px-3 cursor-pointer"
          aria-label={t("loginToAdd")}>
          {t("loginToAdd")}
        </Button>
      );
    }

    if (quantity > 0) {
      return (
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex items-center rounded-lg sm:rounded-xl border border-primary/30 bg-primary/5 text-primary shadow-xs overflow-hidden h-7 sm:h-8">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              decrement(product?.id, activeWeight);
            }}
            className="px-2 sm:px-2.5 h-full hover:bg-primary/15 transition-colors cursor-pointer flex items-center justify-center"
            aria-label={t("decreaseAria")}>
            <Minus className="size-3 sm:size-3.5" />
          </button>
          <span className="px-1.5 sm:px-2 text-xs font-extrabold min-w-[1.5rem] sm:min-w-[1.75rem] text-center select-none text-foreground">
            {quantity}
          </span>
          <button
            type="button"
            disabled={isStockLimitReached}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              increment(product, activeWeight);
            }}
            className="px-2 sm:px-2.5 h-full hover:bg-primary/15 transition-colors cursor-pointer flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label={t("increaseAria")}>
            <Plus className="size-3 sm:size-3.5" />
          </button>
        </div>
      );
    }

    const handleCardAdd = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (isStockLimitReached) return;
      addItem(product, activeWeight, 1);
      setJustAdded(true);
      window.setTimeout(() => setJustAdded(false), 1200);
    };

    return (
      <Button
        size={size || "sm"}
        variant={justAdded ? "secondary" : "default"}
        disabled={isStockLimitReached}
        onClick={handleCardAdd}
        className="relative z-10 cursor-pointer h-7 sm:h-8 px-2 sm:px-3 text-xs transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label={`${justAdded ? t("added") : t("add")} ${resolveLocalized(product?.name, locale)}`}>
        {justAdded ? (
          <Check className="size-3.5 sm:size-4" />
        ) : (
          <Plus className="size-3.5 sm:size-4" />
        )}
        <span className="hidden sm:inline">
          {justAdded ? t("added") : t("add")}
        </span>
      </Button>
    );
  };

  if (showWeightSelector) {
    return (
      <div
        className={cn("space-y-2", className)}
        onClick={(e) => e.stopPropagation()}>
        {variants?.length > 1 && (
          <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
            {variants?.map((v) => {
              const isSelected = Number(activeWeight) === Number(v?.weight);
              const vStock = v?.stock ?? 0;
              const isVOutOfStock = vStock <= 0;
              return (
                <button
                  key={v?.weight}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSelectWeight(v?.weight);
                  }}
                  className={cn(
                    "text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md border transition-all cursor-pointer",
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-xs"
                      : "bg-muted/60 text-muted-foreground border-border/70 hover:bg-muted hover:text-foreground",
                    isVOutOfStock && "opacity-60 line-through",
                  )}>
                  {formatWeight(v?.weight)}
                </button>
              );
            })}
          </div>
        )}
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-[10px] sm:text-[11px] font-medium text-muted-foreground leading-none mb-0.5">
              {formatWeight(activeWeight)}
            </span>
            <p className="font-serif text-sm sm:text-lg font-extrabold text-foreground leading-tight">
              {formatPrice(activePrice)}
            </p>
          </div>
          {renderActionControl()}
        </div>
      </div>
    );
  }

  return renderActionControl();
}
