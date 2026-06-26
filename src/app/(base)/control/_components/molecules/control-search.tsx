import { Search } from "lucide-react";

type ControlSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function ControlSearch({ value, onChange }: ControlSearchProps) {
  return (
    <div className="mt-3 flex h-11 items-center gap-2 rounded-[10px] border border-slate-200 bg-white px-3 text-slate-500">
      <Search className="h-4.5 w-4.5 shrink-0" strokeWidth={2} />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-w-0 flex-1 bg-transparent text-[13px] font-medium outline-none placeholder:text-slate-400"
        placeholder="Улсын дугаараар хайх"
      />
    </div>
  );
}
