import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CalendarClock, CarFront, ChevronRight, Clock3, ShieldCheck } from "lucide-react";

import {
  formatControlDate,
  getCustomerName,
  getVehicleName,
  OrderItem,
  stateStyle,
} from "../../_types/control";
import { ControlMeta } from "../atoms/control-meta";

type ControlOrderCardProps = {
  item: OrderItem;
  mutating: boolean;
  onOpenDetail: (id: string) => void;
  onStartControl: (item: OrderItem) => void;
  onCompleteControl: (item: OrderItem) => void;
};

export function ControlOrderCard({
  item,
  mutating,
  onOpenDetail,
  onStartControl,
  onCompleteControl,
}: ControlOrderCardProps) {
  const stateBadge = stateStyle[item.order.state];
  const StateIcon = stateBadge.icon;
  const actionLabel =
    item.order.state === "CREATED"
      ? "Хяналт эхлүүлэх"
      : item.order.state === "PROGRESSING"
        ? "Дуусгах"
        : "Дууссан";

  return (
    <Card className="rounded-[15px] border border-slate-200 bg-white p-3.5 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h2 className="truncate text-base font-bold leading-6 text-[#101735] sm:text-[18px]">
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
            <ControlMeta label={item.vehicle?.licensePlate ?? "-"} icon={ShieldCheck} />
            <ControlMeta label={`${item.vehicle?.km ?? item.order.km} км`} icon={CalendarClock} />
            <ControlMeta label={getCustomerName(item)} icon={CarFront} />
            <ControlMeta label={formatControlDate(item.order.createdAt)} icon={Clock3} />
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
          onClick={() => onOpenDetail(item.order.id)}
        >
          Дэлгэрэнгүй
          <ChevronRight className="h-4 w-4" />
        </Button>
        {item.order.state === "CREATED" && (
          <Button
            type="button"
            size="sm"
            className="flex-1"
            disabled={mutating}
            onClick={() => onStartControl(item)}
          >
            {mutating ? "Шилжиж байна..." : actionLabel}
          </Button>
        )}
        {item.order.state === "PROGRESSING" && (
          <Button
            type="button"
            size="sm"
            className="flex-1"
            disabled={mutating}
            onClick={() => onCompleteControl(item)}
          >
            {mutating ? "Дуусгаж байна..." : actionLabel}
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
}
