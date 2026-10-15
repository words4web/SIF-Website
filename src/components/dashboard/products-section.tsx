"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ChevronRight } from "lucide-react";
import { ProductGrid } from "@/components/product-card";
import { ProductGridSkeleton } from "@/components/skeleton/product-skeleton";
import { ROUTES } from "@/constants/routes";

export function ProductsSection({
  products,
  isLoading = false,
}: {
  products: any[];
  isLoading?: boolean;
}) {
  const t = useTranslations("productsSection");

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 md:py-20 lg:px-8">
      <div className="mb-7 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl font-extrabold tracking-tight">
            {t("title")}
          </h2>
        </div>
        <Link
          href={ROUTES.CATALOGUE}
          className="hidden items-center gap-1 text-sm font-bold text-primary hover:underline sm:flex">
          {t("viewAll")} <ChevronRight className="size-4" />
        </Link>
      </div>
      {isLoading ? (
        <ProductGridSkeleton count={8} />
      ) : (
        <ProductGrid products={products} />
      )}
    </section>
  );
}

export default ProductsSection;
