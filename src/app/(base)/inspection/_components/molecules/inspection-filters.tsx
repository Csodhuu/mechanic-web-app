import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

import { inspectionFilters, Status } from "../../_types/inspection";

type InspectionFiltersProps = {
  filter: Status | "ALL";
  search: string;
  onFilterChange: (value: Status | "ALL") => void;
  onSearchChange: (value: string) => void;
};

export function InspectionFilters({
  filter,
  search,
  onFilterChange,
  onSearchChange,
}: InspectionFiltersProps) {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row">
        <label className="relative block min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            className="pl-9"
            placeholder="Улсын дугаараар хайх"
          />
        </label>
        <div className="flex gap-2 overflow-x-auto">
          {inspectionFilters.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onFilterChange(option.value)}
              className={cn(
                "h-10 shrink-0 rounded-full px-3 text-xs font-semibold transition",
                filter === option.value
                  ? "bg-slate-950 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
