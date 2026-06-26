import { CalendarDays } from "lucide-react";
import type { HistoryGroup } from "../../_types/history";
import { HistoryOrderRow } from "../molecules/history-order-row";

export function HistoryList({
  groups,
  onOpen,
}: {
  groups: HistoryGroup[];
  onOpen: (id: string) => void;
}) {
  return (
    <>
      {groups.map((group) => (
        <section key={group.group} className="space-y-2">
          <div className="flex items-center gap-2">
            <CalendarDays className="size-4 text-slate-400" />
            <h2 className="text-sm font-semibold text-slate-700">{group.group}</h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
            {group.items.map((item) => (
              <HistoryOrderRow key={item.order.id} item={item} onOpen={onOpen} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
