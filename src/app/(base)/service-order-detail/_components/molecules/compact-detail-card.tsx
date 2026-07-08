import { Car, ChevronRight } from "lucide-react";

type CompactDetailCardProps = {
  icon: typeof Car;
  title: string;
  primary: string | null;
  secondary: string;
  onClick: () => void;
};

export function CompactDetailCard({
  icon: Icon,
  title,
  primary,
  secondary,
  onClick,
}: CompactDetailCardProps) {
  return (
    <button
      type="button"
      className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left shadow-sm transition hover:border-blue-200 hover:bg-blue-50/40"
      onClick={onClick}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-blue-600">
        <Icon className="size-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-medium text-slate-500">{title}</span>
        <span className="mt-0.5 block truncate text-sm font-semibold text-slate-900">
          {primary ?? "-"}
        </span>
        <span className="mt-0.5 block truncate text-xs text-slate-500">{secondary}</span>
      </span>
      <ChevronRight className="size-4 shrink-0 text-slate-300" />
    </button>
  );
}
