import { cn } from "@/lib/utils";
import { CheckCircle2, ChevronRight, Clock3, Gauge, User } from "lucide-react";
import {
  formatHistoryTime,
  getHistoryCustomerName,
  getHistoryVehicleName,
  type HistoryOrderItem,
} from "../../_types/history";

export function HistoryOrderRow({
  item,
  onOpen,
}: {
  item: HistoryOrderItem;
  onOpen: (id: string) => void;
}) {
  const completedAt = item.order.timeCompleted ?? item.order.updatedAt;

  return (
    <button
      type="button"
      onClick={() => onOpen(item.order.id)}
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
          {getHistoryVehicleName(item)} · {item.vehicle?.licensePlate ?? "-"}
        </span>
        <span className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <User className="size-3.5" />
            {getHistoryCustomerName(item)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Gauge className="size-3.5" />
            {item.vehicle?.km ?? item.order.km ?? "-"} км
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock3 className="size-3.5" />
            {formatHistoryTime(completedAt)}
          </span>
        </span>
      </span>
      <ChevronRight className={cn("size-4 text-slate-300")} />
    </button>
  );
}
