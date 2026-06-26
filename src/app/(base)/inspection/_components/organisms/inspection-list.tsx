import { cn } from "@/lib/utils";
import { CalendarDays, CarFront, ClipboardCheck, UserRound } from "lucide-react";

import {
  employeeName,
  formatInspectionDate,
  InspectionItem,
  statusStyle,
} from "../../_types/inspection";

type InspectionListProps = {
  items: InspectionItem[];
  onSelect: (item: InspectionItem) => void;
};

export function InspectionList({ items, onSelect }: InspectionListProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      {items.map((item) => {
        const resultCount =
          item.inspection.inspection?.reduce((sum, group) => sum + group.values.length, 0) ?? 0;
        const badge = statusStyle[item.inspection.status];

        return (
          <button
            key={item.inspection.id}
            type="button"
            onClick={() => onSelect(item)}
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
              <span
                className={cn(
                  "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1",
                  badge.className
                )}
              >
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
                {formatInspectionDate(item.inspection.createdAt)}
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
  );
}
