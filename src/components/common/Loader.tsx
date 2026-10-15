"use client";

import { useTranslations } from "next-intl";
import { LoaderProps } from "@/types/common.types";

export function Loader({ className = "", size = "md" }: LoaderProps) {
  const t = useTranslations("common");

  const sizeClasses = {
    sm: "size-5 border-2",
    md: "size-8 border-3",
    lg: "size-12 border-4",
  };

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      role="status">
      <div
        className={`animate-spin rounded-full border-primary border-t-transparent ${sizeClasses[size]}`}
      />
      <span className="sr-only">{t("loading")}</span>
    </div>
  );
}
export default Loader;
