"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { PortalHeader } from "@/components/portal-header";
import { useAuth } from "@/hooks/useAuth";
import { useOrdersQuery } from "@/services/order/order.hook";
import { OrderSkeleton } from "@/components/skeleton/order-skeleton";
import { OrderCard } from "@/components/dashboard/order-card";
import { OrderTabs } from "@/components/dashboard/order-tabs";
import { Order, OrderStatus } from "@/types/order.types";
import { PackageCheck } from "lucide-react";
import { ROUTES } from "@/constants/routes";

export default function OrdersPage() {
  const t = useTranslations("orders");
  const router = useRouter();
  const { user, ready } = useAuth();
  const { data: responseBody, isLoading } = useOrdersQuery(ready && !!user);
  const [activeTab, setActiveTab] = useState<OrderStatus>("IN_PROCESS");

  useEffect(() => {
    if (ready && !user) {
      router.replace(ROUTES.LOGIN);
    }
  }, [ready, user, router]);

  const orders: Order[] = responseBody?.data || [];
  const showLoading = !ready || !user || isLoading;

  const inProcessOrders =
    orders?.filter((o) => o?.status === "IN_PROCESS") || [];
  const deliveredOrders =
    orders?.filter((o) => o?.status === "DELIVERED") || [];
  const currentOrders =
    activeTab === "IN_PROCESS" ? inProcessOrders : deliveredOrders;

  return (
    <div className="min-h-screen bg-background">
      <PortalHeader />
      <main className="mx-auto max-w-5xl px-3.5 sm:px-5 pt-4 sm:pt-5 pb-12">
        <div>
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[.14em] text-primary">
            {t("badge")}
          </p>
        </div>

        {showLoading ? (
          <OrderSkeleton />
        ) : (
          <div className="mt-4">
            <OrderTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              inProcessCount={inProcessOrders?.length}
              deliveredCount={deliveredOrders?.length}
            />

            {currentOrders?.length > 0 ? (
              <div className="mt-6 space-y-4">
                {currentOrders?.map((order) => (
                  <OrderCard key={order?._id} order={order} />
                ))}
              </div>
            ) : (
              <section className="mx-auto mt-12 max-w-xl rounded-2xl border border-dashed border-border p-8 text-center">
                <PackageCheck className="mx-auto size-10 text-muted-foreground" />
                <h2 className="font-serif text-2xl font-bold mt-5">
                  {activeTab === "IN_PROCESS"
                    ? t("noInProcessOrders")
                    : t("noDeliveredOrders")}
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {activeTab === "IN_PROCESS"
                    ? t("inProcessEmptyDesc")
                    : t("deliveredEmptyDesc")}
                </p>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
