import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/common/Input";
import { signupSchema, SignupInput } from "@/schemas/auth";

export function SignupDetailsForm({
  onSubmit,
  isPending,
}: {
  onSubmit: (data: SignupInput) => void;
  isPending: boolean;
}) {
  const t = useTranslations("signup");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
          {t("newCustomer")}
        </span>
        <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          {t("createAccountTitle")}
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">{t("subtitle")}</p>
      </div>
      <div className="mt-6 space-y-4">
        <Input
          label={t("fullNameLabel")}
          placeholder={t("fullNamePlaceholder")}
          error={errors.fullName?.message}
          {...register("fullName")}
        />

        <Input
          label={t("businessNameLabel")}
          placeholder={t("businessNamePlaceholder")}
          error={errors.businessName?.message}
          {...register("businessName")}
        />

        <Input
          label={t("emailLabel")}
          type="email"
          placeholder={t("emailPlaceholder")}
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label={t("mobileNumberLabel")}
          placeholder={t("mobileNumberPlaceholder")}
          error={errors.mobileNumber?.message}
          {...register("mobileNumber")}
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-foreground">
            {t("passwordLabel")}
          </label>
          <div className="relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder={t("passwordPlaceholder")}
              className="h-11 w-full rounded-xl border border-input bg-background pl-3 pr-10 text-sm font-normal outline-none transition-all placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={
                showPassword ? t("hidePasswordAria") : t("showPasswordAria")
              }
              className="absolute right-3 top-[50%] -translate-y-[50%] text-muted-foreground hover:text-foreground cursor-pointer focus:outline-none">
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password?.message && (
            <p
              className="text-xs font-semibold text-destructive mt-0.5"
              role="alert">
              {errors.password?.message}
            </p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="mt-7 w-full cursor-pointer"
        size="lg"
        disabled={isPending}>
        {isPending ? t("submittingButton") : t("signUpButton")} <ArrowRight />
      </Button>
    </form>
  );
}

export default SignupDetailsForm;
