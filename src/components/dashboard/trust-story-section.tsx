"use client";

import React from "react";
import Link from "next/link";
import {
  Ship,
  CalendarDays,
  Building,
  Layers,
  ArrowRight,
  ShieldCheck,
  Anchor,
  Compass,
  FileCheck2,
  Landmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CORPORATE_STORY_DATA } from "@/data/corporate-story";

const STAT_ICONS = {
  Ship,
  CalendarDays,
  Building,
  Layers,
};

const PILLAR_ICONS = {
  Anchor,
  Compass,
  ShieldCheck,
  FileCheck2,
};

export function TrustStorySection() {
  const {
    badge,
    headingPrefix,
    headingHighlight,
    description,
    pillars,
    stats,
  } = CORPORATE_STORY_DATA;

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-[#faf8f5] via-white to-[#faf8f5] border-t border-stone-200/80 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[120px]" />
        <div className="absolute -bottom-32 right-1/4 w-[500px] h-[500px] bg-[#ffd230]/15 rounded-full blur-[120px]" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="grid gap-12 lg:gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4 w-fit shadow-xs">
              <Landmark className="w-3.5 h-3.5" />
              <span>{badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 leading-[1.15]">
              {headingPrefix}{" "}
              <span className="text-primary">{headingHighlight}</span>
            </h2>

            <p className="mt-5 text-sm sm:text-base leading-relaxed text-stone-600 font-normal">
              {description}
            </p>

            <div className="mt-7 pt-6 border-t border-stone-200/80 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {pillars.map((pillar, idx) => {
                const IconComponent = PILLAR_ICONS[pillar.iconName];
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-stone-200/80 shadow-xs">
                    <div
                      className={`w-7 h-7 rounded-lg ${pillar.iconBg} flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>
                    <span
                      className={`text-xs font-semibold ${pillar.textColor}`}>
                      {pillar.title}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Button
                asChild
                size="lg"
                className="rounded-xl font-bold bg-primary hover:bg-[#b01e25] text-white shadow-md shadow-primary/20 transition-all h-12">
                <Link
                  href="/catalog"
                  className="flex items-center justify-center gap-2">
                  <span>Explore B2B Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-xl font-bold border-stone-300 text-stone-700 hover:bg-stone-50 h-12">
                <Link
                  href="/login"
                  className="flex items-center justify-center">
                  Trade Account Access
                </Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {stats.map((stat, idx) => {
                const IconComponent = STAT_ICONS[stat.iconName];
                return (
                  <div
                    key={idx}
                    className={`group relative p-6 sm:p-7 rounded-3xl bg-white border border-stone-200/90 shadow-sm hover:shadow-xl ${stat.accentBorder} hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden`}>
                    <div
                      className={`absolute -top-12 -right-12 w-36 h-36 bg-gradient-to-br ${stat.glowColor} rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500`}
                    />

                    <div className="relative z-10 flex items-center justify-between mb-6">
                      <div
                        className={`w-12 h-12 rounded-2xl border ${stat.iconBg} flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-110`}>
                        <IconComponent className="w-6 h-6" />
                      </div>

                      <span className="text-[10px] font-extrabold tracking-widest text-stone-400 uppercase px-2.5 py-1 rounded-md bg-stone-100/80 border border-stone-200/60">
                        {stat.badge}
                      </span>
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl sm:text-5xl font-black text-stone-900 tracking-tight">
                          {stat.number}
                        </span>
                        <span className="text-2xl sm:text-3xl font-extrabold text-primary">
                          {stat.suffix}
                        </span>
                      </div>

                      <h3 className="mt-3 font-bold text-base sm:text-lg text-stone-900 group-hover:text-primary transition-colors leading-snug">
                        {stat.title}
                      </h3>

                      <p className="mt-2 text-xs sm:text-sm text-stone-500 leading-relaxed font-normal">
                        {stat.desc}
                      </p>
                    </div>

                    <div className="relative z-10 mt-6 pt-3.5 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-stone-400 group-hover:text-primary transition-colors">
                        Verified Metric
                      </span>
                      <div className="w-6 h-6 rounded-full bg-stone-50 group-hover:bg-primary/10 flex items-center justify-center text-stone-400 group-hover:text-primary transition-colors">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
