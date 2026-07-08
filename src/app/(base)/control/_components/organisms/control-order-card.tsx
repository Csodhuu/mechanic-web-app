import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

import { getVehicleName, OrderItem, stateStyle } from "../../_types/control";

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
  const mileage = item.vehicle?.km ?? item.order.km ?? "-";
  const actionLabel =
    item.order.state === "CREATED"
      ? "Засвар эхлүүлэх"
      : item.order.state === "PROGRESSING"
        ? "Засвар дуусгах"
        : "Дууссан";

  return (
    <Card className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="truncate text-base font-bold leading-6 text-slate-950">
            {item.vehicle?.licensePlate ?? item.order.orderId}
          </h2>
          <p className="mt-0.5 truncate text-xs text-slate-500">{getVehicleName(item)}</p>
        </div>
        <span
          className={cn(
            "inline-flex shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-semibold",
            stateBadge.className
          )}
        >
          {stateBadge.label}
        </span>
      </div>

      <div className="mt-2 flex min-w-0 items-center gap-2 text-xs text-slate-500">
        <span className="truncate">{item.order.orderId}</span>
        <span className="h-1 w-1 shrink-0 rounded-full bg-slate-300" />
        <span className="shrink-0">{mileage} км</span>
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
            {mutating ? "Эхлүүлж байна..." : actionLabel}
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
          <div className="flex-1 rounded-lg bg-emerald-50 px-3 py-2 text-center text-xs font-semibold text-emerald-700">
            Дууссан
          </div>
        )}
      </div>
    </Card>
  );
}
