"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Eye,
  Target,
  Building2,
  MapPin,
  ArrowRight,
  Phone,
  Mail,
  Award,
  Truck,
  Users,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { PortalHeader } from "@/components/portal-header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ABOUT_US_DATA } from "@/data/about";

export default function AboutPage() {
  const {
    badge,
    title,
    heroImage,
    storyHeading,
    storyParagraphs,
    vision,
    mission,
  } = ABOUT_US_DATA;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PortalHeader />

      <main className="flex-grow">
        <section className="relative py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-[#faf8f5] via-white to-[#faf8f5] border-b border-stone-200/80 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/[0.04] rounded-full blur-[120px]" />
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `radial-gradient(#cb242c 1px, transparent 1px)`,
                backgroundSize: "28px 28px",
              }}
            />
          </div>

          <div className="container relative mx-auto px-5 sm:px-8 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{badge}</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 leading-[1.15]">
                  {title}
                </h1>

                <p className="mt-3 text-lg sm:text-xl font-bold text-primary">
                  {storyHeading}
                </p>

                <div className="mt-6 space-y-4 text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
                  {storyParagraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-xl font-bold bg-primary hover:bg-[#b01e25] text-white shadow-md shadow-primary/25">
                    <Link href="/catalog" className="flex items-center gap-2">
                      <span>Explore Catalog</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="rounded-xl font-bold border-stone-300 text-stone-700 hover:bg-stone-50">
                    <Link href="/faq">Frequently Asked Questions</Link>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative rounded-3xl p-3 bg-white border border-stone-200/90 shadow-2xl overflow-hidden group">
                  <div className="relative w-full rounded-2xl overflow-hidden shadow-inner aspect-[4/3]">
                    <Image
                      src={heroImage}
                      alt="Shelly Indian Foods - Family Owned Business"
                      fill
                      priority
                      className="object-cover object-[right_center] transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 500px"
                    />
                  </div>

                  <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                        Heritage
                      </span>
                      <h4 className="font-extrabold text-stone-900 text-base">
                        Avtar &amp; Shelly Grover Family
                      </h4>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Founded in Cremona, Lombardy since 1998
                      </p>
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 pt-10 border-t border-stone-200/80">
              <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs hover:border-primary/40 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-stone-900">
                  25+ Years
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  Continuous family operations from Cremona across all Italian
                  regions.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs hover:border-amber-400/50 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center mb-4">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-stone-900">
                  100+ Containers
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  Direct temperature-controlled sea freight import per year.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs hover:border-blue-500/40 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-700 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-stone-900">
                  500+ Partners
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  Wholesalers, ethnic stores, and supermarkets nationwide.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs hover:border-emerald-500/40 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-stone-900">
                  BRCGS Grade A
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  Strict ISO 22000 &amp; HACCP food compliance and batch
                  traceability.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-5 sm:px-8 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-14 md:mb-18">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
                <Target className="w-3.5 h-3.5" />
                <span>Purpose &amp; Direction</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 leading-tight">
                Our Vision &amp; Mission
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              <div className="group relative p-8 sm:p-10 rounded-3xl bg-[#faf8f5] border border-stone-200/90 shadow-sm hover:shadow-xl hover:border-primary/40 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-primary/10 via-primary/5 to-transparent rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform duration-500" />
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center mb-6 shadow-xs group-hover:scale-110 transition-transform">
                    <Eye className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 group-hover:text-primary transition-colors">
                    {vision.title}
                  </h3>
                  <p className="mt-4 text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
                    {vision.description}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-stone-200/60 flex items-center gap-2 text-xs font-bold text-primary">
                  <span>Long-Term Expansion</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="group relative p-8 sm:p-10 rounded-3xl bg-[#faf8f5] border border-stone-200/90 shadow-sm hover:shadow-xl hover:border-primary/40 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-[#ffd230]/20 via-[#ffd230]/5 to-transparent rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform duration-500" />
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center mb-6 shadow-xs group-hover:scale-110 transition-transform">
                    <Target className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 group-hover:text-primary transition-colors">
                    {mission.title}
                  </h3>
                  <p className="mt-4 text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
                    {mission.description}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-stone-200/60 flex items-center gap-2 text-xs font-bold text-primary">
                  <span>Reliable Wholesale Partnerships</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            <div className="mt-16 p-8 sm:p-10 md:p-12 rounded-3xl bg-gradient-to-br from-[#faf8f5] via-white to-[#faf8f5] border border-stone-200/90 shadow-lg flex flex-col lg:flex-row items-center justify-between gap-8">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>Cremona Showroom &amp; Headquarters</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                  Visit our flagship location in Cremona
                </h3>
                <p className="text-stone-600 text-sm mt-1 max-w-xl">
                  Via Giuseppina, 149, 26100 Cremona CR, Italy &bull; Serving
                  partners Monday to Saturday.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <Link
                  href="tel:+390372432787"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-[#b01e25] text-white font-bold text-sm shadow-md transition-all">
                  <Phone className="w-4 h-4" />
                  <span>+39 0372 432787</span>
                </Link>
                <Link
                  href="mailto:shellyindianfoods.sas@gmail.com"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-stone-200 hover:bg-stone-50 text-stone-800 font-bold text-sm transition-all">
                  <Mail className="w-4 h-4" />
                  <span>Email Team</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
