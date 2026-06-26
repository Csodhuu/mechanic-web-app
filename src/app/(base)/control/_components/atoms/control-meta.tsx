import { ShieldCheck } from "lucide-react";

export function ControlMeta({
  icon: Icon,
  label,
}: {
  icon: typeof ShieldCheck;
  label: string;
}) {
  return (
    <span className="flex min-w-0 items-center gap-1">
      <Icon className="h-3.5 w-3.5 shrink-0 text-slate-500" strokeWidth={1.8} />
      <span className="truncate">{label}</span>
    </span>
  );
}
