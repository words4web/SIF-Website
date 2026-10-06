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
import { useCategories } from "@/services/category/category.hook";
import { useProducts } from "@/services/product/product.hook";

import { useAuth } from "@/hooks/useAuth";

export default function Page() {
  const { user } = useAuth();

  const { data: categoriesData, isLoading: isLoadingCategories } =
    useCategories();
  const fetchedCategories = categoriesData?.data?.categories || [];

  const { data: productsData, isLoading: isLoadingProducts } = useProducts({
    limit: 32,
  });
  const fetchedProducts = productsData?.data?.products || [];

  const categories = fetchedCategories?.map((cat: any) => ({
    id: cat?._id,
    name: cat?.name,
    slug: cat?.slug,
    image: cat?.image || null,
    tagline: cat?.tagline || null,
    description: cat?.description || null,
  }));

  const featured = fetchedProducts?.map((prod: any) => ({
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
