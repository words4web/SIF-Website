"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { PortalHeader } from "@/components/portal-header";
import { Footer } from "@/components/footer";
import { useAuth } from "@/hooks/useAuth";
import {
  useNotificationsQuery,
  useMarkReadMutation,
} from "@/services/notification/notification.hook";
import { useDispatch } from "react-redux";
import { decrementUnreadCount } from "@/lib/store/notificationSlice";
import { Button } from "@/components/ui/button";
import {
  Bell,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Inbox,
  Eye,
  ShoppingBag,
} from "lucide-react";
import { NotificationSkeleton } from "@/components/skeleton/notification-skeleton";
import { NotificationItem } from "@/types/notification.types";
import { ROUTES } from "@/constants/routes";

const LIMIT = 20;

export default function NotificationsPage() {
  const t = useTranslations("notificationsPage");
  const locale = useLocale();
  const dispatch = useDispatch();
  const { user, ready } = useAuth();
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching } = useNotificationsQuery(
    page,
    LIMIT,
    ready && !!user,
  );
  const markReadMutation = useMarkReadMutation();

  const notifications: NotificationItem[] =
    data?.data?.notifications || data?.data?.docs || data?.data || [];
  const meta = data?.meta || {};
  const pagination = {
    page: meta?.page || page,
    totalPages: meta?.totalPages || 1,
    totalNotifications: meta?.total || notifications.length,
    hasNextPage: meta?.page < meta?.totalPages,
    hasPrevPage: meta?.page > 1,
  };

  const handleMarkAsRead = (item: NotificationItem) => {
    if (item.isRead) return;
    markReadMutation.mutate(item._id, {
      onSuccess: () => {
        dispatch(decrementUnreadCount());
      },
    });
  };

  const showLoading = !ready || !user || isLoading;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PortalHeader />
      <main className="flex-grow mx-auto w-full max-w-5xl px-5 pt-8 pb-16 lg:px-8">
        <div className="border-b border-border/70 pb-6">
          <p className="text-sm font-bold uppercase tracking-[.14em] text-primary">
            {t("badge")}
          </p>
          <div className="mt-2 flex items-center justify-between gap-4">
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              {t("title")}
            </h1>
            <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary shrink-0">
              <Bell className="size-6" />
            </div>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>

        {showLoading ? (
          <div className="mt-8">
            <NotificationSkeleton />
          </div>
        ) : notifications.length === 0 ? (
          <div className="mx-auto mt-14 max-w-lg rounded-2xl border border-dashed border-border p-10 text-center bg-card shadow-xs">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Inbox className="size-7" />
            </div>
            <h2 className="mt-4 font-serif text-xl font-bold text-foreground">
              {t("emptyTitle")}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t("emptyDesc")}
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            <div className="space-y-3.5">
              {notifications.map((item) => (
                <div
                  key={item?._id}
                  onClick={() => handleMarkAsRead(item)}
                  className={`group relative flex flex-col gap-2.5 rounded-2xl border p-5 sm:p-6 transition-all ${
                    item?.isRead
                      ? "border-border/60 bg-card/60 text-muted-foreground"
                      : "border-primary/30 bg-primary/5 text-foreground shadow-xs cursor-pointer hover:border-primary/50 hover:bg-primary/10"
                  }`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      {!item?.isRead && (
                        <span className="size-2.5 rounded-full bg-primary shrink-0" />
                      )}
                      <h3
                        className={`text-base sm:text-lg tracking-tight ${
                          item?.isRead
                            ? "font-semibold text-foreground/90"
                            : "font-bold text-foreground"
                        }`}>
                        {item?.title}
                      </h3>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground shrink-0 pt-0.5">
                      {item?.createdAt
                        ? new Date(item.createdAt).toLocaleDateString(
                            locale === "it" ? "it-IT" : "en-GB",
                            {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )
                        : ""}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item?.body}
                  </p>

                  <div className="mt-2 flex items-center justify-between gap-3 pt-2 border-t border-border/40">
                    <div className="flex items-center gap-2">
                      {item?.metadata?.orderId ? (
                        <Link
                          href={ROUTES.ORDER_DETAIL(item?.metadata?.orderId)}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkAsRead(item);
                          }}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-background px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-secondary">
                          <Eye className="size-3.5 text-primary" />
                          {t("viewOrder")}
                          {item?.metadata?.publicOrderId
                            ? ` (${item?.metadata?.publicOrderId})`
                            : ""}
                        </Link>
                      ) : item?.type === "ACCOUNT_ACTIVATED" ? (
                        <Link
                          href={ROUTES.CATALOGUE}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkAsRead(item);
                          }}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-background px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-secondary">
                          <ShoppingBag className="size-3.5 text-primary" />
                          {t("browseCatalogue")}
                        </Link>
                      ) : null}
                    </div>

                    {!item?.isRead && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkAsRead(item);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline cursor-pointer">
                        <CheckCircle className="size-3.5" /> {t("markAsRead")}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-border pt-6 mt-8">
                <span className="text-sm font-medium text-muted-foreground">
                  {t("pageIndicator", {
                    page: pagination.page,
                    totalPages: pagination.totalPages,
                  })}
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!pagination.hasPrevPage || isFetching}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="h-9 gap-1.5 px-4 text-xs font-semibold">
                    <ChevronLeft className="size-4" /> {t("previous")}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!pagination.hasNextPage || isFetching}
                    onClick={() => setPage((p) => p + 1)}
                    className="h-9 gap-1.5 px-4 text-xs font-semibold">
                    {t("next")} <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
