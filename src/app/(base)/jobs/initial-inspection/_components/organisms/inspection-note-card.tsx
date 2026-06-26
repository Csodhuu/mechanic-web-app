import { Card } from "@/components/ui/card";

type InspectionNoteCardProps = {
  value: string;
  onChange: (value: string) => void;
};

export function InspectionNoteCard({ value, onChange }: InspectionNoteCardProps) {
  return (
    <Card className="rounded-2xl border-slate-200 bg-white p-4 shadow-sm">
      <label className="text-sm font-semibold text-slate-900" htmlFor="inspection-note">
        Нэмэлт тэмдэглэл
      </label>
      <textarea
        id="inspection-note"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 min-h-24 w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        placeholder="Үзлэгийн ерөнхий тайлбар"
      />
    </Card>
  );
}
