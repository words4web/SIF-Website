import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ProductGrid } from "@/components/product-card";
import { ProductGridSkeleton } from "@/components/skeleton/product-skeleton";

export function ProductsSection({
  products,
  isLoading = false,
}: {
  products: any[];
  isLoading?: boolean;
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-14 md:py-20 lg:px-8">
      <div className="mb-7 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl font-extrabold tracking-tight">
            Popular wholesale picks
          </h2>
        </div>
        <Link
          href="/catalogue"
          className="hidden items-center gap-1 text-sm font-bold text-primary hover:underline sm:flex">
          View all <ChevronRight className="size-4" />
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
