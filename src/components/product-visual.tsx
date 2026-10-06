import { ProductImage } from "@/components/common/ProductImage";
import type { Product } from "@/types/product/product.types";
import {
  Box,
  CupSoda,
  Droplets,
  Flame,
  Package,
  Snowflake,
  Sprout,
  Waves,
} from "lucide-react";

const icons = [
  Sprout,
  Droplets,
  Flame,
  Package,
  Snowflake,
  CupSoda,
  Waves,
  Box,
];

const tones = [
  "from-red-100 to-amber-50 text-[#cb242c]",
  "from-amber-100 to-yellow-50 text-[#523713]",
  "from-blue-100 to-indigo-50 text-[#4054b2]",
  "from-orange-100 to-amber-50 text-orange-700",
  "from-slate-100 to-gray-50 text-[#54595f]",
  "from-rose-100 to-red-50 text-[#cb242c]",
  "from-yellow-100 to-amber-50 text-amber-800",
  "from-indigo-100 to-blue-50 text-[#4054b2]",
];

function toneIndex(value: string) {
  return (
    [...value].reduce((sum, character) => sum + character.charCodeAt(0), 0) %
    tones.length
  );
}

export function ProductVisual({
  product,
  large = false,
  imageIndex = 0,
}: {
  product: Product;
  large?: boolean;
  imageIndex?: number;
}) {
  const images =
    Array.isArray(product?.images) && product?.images?.length > 0
      ? product?.images
      : product?.imageUrl
        ? [product?.imageUrl]
        : [];

  const displayImage = images[imageIndex] || images[0];

  return (
    <ProductImage
      src={displayImage}
      alt={product?.name || "Product image"}
      size={large ? "xl" : "full"}
      priority={large}
      containerClassName={
        large ? "rounded-none border-0" : "rounded-none border-0 aspect-square"
      }
      className="group-hover:scale-105"
    />
  );
}

export function CategoryVisual({
  category,
  index = 0,
}: {
  category: { id: string; name: string };
  index?: number;
}) {
  const tone = (toneIndex(category?.id || "") + index) % tones?.length;
  const Icon = icons[tone] || Package;
  return (
    <div
      className={`flex size-10 sm:size-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br ${tones[tone]} transition-transform group-hover:scale-105`}
      aria-hidden="true">
      <Icon className="size-5 sm:size-6" strokeWidth={1.5} />
    </div>
  );
}
