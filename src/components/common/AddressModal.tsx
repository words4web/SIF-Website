"use client";

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { AddressPayload } from "@/types/address.types";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddressPayload) => void;
  defaultValues?: Partial<AddressPayload>;
  isLoading?: boolean;
  title?: string;
}

const emptyAddress: AddressPayload = {
  fullName: "",
  phone: "",
  streetAddress: "",
  building: "",
  city: "",
  postalCode: "",
};

export function AddressModal({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
  isLoading,
  title,
}: AddressModalProps) {
  const t = useTranslations("profile.addressModal");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressPayload>({ defaultValues: defaultValues ?? emptyAddress });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      reset(defaultValues ?? emptyAddress);
    }
  }, [isOpen, defaultValues, reset]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    const handleClickOutside = (e: MouseEvent) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!isInDialog) {
        onClose();
      }
    };
    dialog.addEventListener("cancel", handleCancel);
    dialog.addEventListener("click", handleClickOutside);
    return () => {
      dialog.removeEventListener("cancel", handleCancel);
      dialog.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40";
  const labelClass = "block text-xs font-semibold text-muted-foreground mb-1";
  const errorClass = "mt-1 text-xs text-destructive";

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 m-auto w-full max-w-lg h-fit rounded-2xl border border-border bg-card p-6 shadow-xl backdrop:bg-black/60 backdrop:backdrop-blur-sm text-card-foreground focus:outline-none">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-serif text-xl font-bold tracking-tight">
            {title || t("save")}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-lg text-muted-foreground"
            onClick={onClose}
            aria-label="Close">
            <X className="size-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{t("fullNameLabel")}</label>
              <input
                {...register("fullName", { required: t("fullNameRequired") })}
                className={inputClass}
                placeholder={t("fullNamePlaceholder")}
              />
              {errors.fullName && (
                <p className={errorClass}>{errors.fullName.message}</p>
              )}
            </div>
            <div>
              <label className={labelClass}>{t("phoneLabel")}</label>
              <input
                {...register("phone", {
                  required: t("phoneRequired"),
                  pattern: {
                    value: /^(\+39|0039)?\s?([03]\d{7,10})$/,
                    message: t("phoneInvalid"),
                  },
                })}
                className={inputClass}
                placeholder={t("phonePlaceholder")}
              />
              {errors.phone && (
                <p className={errorClass}>{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className={labelClass}>{t("streetAddressLabel")}</label>
            <input
              {...register("streetAddress", {
                required: t("streetAddressRequired"),
              })}
              className={inputClass}
              placeholder={t("streetAddressPlaceholder")}
            />
            {errors.streetAddress && (
              <p className={errorClass}>{errors.streetAddress.message}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>{t("buildingLabel")}</label>
            <input
              {...register("building")}
              className={inputClass}
              placeholder={t("buildingPlaceholder")}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{t("cityLabel")}</label>
              <input
                {...register("city", { required: t("cityRequired") })}
                className={inputClass}
                placeholder={t("cityPlaceholder")}
              />
              {errors.city && (
                <p className={errorClass}>{errors.city.message}</p>
              )}
            </div>
            <div>
              <label className={labelClass}>{t("postalCodeLabel")}</label>
              <input
                {...register("postalCode", {
                  required: t("postalCodeRequired"),
                })}
                className={inputClass}
                placeholder={t("postalCodePlaceholder")}
              />
              {errors.postalCode && (
                <p className={errorClass}>{errors.postalCode.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}>
              {t("cancel")}
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? t("saving") : t("save")}
            </Button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
