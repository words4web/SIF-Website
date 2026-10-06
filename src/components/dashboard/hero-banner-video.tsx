"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Coffee,
  Flame,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroBannerVideo() {
  return (
    <section className="relative overflow-hidden py-8 sm:py-16 lg:py-20 bg-gradient-to-b from-background via-muted/20 to-background border-b border-border/50">
      <div className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl sm:rounded-3xl lg:rounded-[36px] border border-border/80 bg-card p-4 sm:p-8 lg:p-12 shadow-md sm:shadow-xl shadow-black/5 overflow-hidden">
          <div className="absolute -top-32 -right-32 size-64 sm:size-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 size-64 sm:size-96 rounded-full bg-accent/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid gap-6 sm:gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6 space-y-4 sm:space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 sm:px-4 py-1 text-[11px] sm:text-xs font-bold text-accent-foreground shadow-xs">
                  <BadgeCheck className="size-3.5 sm:size-4 text-primary" />
                  <span>Authorized Tata Importer</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-muted/50 px-2.5 sm:px-3.5 py-1 text-[11px] sm:text-xs font-semibold text-muted-foreground">
                  <ShieldCheck className="size-3.5 sm:size-4 text-primary" />
                  <span>EU Food Certified</span>
                </span>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold leading-[1.2] sm:leading-[1.16] tracking-tight text-foreground">
                  Authentic Tata Essentials <br className="hidden sm:inline" />
                  <span className="text-primary">
                    Direct to Italian Supermarkets
                  </span>
                </h2>
                <p className="text-xs sm:text-sm md:text-base leading-relaxed text-muted-foreground max-w-lg">
                  Empowering 500+ food distributors and retail stores across
                  Italy with genuine Tata Tea, Tata Sampann unrefined pulses,
                  and Tata Salt.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1">
                <div className="flex items-center gap-2.5 sm:gap-3 rounded-xl sm:rounded-2xl border border-border/70 bg-muted/40 p-2.5 sm:p-3.5 hover:bg-muted/70 transition-colors">
                  <div className="flex size-9 sm:size-10 items-center justify-center rounded-lg sm:rounded-xl bg-primary/10 text-primary shrink-0">
                    <MapPin className="size-4 sm:size-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs font-bold text-foreground truncate">
                      Direct from Cremona
                    </span>
                    <span className="block text-[10px] sm:text-[11px] text-muted-foreground truncate">
                      Temperature-controlled hub
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3 rounded-xl sm:rounded-2xl border border-border/70 bg-muted/40 p-2.5 sm:p-3.5 hover:bg-muted/70 transition-colors">
                  <div className="flex size-9 sm:size-10 items-center justify-center rounded-lg sm:rounded-xl bg-primary/10 text-primary shrink-0">
                    <Coffee className="size-4 sm:size-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs font-bold text-foreground truncate">
                      Original Indian Chai
                    </span>
                    <span className="block text-[10px] sm:text-[11px] text-muted-foreground truncate">
                      Tata Tea Gold &amp; Premium
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 pt-1 sm:pt-2">
                <Button
                  asChild
                  size="lg"
                  className="rounded-xl px-5 sm:px-6 py-5 sm:py-6 font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all w-full sm:w-auto">
                  <Link
                    href="/catalogue"
                    className="flex items-center justify-center gap-2">
                    <span>Explore Catalogue</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-xl px-5 sm:px-6 py-5 sm:py-6 font-bold text-xs sm:text-sm border-border/80 hover:bg-muted transition-all w-full sm:w-auto">
                  <Link
                    href="/login"
                    className="flex items-center justify-center">
                    <span>Trade Account Login</span>
                  </Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6 mt-2 lg:mt-0">
              <div className="relative group overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl border border-border/80 bg-zinc-950 shadow-lg sm:shadow-2xl aspect-[16/10] sm:aspect-[16/9]">
                <video
                  src="/SIF-header-banner-video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-between p-3 sm:p-5 lg:p-6">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 sm:px-3.5 py-1 text-[10px] sm:text-[11px] font-bold text-white backdrop-blur-md border border-white/15 shadow-sm">
                      <Flame className="size-3 sm:size-3.5 text-accent animate-pulse" />
                      <span>Authentic Tea Brewing</span>
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-white bg-primary px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg shadow-sm">
                      Tata Tea Premium
                    </span>
                  </div>

                  <div className="flex items-end justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 text-accent text-[11px] sm:text-xs font-bold mb-0.5 sm:mb-1">
                        <Sparkles className="size-3 sm:size-3.5 shrink-0" />
                        <span>Iconic Morning Ritual</span>
                      </div>
                      <h4 className="font-serif text-sm sm:text-lg lg:text-xl font-bold text-white tracking-tight truncate">
                        Rich &amp; Aromatic Indian Chai
                      </h4>
                      <p className="text-[11px] sm:text-xs text-white/80 mt-0.5 max-w-sm hidden sm:block">
                        Direct importer for supermarket chains and Indian food
                        distributors in Italy.
                      </p>
                    </div>
                    <div className="flex size-9 sm:size-11 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-white/20 text-white backdrop-blur-md border border-white/25 shadow-md">
                      <Coffee className="size-4 sm:size-6 text-accent" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBannerVideo;
