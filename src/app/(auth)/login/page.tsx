"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useAuthFlow } from "@/hooks/useAuthFlow";
import { LoginDetailsForm } from "@/components/auth/LoginDetailsForm";

export default function LoginPage() {
  const { handleSubmit, loading } = useAuthFlow({
    isLogin: true,
  });

  return (
    <div className="w-full max-w-md relative">
      <div className="rounded-2xl sm:rounded-3xl border border-border/80 bg-card/95 p-5 sm:p-8 lg:p-9 shadow-xl shadow-stone-900/5 backdrop-blur-md">
        <div className="flex items-center justify-between pb-5 sm:pb-6 border-b border-border/60">
          <Link href="/" className="inline-block">
            <Image
              src="/logo.png"
              alt="Shelly Indian Foods Logo"
              width={100}
              height={100}
              className="h-10 sm:h-12 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        <div className="mt-5 sm:mt-6">
          <LoginDetailsForm onSubmit={handleSubmit} isPending={loading} />
        </div>

        <div className="mt-8 pt-6 border-t border-border/60 flex flex-col items-center gap-3">
          <Link
            href="/signup"
            className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
            Don&apos;t have an account?{" "}
            <span className="text-primary font-bold underline decoration-primary/40 underline-offset-4">
              Sign up
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground/80 hover:text-foreground transition-colors">
            <ArrowLeft className="size-3.5" /> Back to store
          </Link>
        </div>
      </div>
    </div>
  );
}
