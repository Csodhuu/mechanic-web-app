"use client";

import { PageShell, EmptyState, MetricCard } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/authClient";
import { CpOrderQuery } from "../jobs/_types/cp-order";
import { getCookie } from "cookies-next";
import {
  ArrowRight,
  CalendarClock,
  CarFront,
  ClipboardList,
  History as HistoryIcon,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export type MeQuery = NonNullable<
  Awaited<ReturnType<typeof import("@/lib/authClient").apiClient.api.user.me.get>>["data"]
>;

type OrderItem = CpOrderQuery["result"][number];

const stateLabel: Record<OrderItem["order"]["state"], string> = {
  CREATED: "Шинэ",
  PROGRESSING: "Хийгдэж байна",
  COMPLETE: "Дууссан",
};

function getCustomerName(item: OrderItem) {
  return [item.customer?.lastname, item.customer?.firstname].filter(Boolean).join(" ") || item.customer?.phoneNumber || "-";
}

function getVehicleName(item: OrderItem) {
  return [item.make?.name, item.model?.name].filter(Boolean).join(" ") || "Машины мэдээлэлгүй";
}

function formatDate(value?: string | null) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("mn-MN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function Dashboard() {
  const router = useRouter();
  const [me, setMe] = useState<MeQuery | null>(null);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [totals, setTotals] = useState<Record<OrderItem["order"]["state"], number>>({
    CREATED: 0,
    PROGRESSING: 0,
    COMPLETE: 0,
  });
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
        const [meRes, createdRes, progressingRes, completeRes] = await Promise.all([
          apiClient.api.user.me.get(),
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
          setMe(meRes.data ?? null);
          setTotals({
            CREATED: createdRes.data?.totalCount ?? 0,
            PROGRESSING: progressingRes.data?.totalCount ?? 0,
            COMPLETE: completeRes.data?.totalCount ?? 0,
          });

          const recent = [
            ...(progressingRes.data?.result ?? []),
            ...(createdRes.data?.result ?? []),
            ...(completeRes.data?.result ?? []),
          ]
            .filter((item, index, all) => all.findIndex((other) => other.order.id === item.order.id) === index)
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

  const greeting = useMemo(() => {
    if (!me?.name) return "Сайн байна уу";
    return `Сайн байна уу, ${me.name}`;
  }, [me?.name]);

  return (
    <PageShell
      eyebrow="Dashboard"
      title={greeting}
      description="Өнөөдрийн үзлэг, засвар, хяналтын ажлуудаа нэг дор хяна."
      action={
        <Button type="button" variant="outline" onClick={() => router.push("/jobs")}>
          <ClipboardList className="size-4" />
          Ажил руу орох
        </Button>
      }
      contentClassName="space-y-5"
    >
      <section className="grid gap-3 sm:grid-cols-3">
        <MetricCard
          label="Хүлээгдэж буй"
          value={String(totals.CREATED)}
          description="Шинээр орж ирсэн ажлууд"
          tone="amber"
          icon={<CarFront className="size-5" />}
        />
        <MetricCard
          label="Хяналтанд буй"
          value={String(totals.PROGRESSING)}
          description="Одоогоор идэвхтэй ажиллаж буй"
          tone="blue"
          icon={<ShieldCheck className="size-5" />}
        />
        <MetricCard
          label="Дууссан"
          value={String(totals.COMPLETE)}
          description="Архивлагдсан ажлууд"
          tone="emerald"
          icon={<HistoryIcon className="size-5" />}
        />
      </section>

      <section className="grid gap-3 lg:grid-cols-[1fr_auto]">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-slate-950">Түргэн үйлдэл</h2>
              <p className="mt-0.5 text-sm text-slate-500">Ихэнх workflow-ийг эндээс шууд эхлүүлнэ.</p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              {
                title: "Анхан үзлэг",
                detail: "Улсын дугаараар машин сонгоод үзлэг эхлүүлнэ.",
                icon: Wrench,
                onClick: () => router.push("/jobs"),
              },
              {
                title: "Хяналт",
                detail: "Шилжсэн ажлуудыг шалгаж, дуусгасан гэж тэмдэглэнэ.",
                icon: ShieldCheck,
                onClick: () => router.push("/control"),
              },
              {
                title: "Түүх",
                detail: "Дууссан засварууд болон хугацааг харах.",
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
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-blue-200 hover:bg-blue-50/60"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
                    <Icon className="size-5" />
                  </span>
                  <p className="mt-3 text-sm font-semibold text-slate-950">{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">{item.detail}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-slate-950 p-4 text-white shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
            Today
          </p>
          <h2 className="mt-2 text-base font-semibold sm:text-lg">Одоогийн ажлын тойм</h2>
          <p className="mt-1 text-sm leading-6 text-slate-300">
            Өнөөдрийн урсгал: үзлэг -&gt; хяналт -&gt; дуусгах.
          </p>

          <div className="mt-4 space-y-3">
            {[
              { label: "Үзлэг рүү", value: "Шинэ машин бүртгэнэ" },
              { label: "Хяналт руу", value: "Шалгалтын дараах шилжилт" },
              { label: "Түүх рүү", value: "Дууссан ажлыг архивлана" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <p className="text-xs font-semibold text-slate-300">{item.label}</p>
                <p className="mt-1 text-sm text-slate-100">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <div>
            <h2 className="text-base font-semibold text-slate-950">Сүүлийн ажлууд</h2>
            <p className="mt-0.5 text-sm text-slate-500">Хамгийн сүүлд орсон order-ууд.</p>
          </div>
          <Button type="button" variant="ghost" onClick={() => router.push("/service-order-detail")}>
            Бүгд
            <ArrowRight className="size-4" />
          </Button>
        </div>

        {loading && (
          <div className="px-4 py-10 text-center text-sm text-slate-500">Мэдээлэл уншиж байна...</div>
        )}

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
                onClick={() => router.push(`/service-order-detail?id=${encodeURIComponent(item.order.id)}`)}
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
                  <p className="mt-1 truncate text-sm text-slate-500">{getVehicleName(item)}</p>
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
                    <span>{getCustomerName(item)}</span>
                    <span className="inline-flex items-center gap-1">
                      <CalendarClock className="size-3.5" />
                      {formatDate(item.order.createdAt)}
                    </span>
                    <span className="font-medium text-slate-700">
                      {item.vehicle?.licensePlate ?? "-"}
                    </span>
                  </div>
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
