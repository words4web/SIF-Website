"use client";

import { useTranslations } from "next-intl";
import { BookOpen } from "lucide-react";
import { PortalHeader } from "@/components/portal-header";
import { Footer } from "@/components/footer";
import { BlogCard } from "@/components/blog-card";
import { BLOG_POSTS } from "@/data/blogs";

export default function BlogsPage() {
  const t = useTranslations("blogsPage");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PortalHeader />

      <main className="flex-grow">
        <section className="relative py-7 sm:py-12 bg-gradient-to-b from-[#faf8f5] via-white to-[#faf8f5] border-b border-stone-200/80 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[320px] sm:w-[500px] h-[180px] sm:h-[250px] bg-primary/[0.03] rounded-full blur-[80px] sm:blur-[100px]" />
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `radial-gradient(#cb242c 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
              }}
            />
          </div>

          <div className="container relative mx-auto px-4 sm:px-6 max-w-4xl text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider mb-2.5 sm:mb-3 shadow-2xs">
              <BookOpen className="w-3 h-3" />
              <span>{t("badge")}</span>
            </div>

            <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-stone-900 leading-tight max-w-2xl mx-auto">
              {t("title")}
            </h1>

            <p className="mt-2 sm:mt-2.5 text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
              {t("subtitle")}
            </p>
          </div>
        </section>

        <section className="py-6 sm:py-10 md:py-12">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {BLOG_POSTS.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
