"use client";

import { useParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { PortalHeader } from "@/components/portal-header";
import { ProductDetail } from "@/components/product-detail";
import { ErrorView } from "@/components/common/ErrorView";
import { useProductDetail } from "@/services/product/product.hook";
import { ProductDetailSkeleton } from "@/components/skeleton/product-detail-skeleton";
import { resolveLocalized } from "@/lib/format";

export default function ProductPage() {
  const t = useTranslations("productDetail");
  const locale = useLocale();
  const { slug } = useParams<{ slug: string }>();

  const { data, isLoading, isError, error, refetch } = useProductDetail(slug);
  const productData = data?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <PortalHeader />
        <ProductDetailSkeleton />
      </div>
    );
  }

  if (isError || !productData) {
    return (
      <div className="min-h-screen bg-background">
        <PortalHeader />
        <main className="mx-auto max-w-3xl px-5 py-20">
          <ErrorView
            message={(error as any)?.response?.data?.message ?? t("notFound")}
            onRetry={refetch}
          />
        </main>
      </div>
    );
  }

  const product = {
    id: productData?._id,
    name: resolveLocalized(productData?.name, locale),
    slug: productData?.slug,
    sku: productData?.sku,
    description: resolveLocalized(productData?.description, locale) || "",
    variants: Array.isArray(productData?.variants) ? productData?.variants : [],
    pack: productData?.pack || null,
    price:
      Array.isArray(productData?.variants) && productData?.variants?.length > 0
        ? productData?.variants?.[0]?.price
        : productData?.price || null,
    unit: productData?.unit,
    images: Array.isArray(productData?.images) ? productData?.images : [],
    imageUrl:
      Array.isArray(productData?.images) && productData?.images?.length > 0
        ? productData.images[0]
        : undefined,
    categoryId:
      typeof productData?.categoryId === "object"
        ? productData?.categoryId?._id
        : productData?.categoryId || "",
    categoryName:
      typeof productData?.categoryId === "object"
        ? resolveLocalized(productData?.categoryId?.name, locale)
        : "",
    relatedProducts: Array.isArray(productData?.relatedProducts)
      ? productData?.relatedProducts.map((rel: any) => ({
          ...rel,
          name: resolveLocalized(rel?.name, locale),
          description: resolveLocalized(rel?.description, locale),
        }))
      : [],
  };

  return (
    <>
      <PortalHeader />
      <ProductDetail product={product} />
    </>
  );
}
