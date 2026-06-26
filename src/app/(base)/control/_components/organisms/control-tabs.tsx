import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { controlTabs, OrderState } from "../../_types/control";

type ControlTabsProps = {
  activeState: OrderState;
  counts: Record<OrderState, number>;
  onChange: (state: OrderState) => void;
};

export function ControlTabs({ activeState, counts, onChange }: ControlTabsProps) {
  return (
    <Card className="rounded-[14px] border border-slate-200 bg-white p-3 shadow-sm">
      <div className="grid grid-cols-3 gap-2">
        {controlTabs.map((tab) => {
          const isActive = activeState === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onChange(tab.value)}
              className={cn(
                "rounded-xl border px-2 py-2 text-left transition",
                isActive ? "border-blue-200 bg-blue-50" : "border-slate-200 bg-white hover:bg-slate-50"
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
              <p className="mt-1 text-base font-bold leading-5 text-[#101735] sm:text-[18px]">
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
  );
}
