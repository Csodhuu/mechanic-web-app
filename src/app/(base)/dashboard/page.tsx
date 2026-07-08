"use client";

import { PageShell, EmptyState } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/authClient";
import { CpOrderQuery } from "../jobs/_types/cp-order";
import { getCookie } from "cookies-next";
import {
  ArrowRight,
  CarFront,
  ClipboardList,
  History as HistoryIcon,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type OrderItem = CpOrderQuery["result"][number];

const stateLabel: Record<OrderItem["order"]["state"], string> = {
  CREATED: "Үүссэн",
  PROGRESSING: "Хийгдэж буй",
  COMPLETE: "Дууссан",
};

function getVehicleName(item: OrderItem) {
  return [item.make?.name, item.model?.name].filter(Boolean).join(" ") || "Машины мэдээлэлгүй";
}

export default function Dashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        if (mounted) {
          setLoading(true);
          setError(null);
        }

        const token = getCookie("token");
        if (!token) {
          if (mounted) setError("Нэвтрэх token олдсонгүй.");
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };
        const [createdRes, progressingRes, completeRes] = await Promise.all([
          apiClient.api.crm["cp-order"].get({
            query: { state: "CREATED", pagination: { page: 1, size: 5 } },
            headers,
          }),
          apiClient.api.crm["cp-order"].get({
            query: { state: "PROGRESSING", pagination: { page: 1, size: 5 } },
            headers,
          }),
          apiClient.api.crm["cp-order"].get({
            query: { state: "COMPLETE", pagination: { page: 1, size: 5 } },
            headers,
          }),
        ]);

        if (mounted) {
          const recent = [
            ...(progressingRes.data?.result ?? []),
            ...(createdRes.data?.result ?? []),
            ...(completeRes.data?.result ?? []),
          ]
            .filter(
              (item, index, all) =>
                all.findIndex((other) => other.order.id === item.order.id) === index
            )
            .slice(0, 6);

          setOrders(recent);
        }
      } catch (fetchError) {
        console.error("Failed to load dashboard data:", fetchError);
        if (mounted) setError("Dashboard мэдээлэл уншихад алдаа гарлаа.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    void load();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <PageShell
      eyebrow="Dashboard"
      title="Сайн байна уу"
      action={
        <Button
          type="button"
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => router.push("/jobs")}
        >
          <ClipboardList className="size-4" />
          Ажил руу орох
        </Button>
      }
      contentClassName="space-y-5"
    >
      <section className="grid gap-2 sm:grid-cols-3">
        {[
          {
            title: "Оношлогоо",
            icon: Wrench,
            onClick: () => router.push("/jobs"),
          },
          {
            title: "Засвар үйлчилгээ",
            icon: ShieldCheck,
            onClick: () => router.push("/control"),
          },
          {
            title: "Түүх",
            icon: HistoryIcon,
            onClick: () => router.push("/history"),
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.title}
              type="button"
              onClick={item.onClick}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left shadow-sm transition hover:border-blue-200 hover:bg-blue-50/40"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-blue-600">
                <Icon className="size-4" />
              </span>
              <span className="truncate text-sm font-semibold text-slate-950">{item.title}</span>
            </button>
          );
        })}
      </section>

      <section className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <div>
            <h2 className="text-base font-semibold text-slate-950">Сүүлийн ажлууд</h2>
          </div>
          <Button type="button" variant="ghost" onClick={() => router.push("/jobs")}>
            Бүгд
            <ArrowRight className="size-4" />
          </Button>
        </div>

        {loading && <RecentOrdersSkeleton />}

        {!loading && error && (
          <div className="px-4 py-10">
            <EmptyState title="Мэдээлэл алдаатай" description={error} />
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="px-4 py-10">
            <EmptyState
              title="Одоогоор ажил алга"
              description="Шинэ анхан үзлэг эхлүүлбэл энд жагсаалтад харагдана."
            />
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="divide-y divide-slate-100">
            {orders.map((item) => (
              <button
                key={item.order.id}
                type="button"
                onClick={() =>
                  router.push(`/service-order-detail?id=${encodeURIComponent(item.order.id)}`)
                }
                className="flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-slate-50"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <CarFront className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="truncate text-sm font-semibold text-slate-950">
                      {item.order.orderId}
                    </h3>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                      {stateLabel[item.order.state]}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-sm text-slate-500">
                    {item.vehicle?.licensePlate ?? getVehicleName(item)}
                  </p>
                </div>
                <ArrowRight className="mt-2 size-4 shrink-0 text-slate-300" />
              </button>
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
function RecentOrdersSkeleton() {
  return (
    <div className="divide-y divide-slate-100">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="flex animate-pulse items-start gap-3 px-4 py-3">
          <div className="h-11 w-11 shrink-0 rounded-2xl bg-slate-100" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-3.5 w-32 rounded-full bg-slate-100" />
            <div className="h-3 w-44 max-w-full rounded-full bg-slate-100" />
            <div className="flex flex-wrap gap-2">
              <div className="h-3 w-24 rounded-full bg-slate-100" />
              <div className="h-3 w-20 rounded-full bg-slate-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
