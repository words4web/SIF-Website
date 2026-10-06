export function CategorySkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="flex items-center gap-3 w-full">
      <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent scrollbar-thumb-rounded-full">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="h-9 w-28 shrink-0 rounded-full bg-muted/70 animate-pulse animate-shimmer relative overflow-hidden"
          />
        ))}
      </div>
    </div>
  );
}

export function CategoryCardSkeleton() {
  return (
    <div className="group relative flex flex-col justify-between rounded-3xl bg-white border border-stone-200/90 shadow-xs overflow-hidden">
      <div className="p-5 sm:p-6 pb-0">
        <div className="w-full h-60 sm:h-64 rounded-2xl bg-muted/60 animate-pulse animate-shimmer relative overflow-hidden border border-stone-100" />
      </div>

      <div className="p-5 sm:p-6 pt-5 flex-grow flex flex-col justify-between space-y-6">
        <div className="space-y-3.5">
          <div className="h-10 w-full rounded-xl bg-muted/50 animate-pulse animate-shimmer relative overflow-hidden" />
          <div className="space-y-2 pt-1">
            <div className="h-3.5 w-full bg-muted/40 rounded-md animate-pulse animate-shimmer relative overflow-hidden" />
            <div className="h-3.5 w-5/6 bg-muted/40 rounded-md animate-pulse animate-shimmer relative overflow-hidden" />
            <div className="h-3.5 w-3/4 bg-muted/40 rounded-md animate-pulse animate-shimmer relative overflow-hidden" />
          </div>
        </div>

        <div className="pt-4 border-t border-stone-100">
          <div className="h-11 w-full rounded-xl bg-muted/70 animate-pulse animate-shimmer relative overflow-hidden" />
        </div>
      </div>
    </div>
  );
}

export function CategoriesSectionSkeleton({ count = 3 }: { count?: number }) {
  return (
    <section className="relative py-16 sm:py-24 bg-gradient-to-b from-[#fbf9f6] via-white to-[#fbf9f6] border-y border-stone-200/90 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 md:mb-16">
          <div className="space-y-3.5">
            <div className="h-6 w-44 rounded-full bg-muted/70 animate-pulse animate-shimmer relative overflow-hidden" />
            <div className="h-10 sm:h-12 w-72 sm:w-96 rounded-2xl bg-muted/60 animate-pulse animate-shimmer relative overflow-hidden" />
            <div className="h-4 w-60 sm:w-80 rounded-md bg-muted/40 animate-pulse animate-shimmer relative overflow-hidden" />
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="h-10 w-44 rounded-2xl bg-muted/50 animate-pulse animate-shimmer relative overflow-hidden hidden sm:block" />
            <div className="h-10 w-36 rounded-2xl bg-muted/70 animate-pulse animate-shimmer relative overflow-hidden" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {Array.from({ length: count }).map((_, i) => (
            <CategoryCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function CatalogueCategoryBannerSkeleton() {
  return (
    <div className="mt-5 sm:mt-6 relative rounded-3xl border border-stone-200/90 bg-white p-6 sm:p-8 shadow-sm overflow-hidden">
      <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6 lg:gap-8">
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-2xl bg-muted/60 animate-pulse animate-shimmer relative overflow-hidden border border-stone-100 shrink-0" />

        <div className="flex-grow min-w-0 space-y-3 w-full">
          <div className="space-y-2">
            <div className="h-8 sm:h-10 w-56 sm:w-72 rounded-xl bg-muted/70 animate-pulse animate-shimmer relative overflow-hidden" />
            <div className="h-4 w-64 sm:w-96 rounded-md bg-muted/50 animate-pulse animate-shimmer relative overflow-hidden" />
          </div>

          <div className="space-y-2 pt-1 max-w-2xl">
            <div className="h-3.5 w-full bg-muted/40 rounded-md animate-pulse animate-shimmer relative overflow-hidden" />
            <div className="h-3.5 w-4/5 bg-muted/40 rounded-md animate-pulse animate-shimmer relative overflow-hidden" />
          </div>
        </div>
      </div>
    </div>
  );
}
