import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Calendar, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/types/blog.types";

export function BlogCard({ post }: { post: BlogPost }) {
  const t = useTranslations("blogsPage");
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link
      href={`/blogs/${post?.slug}`}
      className="group rounded-xl border border-stone-200 bg-white overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/40">
      <div>
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-100">
          <Image
            src={post?.featuredImage}
            alt={post?.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        <div className="p-4 space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-stone-500">
            <Calendar className="w-3 h-3 text-primary" />
            <span>{formattedDate}</span>
          </div>

          <h3 className="font-serif text-base font-bold text-stone-900 group-hover:text-primary transition-colors leading-snug line-clamp-2">
            {post?.title}
          </h3>

          <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
            {post?.excerpt}
          </p>
        </div>
      </div>

      <div className="p-4 pt-0">
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px]">
              SIF
            </div>
            <p className="text-xs font-medium text-stone-800">
              {post?.author?.name}
            </p>
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:translate-x-0.5 transition-transform">
            <span>{t("readArticle")}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
