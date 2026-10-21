"use client";

import { useEffect, useCallback, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { CategoryItem } from "@/types/category/category.types";

export function useCatalogueFilters(categories: CategoryItem[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryFromUrl = searchParams.get("category");
  const queryFromUrl = searchParams.get("search") || "";

  const [localQuery, setLocalQuery] = useState(queryFromUrl);
  const debouncedQuery = useDebounce(localQuery, 400);

  useEffect(() => {
    setLocalQuery(queryFromUrl);
  }, [queryFromUrl]);

  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    const trimmed = debouncedQuery.trim();

    if (trimmed !== currentSearch) {
      const params = new URLSearchParams(searchParams.toString());
      if (trimmed) {
        params.set("search", trimmed);
        params.delete("category");
      } else {
        params.delete("search");
        if (!params.get("category") && categories?.length > 0) {
          params.set("category", categories[0]?.slug || categories[0]?.id);
        }
      }
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [debouncedQuery, pathname, router, searchParams, categories]);

  const isSearching = Boolean(localQuery.trim());

  const activeCategory = isSearching
    ? null
    : categories?.find(
        (cat) => cat?.slug === categoryFromUrl || cat?.id === categoryFromUrl,
      ) || (categories?.length > 0 ? categories[0] : null);

  const selectedCategoryIdentifier = isSearching
    ? ""
    : categoryFromUrl ||
      (activeCategory ? activeCategory?.slug || activeCategory?.id : "");

  useEffect(() => {
    if (!isSearching && !categoryFromUrl && activeCategory) {
      const defaultSlug = activeCategory.slug || activeCategory.id;
      const params = new URLSearchParams(searchParams.toString());
      params.set("category", defaultSlug);
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [
    isSearching,
    categoryFromUrl,
    activeCategory,
    pathname,
    router,
    searchParams,
  ]);

  const selectCategory = useCallback(
    (categorySlugOrId: string) => {
      setLocalQuery("");
      const params = new URLSearchParams();
      params.set("category", categorySlugOrId);
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router],
  );

  const setQuery = useCallback((newQuery: string) => {
    setLocalQuery(newQuery);
  }, []);

  const resetFilters = useCallback(() => {
    const params = new URLSearchParams();
    if (categories?.length > 0) {
      params.set("category", categories[0]?.slug || categories[0]?.id);
    }
    router.push(`${pathname}?${params.toString()}`);
  }, [categories, pathname, router]);

  return {
    query: localQuery,
    debouncedQuery,
    selectedCategoryIdentifier,
    activeCategory,
    selectCategory,
    setQuery,
    resetFilters,
  };
}
