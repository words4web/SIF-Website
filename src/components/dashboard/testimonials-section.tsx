"use client";

import { useState } from "react";
import {
  Quote,
  ChevronLeft,
  ChevronRight,
  MessageSquareQuote,
  BadgeCheck,
  MapPin,
  ShoppingBag,
} from "lucide-react";
import { TESTIMONIALS_DATA } from "@/data/testimonials";

export function TestimonialsSection() {
  const { badge, title, description, testimonials } = TESTIMONIALS_DATA;
  const [activeIndex, setActiveIndex] = useState(0);

  const activeTestimonial = testimonials[activeIndex] || testimonials[0];
  const total = testimonials.length;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-[#faf8f5] via-white to-[#faf8f5] border-t border-stone-200/80 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-primary/[0.04] rounded-full blur-[100px]" />
        <div className="absolute bottom-10 -right-32 w-96 h-96 bg-[#ffd230]/15 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(#cb242c 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16 border-b border-stone-200/80 pb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
              <MessageSquareQuote className="w-3.5 h-3.5" />
              <span>{badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 leading-tight">
              {title}
            </h2>

            {description && (
              <p className="mt-3 text-sm sm:text-base text-stone-600 font-normal">
                {description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous review"
              className="w-10 h-10 rounded-full border border-stone-200 bg-white text-stone-700 hover:bg-primary hover:text-white hover:border-primary shadow-xs transition-all flex items-center justify-center active:scale-95">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next review"
              className="w-10 h-10 rounded-full border border-stone-200 bg-white text-stone-700 hover:bg-primary hover:text-white hover:border-primary shadow-xs transition-all flex items-center justify-center active:scale-95">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
            {testimonials.map((item, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`group relative cursor-pointer rounded-2xl p-4 sm:p-5 border transition-all duration-300 ${
                    isSelected
                      ? "bg-white border-primary shadow-lg shadow-primary/10 ring-2 ring-primary/20 scale-[1.02]"
                      : "bg-white/80 border-stone-200 hover:bg-white hover:border-primary/40 hover:shadow-md"
                  }`}>
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center font-extrabold text-sm flex-shrink-0 transition-all ${
                        isSelected
                          ? "bg-primary text-white shadow-sm"
                          : "bg-stone-100 text-stone-700 group-hover:bg-primary/10 group-hover:text-primary"
                      }`}>
                      {item.avatarInitials}
                    </div>

                    <div className="flex-grow min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="font-bold text-sm sm:text-base text-stone-900 truncate">
                          {item.author}
                        </h4>
                        <span className="text-[11px] font-semibold text-primary">
                          0{idx + 1}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-0.5">
                        <MapPin className="w-3 h-3 text-stone-400 flex-shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>

                      <p className="text-xs text-stone-600 mt-2 line-clamp-1 font-medium italic">
                        &ldquo;{item.highlight || item.quote}&rdquo;
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-primary rounded-r-full" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-8">
            <div className="relative h-full min-h-[380px] rounded-3xl p-7 sm:p-10 md:p-12 border border-stone-200 bg-white shadow-xl shadow-stone-200/50 flex flex-col justify-between overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-bl from-primary/10 to-transparent rounded-full pointer-events-none" />
              <div className="absolute top-8 right-8 text-stone-100 pointer-events-none">
                <Quote className="w-24 h-24 stroke-[1.5]" />
              </div>

              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-stone-100">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-bold">
                    <BadgeCheck className="w-4 h-4 text-emerald-600" />
                    <span>Verified Feedback</span>
                  </div>

                  {activeTestimonial.verifiedOrder && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium">
                      <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{activeTestimonial.verifiedOrder}</span>
                    </div>
                  )}
                </div>

                <h3 className="text-lg sm:text-2xl font-extrabold text-stone-900 leading-snug mb-4">
                  &ldquo;{activeTestimonial.highlight}&rdquo;
                </h3>

                <p className="text-sm sm:text-base md:text-lg text-stone-600 leading-relaxed font-normal">
                  {activeTestimonial.quote.replace(/^"|"$/g, "")}
                </p>
              </div>

              <div className="relative z-10 mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-[#b01e25] text-white flex items-center justify-center font-black text-base shadow-md shadow-primary/25">
                    {activeTestimonial.avatarInitials}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-extrabold text-base text-stone-900">
                        {activeTestimonial.author}
                      </h4>
                      <BadgeCheck className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-stone-500 font-medium mt-0.5">
                      <span>{activeTestimonial.location}</span>
                      <span>&bull;</span>
                      <span className="text-stone-700 font-semibold">
                        {activeTestimonial.role}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-xs text-stone-400 font-medium">
                    Story {activeIndex + 1} of {total}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
