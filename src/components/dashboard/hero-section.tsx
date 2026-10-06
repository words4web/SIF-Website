"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1600",
    title: "Exclusive Tata Distributor in Italy",
    description:
      "Authentic Tata Tea, Tata Sampann Legumes, and Tata Salt direct from the authorized importer.",
    ctaText: "Browse Tata Range",
    ctaLink: "/catalogue",
  },
  {
    image:
      "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=1600",
    title: "25+ Years of Distribution Heritage",
    description:
      "Supplying 500+ supermarkets and wholesalers across Italy with 100+ annual temperature-controlled containers.",
    ctaText: "Explore Catalogue",
    ctaLink: "/catalogue",
  },
  {
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600",
    title: "BRCGS Grade A & ISO 22000 Certified",
    description:
      "100% batch-tested authentic Indian staples with EU compliant labelling and dedicated trade support.",
    ctaText: "Start B2B Ordering",
    ctaLink: "/login",
  },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides?.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides?.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative w-full overflow-hidden bg-muted aspect-[16/9] md:aspect-[21/9] min-h-[360px] md:min-h-[450px]">
      {slides?.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{
            backgroundImage: `url(${slide?.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
          <div className="absolute inset-0 bg-black/55 flex flex-col justify-center px-8 md:px-20 lg:px-32">
            <div className="max-w-2xl text-white">
              <h1 className="font-serif text-4xl font-extrabold tracking-tight md:text-6xl text-white">
                {slide?.title}
              </h1>
              <p className="mt-4 text-base md:text-xl text-gray-200">
                {slide?.description}
              </p>
              <div className="mt-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/95 text-white">
                  <Link href={slide?.ctaLink}>{slide?.ctaText}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition hover:bg-white/35"
        aria-label="Previous slide">
        <ChevronLeft className="size-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition hover:bg-white/35"
        aria-label="Next slide">
        <ChevronRight className="size-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides?.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`size-2.5 rounded-full transition-all ${
              index === current ? "bg-white w-6" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
