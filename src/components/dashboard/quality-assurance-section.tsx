"use client";

import {
  Sprout,
  Warehouse,
  ShieldCheck,
  Truck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { SUPPLY_CHAIN_DATA } from "@/data/supply-chain";

const STEP_ICONS = {
  Sprout,
  Warehouse,
  ShieldCheck,
  Truck,
};

export function QualityAssuranceSection() {
  const { badge, title, description, steps } = SUPPLY_CHAIN_DATA;

  return (
    <section className="relative py-12 sm:py-16 md:py-24 bg-gradient-to-b from-white via-[#faf8f5] to-white border-y border-stone-200/80 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[320px] sm:w-[500px] md:w-[600px] h-[250px] md:h-[350px] bg-primary/[0.03] rounded-full blur-[80px] md:blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(#cb242c 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-3 sm:mb-4 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{badge}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 leading-tight">
            {title}
          </h2>

          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-stone-600 leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 -translate-y-8 pointer-events-none" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-7">
            {steps.map((step, idx) => {
              const Icon = STEP_ICONS[step.iconName];
              return (
                <div
                  key={step.id}
                  className="group relative flex flex-col justify-between p-5 sm:p-6 md:p-7 rounded-2xl md:rounded-3xl bg-white border border-stone-200/90 shadow-sm hover:shadow-xl hover:border-primary/50 sm:hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 sm:w-28 h-24 sm:h-28 bg-gradient-to-bl from-primary/10 via-primary/[0.02] to-transparent rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-125" />

                  <div>
                    <div className="relative z-10 flex items-center justify-between mb-4 sm:mb-5">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-stone-50 border border-stone-200 group-hover:border-primary/30 group-hover:bg-primary/10 flex items-center justify-center text-stone-700 group-hover:text-primary transition-all duration-300 p-2.5 sm:p-3 shadow-xs">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>

                      <span className="text-[10px] sm:text-xs font-black tracking-widest text-primary/90 bg-primary/5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg border border-primary/15">
                        STEP {step.stepNumber}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-2 border border-stone-200/60">
                      {step.tag}
                    </div>

                    <h3 className="text-base sm:text-lg font-extrabold text-stone-900 group-hover:text-primary transition-colors leading-snug">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-stone-100 flex items-center justify-between">
                    <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0" />
                      <span>{step.badge}</span>
                    </div>

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
    </section>
  );
}
