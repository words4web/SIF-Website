"use client";

import { PortalHeader } from "@/components/portal-header";
import { HeroBannerVideo } from "@/components/dashboard/hero-banner-video";
import { HeroSection } from "@/components/dashboard/hero-section";
import { DistributedBrandsSection } from "@/components/dashboard/distributed-brands-section";
import { QualityAssuranceSection } from "@/components/dashboard/quality-assurance-section";
import { CategoriesSection } from "@/components/dashboard/categories-section";
import { ProductsSection } from "@/components/dashboard/products-section";
import { FeaturesSection } from "@/components/dashboard/features-section";
import { TrustStorySection } from "@/components/dashboard/trust-story-section";
import { TestimonialsSection } from "@/components/dashboard/testimonials-section";
import { Footer } from "@/components/footer";
import { useLocale } from "next-intl";
import { useCategories } from "@/services/category/category.hook";
import { useProducts } from "@/services/product/product.hook";
import { resolveLocalized } from "@/lib/format";

import { useAuth } from "@/hooks/useAuth";

export default function Page() {
  const { user } = useAuth();
  const locale = useLocale();

  const { data: categoriesData, isLoading: isLoadingCategories } =
    useCategories();
  const fetchedCategories = categoriesData?.data?.categories || [];

  const { data: productsData, isLoading: isLoadingProducts } = useProducts({
    limit: 32,
  });
  const fetchedProducts = productsData?.data?.products || [];

  const categories = fetchedCategories?.map((cat: any) => ({
    id: cat?._id,
    name: resolveLocalized(cat?.name, locale),
    slug: cat?.slug,
    image: cat?.image || null,
    tagline: resolveLocalized(cat?.tagline, locale) || null,
    description: resolveLocalized(cat?.description, locale) || null,
  }));

  const featured = fetchedProducts?.map((prod: any) => ({
    id: prod?._id,
    name: resolveLocalized(prod?.name, locale),
    slug: prod?.slug,
    sku: prod?.sku,
    description: resolveLocalized(prod?.description, locale) || "",
    variants: Array.isArray(prod?.variants) ? prod?.variants : [],
    pack: prod?.pack || null,
    price:
      Array.isArray(prod?.variants) && prod?.variants?.length > 0
        ? prod?.variants[0]?.price
        : prod?.price || null,
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
      typeof prod?.categoryId === "object"
        ? resolveLocalized(prod?.categoryId?.name, locale)
        : "",
  }));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PortalHeader />
      <main className="flex-grow">
        <HeroSection />
        <HeroBannerVideo />
        <DistributedBrandsSection />
        <QualityAssuranceSection />
        <FeaturesSection />
        <CategoriesSection
          categories={categories}
          isLoading={isLoadingCategories}
        />
        <TrustStorySection />
        <ProductsSection products={featured} isLoading={isLoadingProducts} />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}
