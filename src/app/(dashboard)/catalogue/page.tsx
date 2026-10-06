"use client";

import { PortalHeader } from "@/components/portal-header";
import { EmptyProducts, ProductGrid } from "@/components/product-card";
import { ProductGridSkeleton } from "@/components/skeleton/product-skeleton";
import { ErrorView } from "@/components/common/ErrorView";
import { CatalogueFilters } from "@/components/dashboard/catalogue-filters";
import { CatalogueCategoryBannerSkeleton } from "@/components/skeleton/category-skeleton";
import { useCategories } from "@/services/category/category.hook";
import { useProducts } from "@/services/product/product.hook";
import { CategoryItem } from "@/types/category/category.types";
import { useCatalogueFilters } from "@/hooks/useCatalogueFilters";

export default function CataloguePage() {
  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    isError: isCategoriesError,
    error: categoriesError,
    refetch: refetchCategories,
  } = useCategories({ limit: 100 });
  const fetchedCategories = categoriesData?.data?.categories || [];

  const categories: CategoryItem[] = fetchedCategories.map((cat: any) => ({
    id: cat?._id,
    name: cat?.name,
    slug: cat?.slug,
    image: cat?.image || null,
    tagline: cat?.tagline || null,
    description: cat?.description || null,
  }));

  const {
    query,
    debouncedQuery,
    selectedCategoryIdentifier,
    activeCategory,
    selectCategory,
    setQuery,
  } = useCatalogueFilters(categories);

  const {
    data: productsData,
    isLoading: isLoadingProducts,
    isError: isProductsError,
    error: productsError,
    refetch: refetchProducts,
  } = useProducts({
    limit: 100,
    categoryId: activeCategory?.id || undefined,
    search: debouncedQuery?.trim() || undefined,
  });
  const fetchedProducts = productsData?.data?.products || [];

  const products = fetchedProducts?.map((prod: any) => ({
    id: prod?._id,
    name: prod?.name,
    slug: prod?.slug,
    description: prod?.description || "",
    pack: prod?.pack || null,
    price: prod?.price || null,
    unit: prod?.unit,
    images: Array.isArray(prod?.images) ? prod?.images : [],
    imageUrl:
      Array.isArray(prod?.images) && prod?.images?.length > 0
        ? prod.images[0]
        : undefined,
    categoryId:
      typeof prod?.categoryId === "object"
        ? prod?.categoryId?._id
        : prod?.categoryId || "",
    categoryName:
      typeof prod?.categoryId === "object" ? prod?.categoryId?.name : "",
  }));

  return (
    <div className="min-h-screen bg-background">
      <PortalHeader />
      <main className="mx-auto max-w-7xl px-3.5 sm:px-5 pb-10">
        <CatalogueFilters
          query={query}
          setQuery={setQuery}
          selectedCategory={selectedCategoryIdentifier}
          onSelectCategory={selectCategory}
          categories={categories}
          isLoadingCategories={isLoadingCategories}
        />

        {isLoadingCategories && !query ? (
          <CatalogueCategoryBannerSkeleton />
        ) : activeCategory && !query ? (
          <div className="mt-5 sm:mt-6 relative rounded-3xl border border-stone-200/90 bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/[0.03] rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-[#ffd230]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6 lg:gap-8">
              {activeCategory?.image ? (
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 shadow-md shrink-0 group">
                  <img
                    src={activeCategory?.image}
                    alt={activeCategory?.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                </div>
              ) : null}

              <div className="flex-grow min-w-0 space-y-2.5">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
                    {activeCategory?.name}
                  </h1>

                  {activeCategory?.tagline && (
                    <p className="text-xs sm:text-sm font-semibold text-primary italic mt-1 leading-snug">
                      &ldquo;{activeCategory?.tagline}&rdquo;
                    </p>
                  )}
                </div>

                {activeCategory?.description && (
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-3xl">
                    {activeCategory?.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : null}

        {isCategoriesError || isProductsError ? (
          <ErrorView
            message={
              (categoriesError as any)?.response?.data?.message ??
              (productsError as any)?.response?.data?.message ??
              "Failed to load catalogue. Please check your connection."
            }
            onRetry={() => {
              refetchCategories();
              refetchProducts();
            }}
            className="mt-6 sm:mt-8"
          />
        ) : isLoadingProducts ? (
          <div className="mt-5 sm:mt-8">
            <ProductGridSkeleton count={8} />
          </div>
        ) : (
          <div className="mt-5 sm:mt-8">
            {products.length ? (
              <ProductGrid products={products} />
            ) : (
              <EmptyProducts query={query} />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
