"use client";

import {
  AlertCircle,
  CalendarDays,
  Car,
  ChevronRight,
  ClipboardCheck,
  Gauge,
  RefreshCw,
  Search,
  UserRound,
} from "lucide-react";
import { getCookie } from "cookies-next";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { apiClient } from "@/lib/authClient";
import { cn } from "@/lib/utils";
import type { GetTreatyType } from "@/utils/types";

type InspectionQuery = GetTreatyType<
  () => ReturnType<(typeof import("@/lib/authClient").apiClient.api.fleet.inspection)["get"]>
>;
type InspectionApiItem = InspectionQuery["result"][number];
type Status = "COMPLETED" | "CREATED" | "SCHEDULED" | "IN_PROGRESS" | "APPROVED";
type Answer = { question?: string; answer?: string; description?: string };
type Group = { type?: string; values?: Answer[] };
type Inspection = {
  id: string;
  status: Status;
  licensePlate?: string | null;
  description?: string | null;
  createdAt?: string;
  inspection?: Group[] | null;
  vehicle?: {
    licensePlate?: string | null;
    vin?: string | null;
    km?: number | null;
    model?: string | null;
  };
  employee?: { firstname?: string | null; lastname?: string | null } | null;
};
type Response = { result?: Inspection[]; totalCount?: number };
type InspectionListQuery = Parameters<typeof apiClient.api.fleet.inspection.get>[0]["query"];
type FilterField = "id" | "machineId" | "templateId" | "stateResult";

function toInspection(item: InspectionApiItem): Inspection {
  return {
    id: item.inspection.id,
    status: item.inspection.state as Status,
    licensePlate: item.machine?.licensePlate,
    description: item.inspection.note,
    createdAt: item.inspection.createdAt,
    inspection: null,
    vehicle: item.machine ?? undefined,
    employee: null,
  };
}

const filters: { label: string; value: Status | "ALL" }[] = [
  { label: "Бүгд", value: "ALL" },
  { label: "Хүлээгдэж буй", value: "CREATED" },
  { label: "Баталгаажсан", value: "APPROVED" },
];
const stateFilters: { label: string; value: Exclude<Status, "APPROVED"> | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Created", value: "CREATED" },
  { label: "Scheduled", value: "SCHEDULED" },
  { label: "In progress", value: "IN_PROGRESS" },
  { label: "Completed", value: "COMPLETED" },
];
const styles: Record<string, [string, string]> = {
  CREATED: ["Хүлээгдэж буй", "bg-amber-50 text-amber-700 ring-amber-200"],
  APPROVED: ["Баталгаажсан", "bg-emerald-50 text-emerald-700 ring-emerald-200"],
  CANCELLED: ["Цуцлагдсан", "bg-slate-100 text-slate-600 ring-slate-200"],
};
const vehicleName = (item: Inspection) =>
  item.vehicle?.model || item.vehicle?.vin || "Тээврийн хэрэгсэл";
const employeeName = (item: Inspection) =>
  [item.employee?.lastname, item.employee?.firstname].filter(Boolean).join(" ") || "Оноогдоогүй";
const formatDate = (value?: string) =>
  value
    ? new Intl.DateTimeFormat("mn-MN", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(value))
    : "Огноо байхгүй";
function unpack(payload: unknown): { items: Inspection[]; total: number } {
  if (Array.isArray(payload)) return { items: payload as Inspection[], total: payload.length };
  const result = payload && typeof payload === "object" ? (payload as Response) : null;
  return Array.isArray(result?.result)
    ? { items: result.result, total: result.totalCount ?? result.result.length }
    : { items: [], total: 0 };
}
function Badge({ status = "CREATED" }: { status?: Status }) {
  const [label, color] = styles[status];
  return (
    <span className={cn("shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold ring-1", color)}>
      {label}
    </span>
  );
}

function Card({ item, open }: { item: Inspection; open: (item: Inspection) => void }) {
  const plate = item.licensePlate || item.vehicle?.licensePlate || "Улсын дугааргүй";
  const count =
    item.inspection?.reduce((total, group) => total + (group.values?.length ?? 0), 0) ?? 0;
  return (
    <button
      type="button"
      onClick={() => open(item)}
      className="w-full rounded-xl border border-slate-200 bg-white p-3 text-left shadow-sm active:scale-[0.99]"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-[14px] font-bold leading-5 text-slate-950">{plate}</p>
          <p className="truncate text-[11px] leading-4 text-slate-500">{vehicleName(item)}</p>
        </div>
        <Badge status={item.status} />
      </div>
      <div className="mt-2.5 grid grid-cols-[28px_minmax(0,1fr)_16px] items-center gap-2 border-t border-slate-100 pt-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <ClipboardCheck className="h-4 w-4" />
        </span>
        <div className="grid min-w-0 grid-cols-2 gap-x-2 gap-y-1 text-[10px] leading-4 text-slate-500">
          <span className="flex min-w-0 items-center gap-1 truncate">
            <UserRound className="h-3 w-3 shrink-0" />
            {employeeName(item)}
          </span>
          <span className="flex min-w-0 items-center gap-1 truncate">
            <Gauge className="h-3 w-3 shrink-0" />
            {item.vehicle?.km ? `${item.vehicle.km.toLocaleString()} км` : "Км байхгүй"}
          </span>
          <span className="col-span-2 flex min-w-0 items-center gap-1 truncate">
            <CalendarDays className="h-3 w-3 shrink-0" />
            {formatDate(item.createdAt)} · {count} шалгалт
          </span>
        </div>
        <ChevronRight className="h-4 w-4 text-slate-400" />
      </div>
    </button>
  );
}

function Details({ item, onClose }: { item: Inspection | null; onClose: () => void }) {
  return (
    <Dialog open={!!item} onOpenChange={(open) => !open && onClose()}>
      {item && (
        <DialogContent className="max-h-[85dvh] max-w-[calc(100%-1.5rem)] gap-3 overflow-y-auto rounded-2xl p-4 sm:max-w-md">
          <DialogHeader className="pr-7 text-left">
            <div className="flex items-center gap-2">
              <Car className="h-4 w-4 text-blue-600" />
              <DialogTitle className="text-base">
                {item.licensePlate || item.vehicle?.licensePlate || "Үзлэгийн мэдээлэл"}
              </DialogTitle>
            </div>
            <DialogDescription className="text-[11px]">
              {vehicleName(item)} · {formatDate(item.createdAt)}
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
            <span className="text-[11px] text-slate-500">Хариуцсан ажилтан</span>
            <span className="text-[11px] font-semibold text-slate-800">{employeeName(item)}</span>
          </div>
          {item.description && (
            <p className="rounded-xl border border-slate-100 p-3 text-[11px] leading-4 text-slate-600">
              {item.description}
            </p>
          )}
          <div className="space-y-2">
            {!item.inspection?.length && (
              <p className="rounded-xl border border-dashed border-slate-200 p-4 text-center text-[11px] text-slate-500">
                Шалгалтын дэлгэрэнгүй мэдээлэл байхгүй.
              </p>
            )}
            {item.inspection?.map((group, index) => (
              <section
                key={`${group.type}-${index}`}
                className="rounded-xl border border-slate-200 p-3"
              >
                <h3 className="text-[12px] font-bold text-slate-900">{group.type || "Шалгалт"}</h3>
                <div className="mt-2 space-y-2">
                  {group.values?.map((value, valueIndex) => (
                    <div
                      key={`${value.question}-${valueIndex}`}
                      className="border-t border-slate-100 pt-2 first:border-0 first:pt-0"
                    >
                      <p className="text-[11px] font-medium leading-4 text-slate-700">
                        {value.question || value.description || "Асуулт"}
                      </p>
                      <p className="mt-0.5 text-[11px] leading-4 text-slate-500">
                        {value.answer || "Хариулт оруулаагүй"}
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
  );
}

export default function InspectionPage() {
  const searchParams = useSearchParams();
  const inspectionId = searchParams.get("id");
  const [items, setItems] = useState<Inspection[]>([]),
    [total, setTotal] = useState(0),
    [filter, setFilter] = useState<Status | "ALL">("ALL"),
    [search, setSearch] = useState(""),
    [filterField, setFilterField] = useState<FilterField>("id"),
    [selected, setSelected] = useState<Inspection | null>(null),
    [loading, setLoading] = useState(true),
    [error, setError] = useState<string | null>(null);
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = getCookie("token");
      if (!token) return;
      const query: InspectionListQuery = { pagination: { page: 1, size: 50 } };
      if (inspectionId) query.id = inspectionId;
      if (filter !== "ALL") query.state = filter as InspectionListQuery["state"];
      if (search.trim()) {
        if (filterField === "stateResult") {
          query.stateResult = search.trim().toUpperCase() as InspectionListQuery["stateResult"];
        } else {
          query[filterField] = search.trim();
        }
      }
      const response = await apiClient.api.fleet.inspection.get({
        query,
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data) {
        setItems(response.data.result.map(toInspection));
        setTotal(response.data.totalCount);
      }
    } catch (cause) {
      console.error("Failed to fetch fleet inspections:", cause);
      setError("Үзлэгийн мэдээлэл авахад алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setLoading(false);
    }
  }, [filter, filterField, inspectionId, search]);
  useEffect(() => {
    let isMounted = true;
    void load();
    return () => {
      isMounted = false;
    };
  }, [load]);
  const visible = useMemo(() => items, [items]);
  return (
    <>
      <main className="mx-auto min-h-[calc(100svh-8rem)] w-full max-w-[430px] bg-white px-4 pb-3 pt-2 sm:hidden">
        <header className="mb-4 pt-[env(safe-area-inset-top)]">
          <div className="flex h-12 items-center justify-between">
            <div>
              <h1 className="text-[19px] font-bold leading-6 text-slate-950">Үзлэг</h1>
              <p className="text-[11px] text-slate-500">Нийт {total} үзлэг</p>
            </div>
            <button
              type="button"
              onClick={() => void load()}
              aria-label="Дахин ачаалах"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600"
            >
              <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
            </button>
          </div>
        </header>
        <select
          value={filterField}
          onChange={(event) => setFilterField(event.target.value as FilterField)}
          className="mb-2 h-9 w-full rounded-lg border border-slate-200 bg-white px-2 text-[11px] font-medium text-slate-600 outline-none"
        >
          <option value="id">Inspection ID</option>
          <option value="machineId">Machine ID</option>
          <option value="templateId">Template ID</option>
          <option value="stateResult">Result</option>
        </select>
        <label className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3">
          <Search className="h-4 w-4 shrink-0 text-slate-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Дугаар, машин, ажилтан"
            className="min-w-0 flex-1 bg-transparent text-[12px] outline-none placeholder:text-slate-400"
          />
        </label>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {stateFilters.map((item, index) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setFilter(item.value)}
              className={cn(
                "min-w-0 rounded-lg px-3 py-2 text-[11px] font-semibold",
                index === stateFilters.length - 1 && "col-span-2",
                filter === item.value ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <section className="mt-3 space-y-2.5">
          {loading && (
            <div className="rounded-xl border border-dashed border-slate-200 p-5 text-center text-[12px] text-slate-500">
              Үзлэгийн мэдээлэл уншиж байна...
            </div>
          )}
          {!loading && error && (
            <div className="flex gap-2 rounded-xl border border-red-100 bg-red-50 p-3 text-[12px] leading-4 text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}
          {!loading && !error && !visible.length && (
            <div className="rounded-xl border border-dashed border-slate-200 p-5 text-center text-[12px] text-slate-500">
              Тохирох үзлэг олдсонгүй.
            </div>
          )}
          {!loading && visible.map((item) => <Card key={item.id} item={item} open={setSelected} />)}
        </section>
      </main>
      <div className="hidden min-h-[60svh] place-items-center sm:grid">
        <div className="max-w-sm rounded-2xl border border-slate-200 bg-white p-5 text-center text-sm font-medium text-slate-500">
          Үзлэгийн хуудас зөвхөн утасны дэлгэц дээр харагдана.
        </div>
      </div>
      <Details item={selected} onClose={() => setSelected(null)} />
    </>
  );
}
