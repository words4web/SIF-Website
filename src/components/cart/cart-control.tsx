"use client";

import { useRouter } from "next/navigation";
import { Check, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useState } from "react";
import { Product } from "@/types/product/product.types";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

interface CartControlProps {
  product: Product;
  variant?: "card" | "detail" | "cart-item";
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm";
  className?: string;
  showRemoveButton?: boolean;
}

export function CartControl({
  product,
  variant = "card",
  size,
  className,
  showRemoveButton = true,
}: CartControlProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { getItemQuantity, addItem, increment, decrement, removeItem } =
    useCart();

  const [detailStepperQty, setDetailStepperQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const quantity = getItemQuantity(product?.id);

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(ROUTES.LOGIN);
  };

  if (variant === "detail") {
    const handleDetailAdd = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!user) {
        router.push(ROUTES.LOGIN);
        return;
      }
      addItem(product, detailStepperQty);
      setJustAdded(true);
      window.setTimeout(() => setJustAdded(false), 1600);
    };

    return (
      <div
        className={cn(
          "flex flex-row items-center gap-2.5 sm:gap-3",
          className,
        )}>
        <div className="flex items-center justify-between rounded-xl border border-input bg-card shadow-sm overflow-hidden h-10 sm:h-11 shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDetailStepperQty((prev) => Math.max(1, prev - 1));
            }}
            disabled={!user}
            className="px-3 sm:px-4 h-full hover:bg-muted transition-colors disabled:opacity-50 cursor-pointer"
            aria-label="Decrease quantity">
            <Minus className="size-3.5 sm:size-4" />
          </button>
          <span className="px-3 sm:px-4 text-xs sm:text-sm font-extrabold min-w-[2rem] sm:min-w-[2.5rem] text-center">
            {detailStepperQty}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDetailStepperQty((prev) => prev + 1);
            }}
            disabled={!user}
            className="px-3 sm:px-4 h-full hover:bg-muted transition-colors disabled:opacity-50 cursor-pointer"
            aria-label="Increase quantity">
            <Plus className="size-3.5 sm:size-4" />
          </button>
        </div>

        {user ? (
          <Button
            onClick={handleDetailAdd}
            size="lg"
            className="flex-1 h-10 sm:h-11 text-xs sm:text-sm rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer">
            {justAdded ? (
              <Check className="size-3.5 sm:size-4" />
            ) : (
              <ShoppingCart className="size-3.5 sm:size-4" />
            )}
            <span>{justAdded ? "Added to cart" : "Add to cart"}</span>
          </Button>
        ) : (
          <Button
            asChild
            className="flex-1 h-10 sm:h-11 text-xs sm:text-sm rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            size="lg">
            <button type="button" onClick={handleLoginClick}>
              Login to Add
            </button>
          </Button>
        )}
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
              decrement(product?.id);
            }}
            className="px-3 h-full hover:bg-muted transition-colors cursor-pointer"
            aria-label="Decrease quantity">
            <Minus className="size-3.5" />
          </button>
          <span className="px-3 text-xs sm:text-sm font-extrabold min-w-[2rem] text-center">
            {quantity}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              increment(product);
            }}
            className="px-3 h-full hover:bg-muted transition-colors cursor-pointer"
            aria-label="Increase quantity">
            <Plus className="size-3.5" />
          </button>
        </div>

        {showRemoveButton && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              removeItem(product?.id);
            }}
            className="inline-flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-destructive transition-colors cursor-pointer">
            <Trash2 className="size-3.5" /> Remove
          </button>
        )}
      </div>
    );
  }

  if (!user) {
    return (
      <Button
        size={size || "sm"}
        variant="outline"
        onClick={handleLoginClick}
        className={cn(
          "relative z-10 text-[10px] sm:text-[11px] h-7 sm:h-8 px-2 sm:px-3 cursor-pointer",
          className,
        )}
        aria-label="Login to add to basket">
        Login to Add
      </Button>
    );
  }

  if (quantity > 0) {
    return (
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "flex items-center rounded-lg sm:rounded-xl border border-primary/30 bg-primary/5 text-primary shadow-xs overflow-hidden h-7 sm:h-8",
          className,
        )}>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            decrement(product?.id);
          }}
          className="px-2 sm:px-2.5 h-full hover:bg-primary/15 transition-colors cursor-pointer flex items-center justify-center"
          aria-label="Decrease quantity">
          <Minus className="size-3 sm:size-3.5" />
        </button>
        <span className="px-1.5 sm:px-2 text-xs font-extrabold min-w-[1.5rem] sm:min-w-[1.75rem] text-center select-none text-foreground">
          {quantity}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            increment(product);
          }}
          className="px-2 sm:px-2.5 h-full hover:bg-primary/15 transition-colors cursor-pointer flex items-center justify-center"
          aria-label="Increase quantity">
          <Plus className="size-3 sm:size-3.5" />
        </button>
      </div>
    );
  }

  const handleCardAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <Button
      size={size || "sm"}
      variant={justAdded ? "secondary" : "default"}
      onClick={handleCardAdd}
      className={cn(
        "relative z-10 cursor-pointer h-7 sm:h-8 px-2 sm:px-3 text-xs transition-all",
        className,
      )}
      aria-label={`${justAdded ? "Added" : "Add"} ${product?.name} to basket`}>
      {justAdded ? (
        <Check className="size-3.5 sm:size-4" />
      ) : (
        <Plus className="size-3.5 sm:size-4" />
      )}
      <span className="hidden sm:inline">{justAdded ? "Added" : "Add"}</span>
    </Button>
  );
}
