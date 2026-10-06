"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Layers,
} from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { CategoryVisual } from "@/components/product-visual";
import { CategoriesSectionSkeleton } from "@/components/skeleton/category-skeleton";
import { CategoriesSectionProps } from "@/types/category/category.types";

export function CategoriesSection({
  categories = [],
  isLoading = false,
}: CategoriesSectionProps & { isLoading?: boolean }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (isLoading) {
    return <CategoriesSectionSkeleton count={3} />;
  }

  if (!categories || categories?.length === 0) return null;

  return (
    <section className="relative py-16 sm:py-24 bg-gradient-to-b from-[#fbf9f6] via-white to-[#fbf9f6] border-y border-stone-200/90 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-[#ffd230]/15 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(#cb242c 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
              <Sparkles className="size-3.5 text-primary" />
              <span>Wholesale Master Catalog</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.15]">
              Premier Indian <br className="hidden sm:inline" />
              <span className="text-primary bg-clip-text">
                Product Categories
              </span>
            </h2>
            <p className="text-sm md:text-base text-stone-600 mt-3 max-w-xl leading-relaxed">
              Explore authentic high-demand FMCG staples distributed directly
              across Italy with genuine factory freshness and compliance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-stone-700 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-stone-200/80 shadow-xs">
              <ShieldCheck className="size-4 text-emerald-600" />
              <span>100% Certified Italian Supply</span>
            </div>

            <Link
              href={ROUTES.CATALOGUE}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-stone-900 hover:bg-primary text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 group">
              <span>View All Products</span>
              <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {categories?.map((cat, idx) => {
            const targetHref = ROUTES.CATALOGUE_CATEGORY(cat?.slug || cat?.id);

            return (
              <div
                key={cat?.id}
                onMouseEnter={() => setHoveredId(cat?.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative flex flex-col justify-between rounded-3xl bg-white border border-stone-200/90 shadow-sm hover:shadow-2xl hover:border-primary/40 transition-all duration-300 overflow-hidden hover:-translate-y-1.5">
                <div className="p-5 sm:p-6 pb-0">
                  <div className="relative w-full h-60 sm:h-64 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/80 shadow-inner group-hover:shadow-md transition-all">
                    {cat?.image ? (
                      <Image
                        src={cat?.image}
                        alt={cat?.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-amber-500/5 to-stone-100 p-6 text-center">
                        <CategoryVisual category={cat} index={idx} />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 transition-opacity duration-300" />

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-md group-hover:text-amber-200 transition-colors">
                        {cat?.name}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6 pt-5 flex-grow flex flex-col justify-between space-y-6">
                  <div className="space-y-3.5">
                    {cat.tagline && (
                      <div className="px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
                        <p className="text-xs sm:text-sm font-semibold text-primary italic leading-snug">
                          &ldquo;{cat.tagline}&rdquo;
                        </p>
                      </div>
                    )}

                    {cat.description && (
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
                        {cat.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-stone-100">
                    <Link
                      href={targetHref}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-stone-900 hover:bg-primary text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all duration-200 group/btn">
                      <span>Explore Category</span>
                      <ArrowUpRight className="size-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>

                <div className="h-1.5 w-full bg-gradient-to-r from-primary via-amber-400 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>

        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-stone-700">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Layers className="size-3.5" />
              <span>Comprehensive B2B Supply</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold">
              Looking for custom pallet mixes or scheduled container orders?
            </h4>
            <p className="text-xs sm:text-sm text-stone-300">
              Our direct logistics hub in Reggio Emilia coordinates delivery
              schedules across Italy.
            </p>
          </div>

          <Link
            href={ROUTES.CATALOGUE}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-amber-400 text-stone-900 hover:text-stone-950 font-extrabold text-xs sm:text-sm transition-all duration-200 shadow-md hover:shadow-lg shrink-0">
            <span>Browse Full Catalogue</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CategoriesSection;
