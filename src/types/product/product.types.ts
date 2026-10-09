export interface RelatedProductItem {
  _id: string;
  name: string;
  slug?: string;
  description?: string;
  pack?: string;
  price?: number;
}

export type StockStatus = "IN_STOCK" | "OUT_OF_STOCK";

export interface ProductRow {
  _id: string;
  name: string;
  slug: string;
  sku?: string;
  description?: string;
  pack: string;
  price: number;
  unit?: string;
  stock?: number;
  stockStatus?: StockStatus;
  categoryId:
    | {
        _id: string;
        name: string;
      }
    | string;
  keywords?: string[];
  images?: string[];
  relatedProducts?: RelatedProductItem[] | string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku?: string;
  description?: string;
  pack: string | null;
  price: number | null;
  unit?: string;
  stock?: number;
  stockStatus?: StockStatus;
  categoryId: string;
  categoryName: string;
  keywords?: string[];
  images?: string[];
  relatedProducts?: RelatedProductItem[] | string[];
  imageUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  products: Product[];
}

export interface CategorySummary {
  id: string;
  name: string;
  productCount: number;
}
