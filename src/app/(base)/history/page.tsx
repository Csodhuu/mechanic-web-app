"use client";

import { CpOrderQuery } from "@/app/(base)/jobs/model";
import { EmptyState, MetricCard, PageShell } from "@/components/page-shell";
import { apiClient } from "@/lib/authClient";
import { cn } from "@/lib/utils";
import { getCookie } from "cookies-next";
import {
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Gauge,
  History as HistoryIcon,
  ReceiptText,
  User,
  Wrench,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type OrderItem = NonNullable<CpOrderQuery>["result"][number];

function formatDate(value?: string | null) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("mn-MN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value));
}

function formatTime(value?: string | null) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("mn-MN", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatMoney(value?: number | null) {
  return new Intl.NumberFormat("mn-MN", {
    style: "currency",
    currency: "MNT",
    maximumFractionDigits: 0,
  }).format(value ?? 0);
}

function getVehicleName(item: OrderItem) {
  return [item.make?.name, item.model?.name].filter(Boolean).join(" ") || "Машины мэдээлэлгүй";
}

function getCustomerName(item: OrderItem) {
  return (
    [item.customer?.lastname, item.customer?.firstname].filter(Boolean).join(" ") ||
    item.customer?.phoneNumber ||
    "-"
  );
}

function groupByCompletedDate(items: OrderItem[]) {
  return items.reduce<{ group: string; items: OrderItem[] }[]>((groups, item) => {
    const group = formatDate(item.order.timeCompleted ?? item.order.updatedAt);
    const existingGroup = groups.find((entry) => entry.group === group);
    if (existingGroup) {
      existingGroup.items.push(item);
      return groups;
    }
    return [...groups, { group, items: [item] }];
  }, []);
}

export default function History() {
  const router = useRouter();
  const [data, setData] = useState<CpOrderQuery | null>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const orders = useMemo(() => data?.result ?? [], [data?.result]);
  const totalAmount = orders.reduce((total, item) => total + item.totalAmount, 0);
  const groupedHistories = useMemo(() => groupByCompletedDate(orders), [orders]);

  const openDetail = (id: string) => {
    router.push(`/service-order-detail?id=${encodeURIComponent(id)}`);
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        if (isMounted) {
          setLoading(true);
          setError(null);
        }

        const token = getCookie("token");
        if (!token) {
          if (isMounted) setError("Нэвтрэх token олдсонгүй.");
          return;
        }

        const res = await apiClient.api.crm["cp-order"].get({
          query: {
            state: "COMPLETE",
            pagination: { page: 1, size: 25 },
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (isMounted) setData(res.data);
      } catch (cause) {
        console.error("Failed to fetch completed orders:", cause);
        if (isMounted) setError("Дууссан ажлын түүх авахад алдаа гарлаа.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    void fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PageShell
      eyebrow="Archive"
      title="Засварын түүх"
      description="Дууссан service order-ууд, нийт дүн, харилцагч болон машины мэдээлэл."
      icon={<HistoryIcon className="size-5" />}
    >
      <section className="grid gap-3 sm:grid-cols-3">
        <MetricCard
          label="Нийт"
          value={String(data?.totalCount ?? orders.length)}
          description="Дууссан захиалга"
          tone="blue"
          icon={<ReceiptText className="size-5" />}
        />
        <MetricCard
          label="Ажлын тоо"
          value={String(orders.length)}
          description="Энэ хуудсанд харагдаж буй"
          tone="emerald"
          icon={<CheckCircle2 className="size-5" />}
        />
        <MetricCard
          label="Нийт дүн"
          value={formatMoney(totalAmount)}
          description="Харагдаж буй ажлуудын нийлбэр"
          tone="amber"
          icon={<ReceiptText className="size-5" />}
        />
      </section>

      {isLoading && <EmptyState title="Уншиж байна" description="Дууссан ажлуудыг татаж байна..." />}
      {!isLoading && error && <EmptyState title="Мэдээлэл авах боломжгүй" description={error} />}
      {!isLoading && !error && orders.length === 0 && (
        <EmptyState
          title="Түүх хоосон байна"
          description="Хяналт дууссан service order энд харагдана."
        />
      )}

      {!isLoading &&
        !error &&
        groupedHistories.map((group) => (
          <section key={group.group} className="space-y-2">
            <div className="flex items-center gap-2">
              <CalendarDays className="size-4 text-slate-400" />
              <h2 className="text-sm font-semibold text-slate-700">{group.group}</h2>
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
              {group.items.map((item) => {
                const completedAt = item.order.timeCompleted ?? item.order.updatedAt;
                return (
                  <button
                    key={item.order.id}
                    type="button"
                    onClick={() => openDetail(item.order.id)}
                    className="grid w-full grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-3 border-b border-slate-100 px-4 py-3 text-left transition last:border-b-0 hover:bg-slate-50"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                      <CheckCircle2 className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-2">
                        <span className="truncate text-sm font-semibold text-slate-950">
                          {item.order.orderId}
                        </span>
                        <span className="hidden shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 sm:inline-flex">
                          Дууссан
                        </span>
                      </span>
                      <span className="mt-1 block truncate text-sm text-slate-500">
                        {getVehicleName(item)} · {item.vehicle?.licensePlate ?? "-"}
                      </span>
                      <span className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
                        <span className="inline-flex items-center gap-1">
                          <User className="size-3.5" />
                          {getCustomerName(item)}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Gauge className="size-3.5" />
                          {item.vehicle?.km ?? item.order.km ?? "-"} км
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock3 className="size-3.5" />
                          {formatTime(completedAt)}
                        </span>
                        <span className="inline-flex items-center gap-1 font-medium text-slate-700">
                          <Wrench className="size-3.5" />
                          {formatMoney(item.totalAmount)}
                        </span>
                      </span>
                    </span>
                    <ChevronRight className={cn("size-4 text-slate-300")} />
                  </button>
                );
              })}
            </div>
          </section>
        ))}
    </PageShell>
  );
}
