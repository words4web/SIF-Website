import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Calendar,
  ArrowLeft,
  HelpCircle,
  Phone,
  Mail,
  ChevronRight,
} from "lucide-react";
import { PortalHeader } from "@/components/portal-header";
import { Footer } from "@/components/footer";
import { BLOG_POSTS } from "@/data/blogs";
import { ROUTES } from "@/constants/routes";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Blog Not Found | Shelly Indian Foods" };

  return {
    title: `${post.title} | Shelly Indian Foods`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.featuredImage }],
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PortalHeader />

      <main className="flex-grow">
        <div className="border-b border-stone-200/80 bg-[#fdfbf9]/60">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-4xl py-3 flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-medium text-stone-500 overflow-x-auto no-scrollbar">
            <Link
              href={ROUTES.HOME}
              className="hover:text-primary transition-colors shrink-0">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <Link
              href={ROUTES.BLOGS}
              className="hover:text-primary transition-colors shrink-0">
              Blogs
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span className="text-stone-900 truncate max-w-[150px] sm:max-w-xs shrink-0">
              {post.title}
            </span>
          </div>
        </div>

        <header className="pt-6 pb-6 sm:pt-12 sm:pb-8">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-4xl">
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-stone-900 leading-tight sm:leading-[1.2] tracking-tight">
              {post.title}
            </h1>

            {post.subtitle && (
              <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-stone-600 leading-relaxed font-normal">
                {post.subtitle}
              </p>
            )}

            <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs sm:text-sm">
                  SIF
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-stone-900">
                    {post.author.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[11px] sm:text-xs font-medium text-stone-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-4xl mb-8 sm:mb-12">
          <div className="relative aspect-[16/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-stone-200/90 shadow-xs bg-stone-100">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>
        </div>

        <article className="container mx-auto px-4 sm:px-6 md:px-8 max-w-3xl pb-12 sm:pb-16">
          <div className="space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg text-stone-700 leading-relaxed">
            {post.content.introParagraphs.map((para, idx) => (
              <p
                key={idx}
                className={
                  idx === 0
                    ? "font-medium text-stone-900 text-base sm:text-lg md:text-xl leading-relaxed"
                    : ""
                }>
                {para}
              </p>
            ))}

            <div className="my-6 sm:my-10 p-5 sm:p-8 rounded-2xl bg-[#faf8f5] border border-stone-200/80 shadow-2xs">
              <h2 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-stone-900 leading-snug">
                {post.content.sectionHeading}
              </h2>
              {post.content.sectionIntro && (
                <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-stone-600 leading-relaxed">
                  {post.content.sectionIntro}
                </p>
              )}
            </div>

            {post.insightImage && (
              <div className="my-6 sm:my-10">
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-stone-200 shadow-2xs bg-stone-100">
                  <Image
                    src={post.insightImage}
                    alt="Shelly Indian Foods Wholesale Insight"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                </div>
              </div>
            )}

            <div className="space-y-6 sm:space-y-10 my-6 sm:my-10">
              {post.content.reasons.map((reason) => (
                <section
                  key={reason.number}
                  className="space-y-2.5 sm:space-y-3 pt-5 sm:pt-6 border-t border-stone-100 first:border-t-0">
                  <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-stone-900 flex items-start gap-2.5 sm:gap-3">
                    <span className="flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-primary/10 text-primary font-bold text-xs sm:text-sm">
                      {reason.number}
                    </span>
                    <span className="pt-0.5">{reason.title}</span>
                  </h3>
                  <div className="space-y-2.5 sm:space-y-3 pl-0 sm:pl-11 text-stone-700 text-sm sm:text-base">
                    {reason.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="my-8 sm:my-12 p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-stone-900 text-stone-100 space-y-3.5 sm:space-y-4">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                {post.content.finalThoughts.title}
              </h3>
              {post.content.finalThoughts.paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className="text-stone-300 leading-relaxed text-xs sm:text-sm md:text-base">
                  {p}
                </p>
              ))}

              <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row gap-2.5 sm:gap-4 items-stretch sm:items-center">
                <a
                  href="tel:+390372432787"
                  className="inline-flex justify-center items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-colors">
                  <Phone className="w-3.5 h-3.5" /> Call Cremona Hub
                </a>
                <a
                  href="mailto:shellyindianfoods.sas@gmail.com"
                  className="inline-flex justify-center items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-colors">
                  <Mail className="w-3.5 h-3.5" /> Contact Wholesale Team
                </a>
              </div>
            </div>

            <div className="pt-6 sm:pt-8 border-t border-stone-200">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                  {post.content.faqTitle}
                </h3>
              </div>

              <div className="divide-y divide-stone-200 border border-stone-200/90 rounded-xl sm:rounded-2xl bg-white overflow-hidden shadow-2xs">
                {post.content.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-6 space-y-1.5 sm:space-y-2">
                    <p className="font-bold text-stone-900 text-xs sm:text-sm md:text-base">
                      {faq.question}
                    </p>
                    <p className="text-stone-600 text-[11px] sm:text-xs md:text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 sm:pt-12 text-center">
              <Link
                href={ROUTES.BLOGS}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-stone-300 bg-white text-xs font-bold text-stone-800 hover:bg-stone-50 transition-colors shadow-2xs w-full sm:w-auto">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to All Articles</span>
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
