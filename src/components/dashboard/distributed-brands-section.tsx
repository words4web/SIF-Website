"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Package,
  Truck,
  Building2,
} from "lucide-react";
import { DISTRIBUTED_BRANDS, BRAND_CERTIFICATIONS } from "@/data/brands";

export function DistributedBrandsSection() {
  const [selectedBrandId, setSelectedBrandId] = useState<string>(
    DISTRIBUTED_BRANDS[0]?.id || "",
  );

  const activeBrand =
    DISTRIBUTED_BRANDS.find((b) => b.id === selectedBrandId) ||
    DISTRIBUTED_BRANDS[0];

  return (
    <section className="relative py-12 md:py-20 lg:py-24 bg-gradient-to-b from-[#faf8f5] via-white to-[#faf8f5] border-y border-stone-200/80 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-72 md:w-96 h-72 md:h-96 bg-primary/[0.06] rounded-full blur-[80px] md:blur-[100px]" />
        <div className="absolute -bottom-40 -right-40 w-72 md:w-96 h-72 md:h-96 bg-[#ffd230]/20 rounded-full blur-[80px] md:blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#cb242c 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 md:gap-6 mb-8 md:mb-14 border-b border-stone-200/80 pb-6 md:pb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 md:px-3.5 md:py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] md:text-xs font-semibold uppercase tracking-wider mb-3 md:mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Scale and Trust in Distribution throughout Italy</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 leading-tight">
              Brands we distribute <br className="hidden sm:inline" />
              <span className="text-primary">throughout Italy</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 md:gap-4 text-xs md:text-sm text-stone-600 font-medium">
            <div className="flex items-center gap-1.5 sm:gap-2 bg-white px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-stone-200/80 shadow-xs">
              <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              <span>Nationwide Fleet</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 bg-white px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-stone-200/80 shadow-xs">
              <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#cb242c]" />
              <span>Direct Wholesale</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 bg-white px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-stone-200/80 shadow-xs">
              <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
              <span>100% Genuine</span>
            </div>
          </div>
        </div>

        <div className="lg:hidden mb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none snap-x">
            {DISTRIBUTED_BRANDS.map((brand, idx) => {
              const isSelected = brand.id === activeBrand.id;
              return (
                <button
                  key={brand.id}
                  type="button"
                  onClick={() => setSelectedBrandId(brand.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap snap-start border transition-all ${
                    isSelected
                      ? "bg-primary text-white border-primary shadow-sm shadow-primary/30"
                      : "bg-white text-stone-700 border-stone-200 hover:border-stone-300"
                  }`}>
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-stone-100 text-stone-500"
                    }`}>
                    {idx + 1}
                  </span>
                  <span>{brand.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-8 items-stretch mb-10 md:mb-16">
          <div className="hidden lg:flex lg:col-span-5 flex-col gap-3.5 justify-center">
            {DISTRIBUTED_BRANDS.map((brand, idx) => {
              const isSelected = brand.id === activeBrand.id;
              return (
                <div
                  key={brand.id}
                  onClick={() => setSelectedBrandId(brand.id)}
                  onMouseEnter={() => setSelectedBrandId(brand.id)}
                  className={`group relative cursor-pointer rounded-2xl p-5 border transition-all duration-300 ${
                    isSelected
                      ? "bg-white border-primary shadow-lg shadow-primary/10 ring-2 ring-primary/20"
                      : "bg-white/80 border-stone-200 hover:bg-white hover:border-primary/40 hover:shadow-md"
                  }`}>
                  <div className="flex items-center gap-4">
                    <div
                      className={`relative w-16 h-16 rounded-xl p-2.5 flex items-center justify-center flex-shrink-0 transition-all ${
                        isSelected
                          ? "bg-stone-50 border border-primary/30 scale-105"
                          : "bg-stone-100/70 group-hover:bg-primary/5"
                      }`}>
                      <Image
                        src={brand.logo}
                        alt={brand.alt}
                        fill
                        sizes="64px"
                        className="object-contain p-1"
                      />
                    </div>

                    <div className="flex-grow min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                          0{idx + 1} &bull; {brand.category}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] uppercase font-bold text-white bg-primary px-2.5 py-0.5 rounded-full shadow-xs">
                            Active
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-stone-900 group-hover:text-primary transition-colors truncate mt-0.5">
                        {brand.name}
                      </h3>
                      <p className="text-xs text-stone-500 truncate mt-0.5 font-normal">
                        {brand.tagline}
                      </p>
                    </div>

                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all flex-shrink-0 ${
                        isSelected
                          ? "border-primary bg-primary text-white"
                          : "border-stone-200 text-stone-400 group-hover:border-primary group-hover:text-primary"
                      }`}>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  {isSelected && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-primary rounded-r-full" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-7">
            <div className="relative h-full rounded-2xl md:rounded-3xl p-5 sm:p-7 md:p-10 border border-stone-200 bg-white/95 backdrop-blur-md flex flex-col justify-between overflow-hidden shadow-xl shadow-stone-200/50">
              <div className="absolute top-0 right-0 w-60 md:w-80 h-60 md:h-80 bg-primary/[0.04] rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-60 md:w-80 h-60 md:h-80 bg-[#ffd230]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 pb-5 md:pb-6 border-b border-stone-200/80">
                <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-xl sm:rounded-2xl bg-stone-50 border border-stone-200/80 p-3 sm:p-4 shadow-sm flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                  <Image
                    key={activeBrand.id}
                    src={activeBrand.logo}
                    alt={activeBrand.alt}
                    fill
                    sizes="(max-width: 640px) 80px, 128px"
                    className="object-contain p-1.5 sm:p-2 animate-in fade-in zoom-in-95 duration-300"
                  />
                </div>

                <div className="flex-grow text-center sm:text-left w-full sm:w-auto">
                  <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 mb-1.5 sm:mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Official Brand Partner
                  </span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-stone-900">
                    {activeBrand.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-primary mt-0.5 sm:mt-1">
                    {activeBrand.tagline}
                  </p>
                </div>
              </div>

              <div className="relative z-10 py-4 sm:py-6">
                <h4 className="text-[11px] sm:text-xs uppercase font-bold text-stone-400 tracking-wider mb-1.5 sm:mb-2">
                  Distribution Portfolio Details
                </h4>
                <p className="text-xs sm:text-sm md:text-base text-stone-700 leading-relaxed max-w-xl">
                  {activeBrand.description}
                </p>
              </div>

              <div className="relative z-10 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-4 border-t border-stone-100">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 sm:gap-3 text-[11px] sm:text-xs text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Bulk Cartons
                  </span>
                  <span>&bull;</span>
                  <span>Direct Italian Invoicing</span>
                </div>

                <Link
                  href={activeBrand.href || "/catalog"}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-primary hover:bg-[#b01e25] text-white font-bold text-xs sm:text-sm shadow-md shadow-primary/25 hover:shadow-lg transition-all hover:gap-3">
                  <span>Explore {activeBrand.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 md:gap-5 pt-6 md:pt-8 border-t border-stone-200/80">
          {BRAND_CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className="relative p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-white border border-stone-200/80 hover:border-primary/40 hover:shadow-md transition-all group">
              <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                <span className="text-[10px] sm:text-[11px] font-extrabold tracking-widest text-primary uppercase px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-md bg-primary/10 border border-primary/20">
                  {cert.badge}
                </span>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center justify-center">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-stone-900 group-hover:text-primary transition-colors leading-snug">
                {cert.title}
              </h4>
              <p className="text-[11px] sm:text-xs text-stone-600 mt-1.5 sm:mt-2 leading-relaxed">
                {cert.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
