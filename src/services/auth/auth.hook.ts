import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { authService } from "./auth.service";
import { useAuth } from "@/hooks/useAuth";
import { LoginInput, SignupInput } from "@/schemas/auth";

export const useLogin = (options?: {
  onSuccess?: (data: any, variables: LoginInput) => void;
}) => {
  const { signIn } = useAuth();
  const t = useTranslations("toasts");

  return useMutation({
    mutationFn: (payload: LoginInput) => authService.login(payload),
    onSuccess: (res, variables) => {
      toast.success(res?.message || t("loginSuccess"));
      const accessToken = res?.data?.accessToken;
      const user = res?.data?.user;
      if (accessToken && user) {
        signIn(
          {
            id: user?.id,
            name: user?.fullName,
            email: user?.email,
            business: user?.businessName || "",
            addresses: user?.addresses || [],
          },
          accessToken,
        );
      }
      options?.onSuccess?.(res, variables);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || t("loginFailed"));
    },
  });
};

export const useSignup = (options?: {
  onSuccess?: (data: any, variables: SignupInput) => void;
}) => {
  const t = useTranslations("toasts");

  return useMutation({
    mutationFn: (payload: SignupInput) => authService.signup(payload),
    onSuccess: (res, variables) => {
      toast.success(res?.message || t("signupSuccess"), { duration: 6000 });
      options?.onSuccess?.(res, variables);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || t("signupFailed"));
    },
  });
};
