"use client";

import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ChevronRight,
  ClipboardCheck,
  Clock,
  Funnel,
  Gauge,
  User,
  Wrench,
} from "lucide-react";

const tabs = [
  { label: "Хүлээгдэж буй", count: 3, active: true },
  { label: "Хянаж буй", count: 1, active: false },
  { label: "Дууссан", count: 12, active: false },
];

const orders = [
  {
    orderNo: "A-2024-000123",
    vehicle: "Toyota Land Cruiser 200",
    plate: "1234 УБА",
    km: "128,450 км",
    mechanic: "Бат-Эрдэнэ",
    taskCount: 3,
    tasks: "Ремень солих, Тосны алдагдал оношлох, OBD оношилгоо",
    image: "https://www.pngall.com/wp-content/uploads/2016/05/Toyota-Land-Cruiser-PNG-HD.png",
    status: "QC хүлээж буй",
    statusTone: "green",
    highlighted: true,
  },
  {
    orderNo: "A-2024-000124",
    vehicle: "Toyota Prius 30",
    plate: "5678 УББ",
    km: "98,320 км",
    mechanic: "Сүхбат",
    taskCount: 2,
    tasks: "Тос солих, Тормосны диск солих",
    image: "https://www.pngall.com/wp-content/uploads/5/Toyota-Prius-PNG-Image.png",
    status: "Яаралтай",
    statusTone: "amber",
    highlighted: false,
  },
  {
    orderNo: "A-2024-000125",
    vehicle: "Hyundai Tucson 2018",
    plate: "9012 УВС",
    km: "76,210 км",
    mechanic: "Эрдэнэ",
    taskCount: 3,
    tasks: "Арын тормос шалгах, Тосны алдагдал оношлох, Агаар шүүгч солих",
    image: "https://www.pngall.com/wp-content/uploads/13/Hyundai-Tucson-PNG-Pic.png",
    status: "QC хүлээж буй",
    statusTone: "slate",
    highlighted: false,
  },
];

const statusClass = {
  green: "border-emerald-200 bg-emerald-50 text-emerald-700",
  amber: "border-amber-200 bg-amber-50 text-amber-700",
  slate: "border-slate-200 bg-slate-100 text-slate-600",
};

const dotClass = {
  green: "bg-emerald-500",
  amber: "bg-amber-500",
  slate: "bg-slate-500",
};

function MetaItem({ icon: Icon, label }: { icon: typeof Wrench; label: string }) {
  return (
    <span className="flex min-w-0 items-center gap-1 text-[11px] font-medium leading-4 text-slate-500">
      <Icon className="h-3.5 w-3.5 shrink-0 text-slate-500" strokeWidth={1.8} />
      <span className="truncate">{label}</span>
    </span>
  );
}

function StatusPill({ label, tone }: { label: string; tone: keyof typeof statusClass }) {
  return (
    <span
      className={cn(
        "inline-flex h-7 shrink-0 items-center gap-1.5 rounded-full border px-2.5 text-[11px] font-semibold",
        statusClass[tone]
      )}
    >
      {tone === "amber" ? (
        <Clock className="h-3.5 w-3.5" strokeWidth={1.9} />
      ) : (
        <span className={cn("h-2 w-2 rounded-full", dotClass[tone])} />
      )}
      {label}
    </span>
  );
}

function InspectionCard({ order }: { order: (typeof orders)[number] }) {
  return (
    <article
      className={cn(
        "rounded-[15px] border bg-white p-3.5 shadow-sm",
        order.highlighted
          ? "border-blue-600 shadow-[0_12px_28px_rgba(37,99,235,0.12)]"
          : "border-slate-200"
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <h2 className="max-w-[55%] text-[20px] font-bold leading-6 text-[#101735]">
          {order.orderNo}
        </h2>
        <StatusPill label={order.status} tone={order.statusTone as keyof typeof statusClass} />
      </div>

      <div className="grid grid-cols-[96px_minmax(0,1fr)_18px] items-center gap-2">
        <div
          aria-label={order.vehicle}
          role="img"
          className="h-[64px] bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${order.image})` }}
        ></div>

        <div className="min-w-0">
          <h3 className="truncate text-[17px] font-bold leading-6 text-[#121a3a]">
            {order.vehicle}
          </h3>
          <div className="mt-1 grid grid-cols-2 gap-x-2 gap-y-1.5">
            <MetaItem icon={Wrench} label={order.plate} />
            <MetaItem icon={Gauge} label={order.km} />
            <span className="col-span-2">
              <MetaItem icon={User} label={`Механик: ${order.mechanic}`} />
            </span>
          </div>
        </div>

        {!order.highlighted && (
          <ChevronRight className="h-6 w-6 text-slate-500" strokeWidth={2.1} />
        )}
      </div>

      <div className="mt-3 border-t border-slate-200 pt-3">
        <div className="grid grid-cols-[46px_minmax(0,1fr)] gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <ClipboardCheck className="h-6 w-6" strokeWidth={2} />
          </span>
          <div className="min-w-0">
            <p className="text-[15px] font-bold leading-5 text-[#101735]">
              {order.taskCount} ажил QC-д бэлэн
            </p>
            <p className="mt-1 line-clamp-2 text-[13px] leading-5 text-slate-500">{order.tasks}</p>
          </div>
        </div>
      </div>

      {order.highlighted && (
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="h-11 rounded-[7px] border-2 border-blue-600 bg-white text-[14px] font-semibold text-blue-600"
          >
            Дэлгэрэнгүй
          </button>
          <button
            type="button"
            className="h-11 rounded-[7px] bg-blue-600 text-[14px] font-semibold text-white shadow-[0_8px_18px_rgba(37,99,235,0.22)]"
          >
            Хяналт эхлүүлэх
          </button>
        </div>
      )}
    </article>
  );
}

export default function Control() {
  return (
    <>
      <main className="mx-auto min-h-[calc(100svh-8rem)] w-full max-w-[430px] bg-white px-4 pb-3 pt-2 sm:hidden">
        <header className="mb-5 pt-[env(safe-area-inset-top)]">
          <div className="grid h-14 grid-cols-[48px_1fr_48px] items-center">
            <button
              type="button"
              aria-label="Буцах"
              className="flex h-11 w-11 items-center justify-center text-blue-600"
            >
              <ArrowLeft className="h-8 w-8" strokeWidth={2.4} />
            </button>
            <div className="min-w-0 text-center">
              <h1 className="truncate text-[20px] font-bold leading-6 text-[#101735]">
                Хяналтын инженер
              </h1>
              <p className="truncate text-[13px] font-medium text-slate-500">
                Хяналт хүлээж буй ажлууд
              </p>
            </div>
            <button
              type="button"
              aria-label="Шүүлтүүр"
              className="ml-auto flex h-11 w-11 items-center justify-center text-blue-600"
            >
              <Funnel className="h-7 w-7" strokeWidth={2.2} />
            </button>
          </div>
        </header>

        <div className="mb-4 grid grid-cols-3 overflow-hidden rounded-[10px] border border-slate-200 bg-white">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              type="button"
              className={cn(
                "flex h-[52px] min-w-0 items-center justify-center gap-1.5 border-r border-slate-200 px-1 text-[13px] font-semibold leading-4 last:border-r-0",
                tab.active ? "bg-blue-600 text-white" : "bg-white text-slate-500"
              )}
            >
              <span className="min-w-0 text-center">{tab.label}</span>
              <span
                className={cn(
                  "inline-flex h-6 min-w-6 shrink-0 items-center justify-center rounded-full px-1.5 text-[13px] font-bold",
                  tab.active ? "bg-white/25 text-white" : "bg-slate-100 text-slate-500"
                )}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <section className="space-y-3">
          {orders.map((order) => (
            <InspectionCard key={order.orderNo} order={order} />
          ))}
        </section>
      </main>

      <div className="hidden min-h-[60svh] place-items-center sm:grid">
        <div className="max-w-sm rounded-2xl border border-slate-200 bg-white p-5 text-center text-sm font-medium text-slate-500 shadow-sm">
          Хяналтын хуудас одоогоор зөвхөн утасны дэлгэц дээр харагдана.
        </div>
      </div>
    </>
  );
}
