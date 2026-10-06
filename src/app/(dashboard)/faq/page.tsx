"use client";

import { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  Plus,
  Minus,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Search,
  MessageCircle,
} from "lucide-react";
import { PortalHeader } from "@/components/portal-header";
import { Footer } from "@/components/footer";
import { FAQ_DATA } from "@/data/faq";

export default function FAQPage() {
  const { badge, title, subtitle, faqs } = FAQ_DATA;
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "faq-1": true,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    "all",
    ...Array.from(new Set(faqs.map((f) => f.category).filter(Boolean))),
  ];

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PortalHeader />

      <main className="flex-grow">
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-[#faf8f5] via-white to-[#faf8f5] border-b border-stone-200/80 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-primary/[0.04] rounded-full blur-[120px]" />
            <div className="absolute -bottom-32 right-10 w-96 h-96 bg-[#ffd230]/15 rounded-full blur-[100px]" />
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `radial-gradient(#cb242c 1px, transparent 1px)`,
                backgroundSize: "28px 28px",
              }}
            />
          </div>

          <div className="container relative mx-auto px-4 sm:px-6 max-w-5xl text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 leading-tight">
              {title}
            </h1>

            <p className="mt-4 text-sm sm:text-base md:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed font-normal">
              {subtitle}
            </p>

            <div className="mt-8 max-w-xl mx-auto relative">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-stone-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions (e.g. Tata Tea, Cremona store, delivery)..."
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-stone-200/90 shadow-md shadow-stone-200/40 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                />
              </div>
            </div>

            {categories.length > 2 && (
              <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat as string)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize border transition-all ${
                      selectedCategory === cat
                        ? "bg-primary text-white border-primary shadow-xs"
                        : "bg-white text-stone-600 border-stone-200 hover:border-stone-300"
                    }`}>
                    {cat === "all" ? "All Questions" : cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12 p-8 rounded-3xl bg-stone-50 border border-stone-200">
                <HelpCircle className="w-10 h-10 text-stone-400 mx-auto mb-3" />
                <h3 className="font-bold text-stone-800 text-lg">
                  No matching questions found
                </h3>
                <p className="text-stone-500 text-sm mt-1">
                  Try searching with different keywords or clear the search
                  filter.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="mt-4 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold">
                  Reset Filter
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFaqs.map((faq, idx) => {
                  const isOpen = !!openItems[faq.id];
                  return (
                    <div
                      key={faq.id}
                      className={`rounded-2xl md:rounded-3xl border transition-all duration-300 overflow-hidden ${
                        isOpen
                          ? "bg-white border-primary/40 shadow-md shadow-primary/5 ring-1 ring-primary/10"
                          : "bg-white/90 border-stone-200 hover:border-stone-300 hover:bg-white"
                      }`}>
                      <button
                        type="button"
                        onClick={() => toggleItem(faq.id)}
                        className="w-full text-left p-5 sm:p-6 md:p-7 flex items-start justify-between gap-4 select-none"
                        aria-expanded={isOpen}>
                        <div className="flex items-start gap-3.5">
                          <span
                            className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 transition-colors ${
                              isOpen
                                ? "bg-primary text-white"
                                : "bg-stone-100 text-stone-500"
                            }`}>
                            0{idx + 1}
                          </span>
                          <div>
                            {faq.category && (
                              <span className="text-[11px] font-bold uppercase tracking-wider text-primary mb-1 block">
                                {faq.category}
                              </span>
                            )}
                            <h3 className="font-extrabold text-stone-900 text-base sm:text-lg leading-snug">
                              {faq.question}
                            </h3>
                          </div>
                        </div>

                        <div
                          className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 transition-all ${
                            isOpen
                              ? "border-primary bg-primary text-white rotate-180"
                              : "border-stone-200 text-stone-500 bg-stone-50"
                          }`}>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-6 sm:px-7 sm:pb-7 pt-0 border-t border-stone-100 animate-in fade-in slide-in-from-top-2 duration-200">
                          <p className="text-sm sm:text-base text-stone-600 leading-relaxed pt-4 font-normal">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            <div className="mt-16 relative rounded-3xl p-8 sm:p-10 md:p-12 bg-white border border-stone-200/90 shadow-xl shadow-stone-200/60 overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary/[0.04] rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#ffd230]/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Direct Trade Support</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight">
                    Have more questions about orders or wholesale supply?
                  </h3>

                  <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
                    Our central distribution team in Cremona is ready to assist
                    your store or supermarket with custom tiered quotes, catalog
                    availability, and scheduled logistics.
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium text-stone-600">
                    <div className="flex items-center gap-2 bg-stone-50 px-3 py-1.5 rounded-full border border-stone-200/70">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      <span>Cremona (Lombardy) Hub</span>
                    </div>
                    <div className="flex items-center gap-2 bg-stone-50 px-3 py-1.5 rounded-full border border-stone-200/70">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Mon – Sat: 08:30 – 19:30</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3.5 w-full">
                  <Link
                    href="tel:+390372432787"
                    className="group flex items-center justify-between p-4 rounded-2xl bg-primary hover:bg-[#b01e25] text-white shadow-md shadow-primary/20 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <span className="block text-[11px] font-medium text-white/80 uppercase tracking-wider">
                          Call Cremona Store
                        </span>
                        <span className="block text-sm sm:text-base font-bold">
                          +39 0372 432787
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="mailto:shellyindianfoods.sas@gmail.com"
                    className="group flex items-center justify-between p-4 rounded-2xl bg-stone-50 hover:bg-stone-100/80 border border-stone-200 text-stone-800 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="text-left min-w-0">
                        <span className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                          Email Inquiries
                        </span>
                        <span className="block text-xs sm:text-sm font-bold text-stone-900 truncate">
                          shellyindianfoods.sas@gmail.com
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 group-hover:text-primary transition-all" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
