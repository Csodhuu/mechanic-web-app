"use client";

import { EmptyState, MetricCard, PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/authClient";
import { cn } from "@/lib/utils";
import { getCookie } from "cookies-next";
import {
  CalendarDays,
  CarFront,
  ClipboardCheck,
  RefreshCw,
  Search,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

type InspectionResponse = NonNullable<
  Awaited<ReturnType<typeof apiClient.api.crm.inspection.get>>["data"]
>;
type InspectionItem = InspectionResponse["result"][number];
type Status = InspectionItem["inspection"]["status"];

const filters: { label: string; value: Status | "ALL" }[] = [
  { label: "Бүгд", value: "ALL" },
  { label: "Хүлээгдэж буй", value: "CREATED" },
  { label: "Баталгаажсан", value: "APPROVED" },
  { label: "Цуцлагдсан", value: "CANCELLED" },
];

const statusStyle: Record<Status, { label: string; className: string }> = {
  CREATED: { label: "Хүлээгдэж буй", className: "bg-amber-50 text-amber-700 ring-amber-200" },
  APPROVED: { label: "Баталгаажсан", className: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  CANCELLED: { label: "Цуцлагдсан", className: "bg-slate-100 text-slate-600 ring-slate-200" },
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("mn-MN", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));

const employeeName = (item: InspectionItem) =>
  [item.employee?.lastname, item.employee?.firstname].filter(Boolean).join(" ") || "Оноогдоогүй";

export default function InspectionPage() {
  const [items, setItems] = useState<InspectionItem[]>([]);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState<Status | "ALL">("ALL");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<InspectionItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const counts = useMemo(
    () => ({
      total,
      visible: items.length,
      checked: items.reduce(
        (sum, item) =>
          sum + (item.inspection.inspection?.reduce((groupSum, group) => groupSum + group.values.length, 0) ?? 0),
        0
      ),
    }),
    [items, total]
  );

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const token = getCookie("token");
      if (!token) throw new Error("Authentication token is missing");
      const response = await apiClient.api.crm.inspection.get({
        query: {
          pagination: { page: 1, size: 50 },
          ...(filter !== "ALL" ? { status: filter } : {}),
          ...(search.trim() ? { licensePlate: search.trim() } : {}),
        },
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.error || !response.data) throw response.error;
      setItems(response.data.result);
      setTotal(response.data.totalCount);
    } catch (cause) {
      console.error("Failed to fetch CRM inspections:", cause);
      setError("Анхан үзлэгийн жагсаалт авахад алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  }, [filter, search]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => void load(), search.trim() ? 300 : 0);
    return () => window.clearTimeout(timeoutId);
  }, [load, search]);

  return (
    <PageShell
      eyebrow="Inspections"
      title="Анхан үзлэгүүд"
      description="Бүртгэгдсэн үзлэгүүдийг улсын дугаар болон төлөвөөр хайж шалгана."
      icon={<ClipboardCheck className="size-5" />}
      action={
        <Button type="button" variant="outline" size="icon" aria-label="Дахин ачаалах" onClick={() => void load()}>
          <RefreshCw className={cn("size-4", loading && "animate-spin")} />
        </Button>
      }
    >
      <section className="grid gap-3 sm:grid-cols-3">
        <MetricCard
          label="Нийт"
          value={String(counts.total)}
          description="Бүртгэгдсэн үзлэг"
          tone="blue"
          icon={<ClipboardCheck className="size-5" />}
        />
        <MetricCard
          label="Харагдаж буй"
          value={String(counts.visible)}
          description="Одоогийн filter"
          tone="emerald"
          icon={<ShieldCheck className="size-5" />}
        />
        <MetricCard
          label="Checklist"
          value={String(counts.checked)}
          description="Нийт шалгасан мөр"
          tone="amber"
          icon={<CarFront className="size-5" />}
        />
      </section>

      <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row">
          <label className="relative block min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="pl-9"
              placeholder="Улсын дугаараар хайх"
            />
          </label>
          <div className="flex gap-2 overflow-x-auto">
            {filters.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFilter(option.value)}
                className={cn(
                  "h-10 shrink-0 rounded-full px-3 text-xs font-semibold transition",
                  filter === option.value ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {error && <EmptyState title="Мэдээлэл авах боломжгүй" description={error} />}
      {loading && <EmptyState title="Уншиж байна" description="Анхан үзлэгийн жагсаалт татаж байна..." />}
      {!loading && !error && items.length === 0 && (
        <EmptyState title="Үзлэг олдсонгүй" description="Хайлтын утга эсвэл төлөвийн filter-ээ өөрчилж шалгана уу." />
      )}

      {!loading && !error && items.length > 0 && (
        <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          {items.map((item) => {
            const resultCount =
              item.inspection.inspection?.reduce((sum, group) => sum + group.values.length, 0) ?? 0;
            const badge = statusStyle[item.inspection.status];
            return (
              <button
                key={item.inspection.id}
                type="button"
                onClick={() => setSelected(item)}
                className="w-full border-b border-slate-100 px-4 py-3 text-left transition last:border-b-0 hover:bg-slate-50"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                      <CarFront className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-950">
                        {item.inspection.licensePlate}
                      </p>
                      <p className="truncate text-sm text-slate-500">VIN: {item.vehicle.vin ?? "-"}</p>
                    </div>
                  </div>
                  <span className={cn("shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1", badge.className)}>
                    {badge.label}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <UserRound className="size-3.5" />
                    {employeeName(item)}
                  </span>
                  <span className="flex items-center gap-1">
                    <CalendarDays className="size-3.5" />
                    {formatDate(item.inspection.createdAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <ClipboardCheck className="size-3.5" />
                    {resultCount} шалгалт
                  </span>
                </div>
              </button>
            );
          })}
        </section>
      )}

      <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        {selected && (
          <DialogContent className="max-h-[85svh] overflow-y-auto p-4 sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{selected.inspection.licensePlate} - Анхан үзлэг</DialogTitle>
            </DialogHeader>
            {selected.inspection.description && (
              <p className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-600">
                {selected.inspection.description}
              </p>
            )}
            <div className="space-y-3">
              {selected.inspection.inspection?.map((group) => (
                <section key={group.type} className="rounded-2xl border border-slate-200 p-3">
                  <h2 className="text-sm font-semibold text-slate-900">
                    {group.type === "General"
                      ? "Ерөнхий шалгалт"
                      : group.type === "Technical"
                        ? "Техникийн шалгалт"
                        : group.type}
                  </h2>
                  <div className="mt-2 space-y-2">
                    {group.values.map((value) => (
                      <div key={value.question} className="border-t border-slate-100 pt-2 first:border-0 first:pt-0">
                        <p className="text-xs font-medium text-slate-700">{value.question}</p>
                        <p className="mt-1 text-xs text-slate-500">
                          Үр дүн: {value.answer}
                          {value.description ? ` · ${value.description}` : ""}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </PageShell>
  );
}
