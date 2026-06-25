"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/authClient";
import { cn } from "@/lib/utils";
import { getCookie } from "cookies-next";
import {
  ArrowLeft,
  CalendarClock,
  CarFront,
  ChevronRight,
  Clock3,
  RefreshCw,
  Search,
  ShieldCheck,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { CpOrderQuery } from "@/app/(base)/jobs/model";

type OrderItem = CpOrderQuery["result"][number];
type OrderState = OrderItem["order"]["state"];

const tabs: { value: OrderState; label: string; detail: string }[] = [
  { value: "CREATED", label: "Хүлээгдэж буй", detail: "Хяналт руу шилжүүлэхэд бэлэн" },
  { value: "PROGRESSING", label: "Хяналтанд буй", detail: "Одоогоор хяналт хийж байна" },
  { value: "COMPLETE", label: "Дууссан", detail: "Хяналт дууссан ажлууд" },
];

const stateStyle: Record<
  OrderState,
  { label: string; className: string; icon: typeof ShieldCheck }
> = {
  CREATED: {
    label: "Хүлээгдэж буй",
    className: "border-amber-200 bg-amber-50 text-amber-700",
    icon: Clock3,
  },
  PROGRESSING: {
    label: "Хяналтанд буй",
    className: "border-blue-200 bg-blue-50 text-blue-700",
    icon: ShieldCheck,
  },
  COMPLETE: {
    label: "Дууссан",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
    icon: ShieldCheck,
  },
};

function formatDate(value?: string | null) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("mn-MN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
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

function getHeaders() {
  const token = getCookie("token");
  return token ? { Authorization: `Bearer ${token}` } : undefined;
}

export default function Control() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialState = useMemo(() => {
    const value = searchParams.get("state");
    if (value === "CREATED" || value === "PROGRESSING" || value === "COMPLETE") return value;
    return "CREATED";
  }, [searchParams]);

  const [activeState, setActiveState] = useState<OrderState>(initialState);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [counts, setCounts] = useState<Record<OrderState, number>>({
    CREATED: 0,
    PROGRESSING: 0,
    COMPLETE: 0,
  });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mutatingId, setMutatingId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const value = searchParams.get("state");
    if (value === "CREATED" || value === "PROGRESSING" || value === "COMPLETE") {
      setActiveState(value);
    }
  }, [searchParams]);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const headers = getHeaders();
      if (!headers) {
        setError("Нэвтрэх token олдсонгүй.");
        return;
      }

      const searchValue = search.trim();
      const queryBase = {
        pagination: { page: 1, size: 25 },
        ...(searchValue ? { licensePlate: searchValue } : {}),
      };

      const [createdRes, progressingRes, completeRes, activeRes] = await Promise.all([
        apiClient.api.crm["cp-order"].get({
          query: { ...queryBase, state: "CREATED" },
          headers,
        }),
        apiClient.api.crm["cp-order"].get({
          query: { ...queryBase, state: "PROGRESSING" },
          headers,
        }),
        apiClient.api.crm["cp-order"].get({
          query: { ...queryBase, state: "COMPLETE" },
          headers,
        }),
        apiClient.api.crm["cp-order"].get({
          query: { ...queryBase, state: activeState },
          headers,
        }),
      ]);

      if (createdRes.error || progressingRes.error || completeRes.error || activeRes.error) {
        throw createdRes.error || progressingRes.error || completeRes.error || activeRes.error;
      }

      setCounts({
        CREATED: createdRes.data?.totalCount ?? 0,
        PROGRESSING: progressingRes.data?.totalCount ?? 0,
        COMPLETE: completeRes.data?.totalCount ?? 0,
      });
      setOrders(activeRes.data?.result ?? []);
    } catch (fetchError) {
      console.error("Failed to fetch control orders:", fetchError);
      setError("Хяналтын ажлуудыг уншихад алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  }, [activeState, search]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => void loadData(), search.trim() ? 300 : 0);
    return () => window.clearTimeout(timeoutId);
  }, [loadData, refreshKey, search]);

  const handleTabChange = (nextState: OrderState) => {
    setActiveState(nextState);

    const params = new URLSearchParams(searchParams.toString());
    if (nextState === "CREATED") {
      params.delete("state");
    } else {
      params.set("state", nextState);
    }

    const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(nextUrl, { scroll: false });
  };

  const startControl = async (item: OrderItem) => {
    try {
      setMutatingId(item.order.id);
      const headers = getHeaders();
      if (!headers) {
        toast.error("Нэвтрэх token олдсонгүй.");
        return;
      }

      const response = await apiClient.api.crm["cp-order"]({ id: item.order.id }).put(
        {
          state: "PROGRESSING",
          isQualityCheck: true,
        },
        { headers }
      );

      if (response.error || !response.data) throw response.error;

      toast.success("Хяналтанд шилжлээ.");
      setRefreshKey((current) => current + 1);
      if (activeState === "CREATED") {
        handleTabChange("PROGRESSING");
      }
    } catch (mutateError) {
      console.error("Failed to start control:", mutateError);
      toast.error("Хяналт руу шилжүүлэхэд алдаа гарлаа.");
    } finally {
      setMutatingId(null);
    }
  };

  const completeControl = async (item: OrderItem) => {
    try {
      setMutatingId(item.order.id);
      const headers = getHeaders();
      if (!headers) {
        toast.error("Нэвтрэх token олдсонгүй.");
        return;
      }

      const response = await apiClient.api.crm["cp-order"].complete.post(
        {
          id: item.order.id,
          km: item.vehicle?.km ?? item.order.km,
        },
        { headers }
      );

      if (response.error || !response.data) throw response.error;

      toast.success("Хяналт дууслаа.");
      setRefreshKey((current) => current + 1);
      if (activeState === "PROGRESSING") {
        handleTabChange("COMPLETE");
      }
    } catch (mutateError) {
      console.error("Failed to complete control:", mutateError);
      toast.error("Хяналтыг дуусгахад алдаа гарлаа.");
    } finally {
      setMutatingId(null);
    }
  };

  const openDetail = (id: string) => {
    router.push(`/service-order-detail?id=${encodeURIComponent(id)}`);
  };

  return (
    <div className="mx-auto min-h-[calc(100svh-8rem)] w-full max-w-[430px] bg-white px-4 pb-3 pt-2 sm:hidden">
      <header className="mb-4 pt-[env(safe-area-inset-top)]">
        <div className="grid h-14 grid-cols-[48px_1fr_48px] items-center">
          <button
            type="button"
            aria-label="Буцах"
            onClick={() => router.back()}
            className="flex h-11 w-11 items-center justify-center text-blue-600"
          >
            <ArrowLeft className="h-8 w-8" strokeWidth={2.4} />
          </button>
          <div className="min-w-0 text-center">
            <h1 className="truncate text-[20px] font-bold leading-6 text-[#101735]">
              Хяналтын инженер
            </h1>
            <p className="truncate text-[13px] font-medium text-slate-500">
              Хяналтанд шилжсэн ажлууд
            </p>
          </div>
          <button
            type="button"
            aria-label="Дахин ачаалах"
            onClick={() => setRefreshKey((current) => current + 1)}
            className="ml-auto flex h-11 w-11 items-center justify-center text-blue-600"
          >
            <RefreshCw className={cn("h-7 w-7", loading && "animate-spin")} strokeWidth={2.2} />
          </button>
        </div>
      </header>

      <Card className="rounded-[14px] border border-slate-200 bg-white p-3 shadow-sm">
        <div className="grid grid-cols-3 gap-2">
          {tabs.map((tab) => {
            const isActive = activeState === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => handleTabChange(tab.value)}
                className={cn(
                  "rounded-xl border px-2 py-2 text-left transition",
                  isActive
                    ? "border-blue-200 bg-blue-50"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                )}
              >
                <p
                  className={cn(
                    "text-[11px] font-semibold leading-4",
                    isActive ? "text-blue-700" : "text-slate-500"
                  )}
                >
                  {tab.label}
                </p>
                <p className="mt-1 text-[18px] font-bold leading-5 text-[#101735]">
                  {counts[tab.value]}
                </p>
                <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-slate-500">
                  {tab.detail}
                </p>
              </button>
            );
          })}
        </div>
      </Card>

      <div className="mt-3 flex h-11 items-center gap-2 rounded-[10px] border border-slate-200 bg-white px-3 text-slate-500">
        <Search className="h-4.5 w-4.5 shrink-0" strokeWidth={2} />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="min-w-0 flex-1 bg-transparent text-[13px] font-medium outline-none placeholder:text-slate-400"
          placeholder="Улсын дугаараар хайх"
        />
      </div>

      {error && (
        <div className="mt-3 rounded-[15px] border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <section className="mt-4 space-y-3">
        {loading && (
          <div className="rounded-[15px] border border-dashed border-slate-200 bg-white p-5 text-center text-sm text-slate-500">
            Хяналтын ажлууд уншиж байна...
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="rounded-[15px] border border-dashed border-slate-200 bg-white p-5 text-center text-sm text-slate-500">
            Хяналтанд буй ажил олдсонгүй.
          </div>
        )}

        {orders.map((item) => {
          const stateBadge = stateStyle[item.order.state];
          const StateIcon = stateBadge.icon;
          const actionLabel =
            item.order.state === "CREATED"
              ? "Хяналт эхлүүлэх"
              : item.order.state === "PROGRESSING"
                ? "Дуусгах"
                : "Дууссан";

          return (
            <Card
              key={item.order.id}
              className="rounded-[15px] border border-slate-200 bg-white p-3.5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h2 className="truncate text-[18px] font-bold leading-6 text-[#101735]">
                    {item.order.orderId}
                  </h2>
                  <p className="mt-0.5 truncate text-[12px] font-medium text-slate-500">
                    {getVehicleName(item)}
                  </p>
                </div>
                <span
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold",
                    stateBadge.className
                  )}
                >
                  <StateIcon className="h-3.5 w-3.5" strokeWidth={2} />
                  {stateBadge.label}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-[84px_minmax(0,1fr)] gap-3 border-t border-slate-100 pt-3">
                <div className="flex h-[68px] items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <CarFront className="h-10 w-10" strokeWidth={1.9} />
                </div>

                <div className="min-w-0">
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[11px] text-slate-500">
                    <Meta label={item.vehicle?.licensePlate ?? "-"} icon={ShieldCheck} />
                    <Meta
                      label={`${item.vehicle?.km ?? item.order.km} км`}
                      icon={CalendarClock}
                    />
                    <Meta label={getCustomerName(item)} icon={CarFront} />
                    <Meta label={formatDate(item.order.createdAt)} icon={Clock3} />
                  </div>
                  <p className="mt-2 line-clamp-2 text-[13px] leading-5 text-slate-600">
                    {item.order.description || "Тайлбар ороогүй"}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => openDetail(item.order.id)}
                >
                  Дэлгэрэнгүй
                  <ChevronRight className="h-4 w-4" />
                </Button>
                {item.order.state === "CREATED" && (
                  <Button
                    type="button"
                    size="sm"
                    className="flex-1"
                    disabled={mutatingId === item.order.id}
                    onClick={() => void startControl(item)}
                  >
                    {mutatingId === item.order.id ? "Шилжиж байна..." : actionLabel}
                  </Button>
                )}
                {item.order.state === "PROGRESSING" && (
                  <Button
                    type="button"
                    size="sm"
                    className="flex-1"
                    disabled={mutatingId === item.order.id}
                    onClick={() => void completeControl(item)}
                  >
                    {mutatingId === item.order.id ? "Дуусгаж байна..." : actionLabel}
                  </Button>
                )}
                {item.order.state === "COMPLETE" && (
                  <div className="flex-1 rounded-xl bg-emerald-50 px-3 py-2 text-center text-xs font-semibold text-emerald-700">
                    Дууссан
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </section>
    </div>
  );
}

function Meta({
  icon: Icon,
  label,
}: {
  icon: typeof ShieldCheck;
  label: string;
}) {
  return (
    <span className="flex min-w-0 items-center gap-1">
      <Icon className="h-3.5 w-3.5 shrink-0 text-slate-500" strokeWidth={1.8} />
      <span className="truncate">{label}</span>
    </span>
  );
}
