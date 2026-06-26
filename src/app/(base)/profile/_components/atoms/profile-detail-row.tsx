import type { LucideIcon } from "lucide-react";

export function ProfileDetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value?: string | number | boolean | null;
}) {
  return (
    <div className="flex items-start gap-3 border-b border-slate-100 py-3 last:border-b-0">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-slate-400">{label}</p>
        <p className="mt-0.5 truncate text-sm font-semibold text-slate-950">
          {value === true ? "Тийм" : value === false ? "Үгүй" : value || "-"}
        </p>
      </div>
    </div>
  );
}
