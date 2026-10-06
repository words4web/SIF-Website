export interface CategoryRow {
  _id: string;
  name: string;
  slug: string;
  image?: string | null;
  tagline?: string | null;
  description?: string | null;
  isActive?: boolean;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug?: string;
  image?: string | null;
  tagline?: string | null;
  description?: string | null;
}

export interface CategoriesSectionProps {
  categories: CategoryItem[];
}

export interface CatalogueFiltersProps {
  query: string;
  setQuery: (query: string) => void;
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  categories: CategoryItem[];
}
