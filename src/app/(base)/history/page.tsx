"use client";

import { CpOrderQuery } from "@/app/(base)/jobs/model";
import { cn } from "@/lib/utils";
import { apiClient } from "@/lib/authClient";
import { getCookie } from "cookies-next";
import {
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Gauge,
  History as HistoryIcon,
  ReceiptText,
  Search,
  SlidersHorizontal,
  User,
  Wrench,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const filters = [
  { label: "Бүгд", active: true },
  { label: "Дууссан", active: false },
  { label: "Буцаасан", active: false },
];

type OrderItem = NonNullable<CpOrderQuery>["result"][number];

const toneClass = {
  emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

const summaryToneClass = {
  blue: "bg-blue-50 text-blue-700",
  emerald: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-700",
};

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

function MetaItem({ icon: Icon, label }: { icon: typeof Wrench; label: string }) {
  return (
    <span className="flex min-w-0 items-center gap-1 text-[11px] font-medium leading-4 text-slate-500">
      <Icon className="h-3.5 w-3.5 shrink-0 text-slate-500" strokeWidth={1.8} />
      <span className="truncate">{label}</span>
    </span>
  );
}

function StatusPill({ label }: { label: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-7 shrink-0 items-center gap-1.5 rounded-full border px-2.5 text-[11px] font-semibold",
        toneClass.emerald
      )}
    >
      <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2} />
      {label}
    </span>
  );
}

function HistoryCard({ item, onOpen }: { item: OrderItem; onOpen: (id: string) => void }) {
  const vehicleName = getVehicleName(item);
  const completedAt = item.order.timeCompleted ?? item.order.updatedAt;

  return (
    <article
      role="button"
      tabIndex={0}
      className="cursor-pointer rounded-[15px] border border-slate-200 bg-white p-3.5 shadow-sm transition hover:border-blue-200 hover:bg-blue-50/30"
      onClick={() => onOpen(item.order.id)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen(item.order.id);
        }
      }}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h2 className="truncate text-[19px] font-bold leading-6 text-[#101735]">
            {item.order.orderId}
          </h2>
          <p className="mt-0.5 truncate text-[12px] font-medium text-slate-500">{vehicleName}</p>
        </div>
        <StatusPill label="Дууссан" />
      </div>

      <div className="grid grid-cols-[44px_minmax(0,1fr)_20px] items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <ReceiptText className="h-6 w-6" strokeWidth={2} />
        </span>

        <div className="min-w-0">
          <div className="grid grid-cols-2 gap-x-2 gap-y-1.5">
            <MetaItem icon={Wrench} label={item.vehicle?.licensePlate ?? "-"} />
            <MetaItem icon={Gauge} label={`${item.vehicle?.km ?? item.order.km} км`} />
            <MetaItem icon={User} label={getCustomerName(item)} />
            <MetaItem icon={Clock3} label={formatTime(completedAt)} />
          </div>
          <p className="mt-2 line-clamp-2 text-[13px] leading-5 text-slate-600">
            {item.order.description || item.customer?.phoneNumber || "Тайлбар ороогүй"}
          </p>
        </div>

        <ChevronRight className="h-6 w-6 text-slate-400" strokeWidth={2.1} />
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3">
        <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-slate-500">
          <CalendarDays className="h-3.5 w-3.5" strokeWidth={1.9} />
          {formatDate(completedAt)}
        </span>
        <span className="text-[15px] font-bold leading-5 text-[#101735]">
          {formatMoney(item.totalAmount)}
        </span>
      </div>
    </article>
  );
}

export default function History() {
  const router = useRouter();
  const [data, setData] = useState<CpOrderQuery | null>();
  const [isLoading, setLoading] = useState(false);

  const orders = useMemo(() => data?.result ?? [], [data?.result]);
  const totalAmount = orders.reduce((total, item) => total + item.totalAmount, 0);
  const groupedHistories = useMemo(() => groupByCompletedDate(orders), [orders]);
  const summary = [
    { label: "Нийт", value: String(data?.totalCount ?? orders.length), tone: "blue" },
    { label: "Дууссан", value: String(orders.length), tone: "emerald" },
    { label: "Дүн", value: formatMoney(totalAmount), tone: "amber" },
  ];

  const openDetail = (id: string) => {
    router.push(`/service-order-detail?id=${encodeURIComponent(id)}`);
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      await Promise.resolve();
      try {
        if (isMounted) setLoading(true);
        const token = getCookie("token");
        if (!token) return;

        const res = await apiClient.api.crm["cp-order"].get({
          query: {
            state: "COMPLETE",
            pagination: { page: 1, size: 10 },
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (isMounted) setData(res.data);
      } catch (error) {
        console.error("Failed to fetch completed orders:", error);
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
    <main className="mx-auto min-h-[calc(100svh-8rem)] w-full max-w-[430px] bg-white px-4 pb-3 pt-2">
      <header className="mb-4 pt-[env(safe-area-inset-top)]">
        <div className="grid h-14 grid-cols-[48px_1fr_48px] items-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <HistoryIcon className="h-6 w-6" strokeWidth={2.1} />
          </span>
          <div className="min-w-0 text-center">
            <h1 className="truncate text-[20px] font-bold leading-6 text-[#101735]">
              Засварын түүх
            </h1>
            <p className="truncate text-[13px] font-medium text-slate-500">
              Дууссан ажлуудын бүртгэл
            </p>
          </div>
          <button
            type="button"
            aria-label="Шүүлтүүр"
            className="ml-auto flex h-11 w-11 items-center justify-center text-blue-600"
          >
            <SlidersHorizontal className="h-6 w-6" strokeWidth={2.1} />
          </button>
        </div>
      </header>

      <section className="grid grid-cols-3 gap-2">
        {summary.map((item) => (
          <div
            key={item.label}
            className={cn(
              "rounded-[10px] px-3 py-2.5",
              summaryToneClass[item.tone as keyof typeof summaryToneClass]
            )}
          >
            <p className="text-[11px] font-semibold leading-4 opacity-80">{item.label}</p>
            <p className="mt-0.5 text-[20px] font-bold leading-6">{item.value}</p>
          </div>
        ))}
      </section>

      <div className="mt-4 flex h-11 items-center gap-2 rounded-[10px] border border-slate-200 bg-white px-3 text-slate-500">
        <Search className="h-4.5 w-4.5 shrink-0" strokeWidth={2} />
        <span className="min-w-0 truncate text-[13px] font-medium">
          Захиалга, машин, улсын дугаараар хайх
        </span>
      </div>

      <div className="mt-3 grid grid-cols-3 overflow-hidden rounded-[10px] border border-slate-200 bg-white">
        {filters.map((filter) => (
          <button
            key={filter.label}
            type="button"
            className={cn(
              "h-10 border-r border-slate-200 px-1 text-[13px] font-semibold last:border-r-0",
              filter.active ? "bg-blue-600 text-white" : "text-slate-500"
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <section className="mt-4 space-y-5">
        {isLoading && (
          <div className="rounded-[15px] border border-dashed border-slate-200 bg-white p-5 text-center text-sm text-slate-500">
            Түүх уншиж байна...
          </div>
        )}

        {!isLoading && groupedHistories.length === 0 && (
          <div className="rounded-[15px] border border-dashed border-slate-200 bg-white p-5 text-center text-sm text-slate-500">
            Дууссан засварын түүх олдсонгүй.
          </div>
        )}

        {groupedHistories.map((group) => (
          <div key={group.group}>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-[14px] font-bold leading-5 text-[#101735]">{group.group}</h2>
              <span className="text-[12px] font-semibold text-slate-400">
                {group.items.length} ажил
              </span>
            </div>
            <div className="space-y-3">
              {group.items.map((item) => (
                <HistoryCard key={item.order.id} item={item} onOpen={openDetail} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
