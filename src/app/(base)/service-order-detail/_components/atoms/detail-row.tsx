export function DetailRow({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 py-3 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="max-w-[60%] text-right text-sm font-medium text-slate-900">
        {value ?? "-"}
      </span>
    </div>
  );
}
