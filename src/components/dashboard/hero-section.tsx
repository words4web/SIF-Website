"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

const SLIDE_IMAGES = [
  "/banners/tata-tea.webp",
  "/banners/tata-salt.webp",
  "/banners/tata-sampann.webp",
];

export function HeroSection() {
  const t = useTranslations("hero");
  const [current, setCurrent] = useState(0);

  const slides = useMemo(
    () => [
      {
        image: SLIDE_IMAGES[0],
        ctaText: t("slide1.ctaText"),
        ctaLink: ROUTES.CATALOGUE,
      },
      {
        image: SLIDE_IMAGES[1],
        ctaText: t("slide2.ctaText"),
        ctaLink: ROUTES.CATALOGUE,
      },
      {
        image: SLIDE_IMAGES[2],
        ctaText: t("slide3.ctaText"),
        ctaLink: ROUTES.CATALOGUE,
      },
    ],
    [t],
  );

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative w-full overflow-hidden bg-muted aspect-[3/1]">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
          <div className="absolute inset-0 flex items-end justify-start p-2.5 sm:p-6 md:p-10 lg:p-14">
            <Button
              asChild
              className="h-6 sm:h-9 md:h-11 rounded-md sm:rounded-xl px-2 sm:px-4 md:px-6 text-[10px] sm:text-xs md:text-sm font-bold shadow-sm sm:shadow-md hover:shadow-xl transition-all">
              <Link href={slide.ctaLink}>{slide.ctaText}</Link>
            </Button>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-1.5 sm:left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/30 hover:bg-black/50 p-1 sm:p-2 text-white backdrop-blur-sm transition cursor-pointer"
        aria-label={t("prevSlide")}>
        <ChevronLeft className="size-3.5 sm:size-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-1.5 sm:right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/30 hover:bg-black/50 p-1 sm:p-2 text-white backdrop-blur-sm transition cursor-pointer"
        aria-label={t("nextSlide")}>
        <ChevronRight className="size-3.5 sm:size-6" />
      </button>

      <div className="absolute bottom-1 sm:bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1 sm:gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`size-1.5 sm:size-2.5 rounded-full transition-all cursor-pointer ${
              index === current ? "bg-white w-3 sm:w-6" : "bg-white/50"
            }`}
            aria-label={t("goToSlide", { number: index + 1 })}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroSection;
