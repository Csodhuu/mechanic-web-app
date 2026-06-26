import { Input } from "@/components/ui/input";
import { ChecklistValue } from "@/lib/inspection-checklist";

import { statusOptions } from "../../_types/initial-inspection";

type ChecklistQuestionProps = {
  value: ChecklistValue;
  onChange: (patch: Partial<ChecklistValue>) => void;
};

export function ChecklistQuestion({ value, onChange }: ChecklistQuestionProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
      <p className="text-sm font-medium leading-6 text-slate-900">{value.question}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {statusOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange({ answer: option.value })}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
              value.answer === option.value
                ? option.className
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-100"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {value.answer !== "Regular" && value.answer && (
        <Input
          value={value.description}
          onChange={(event) => onChange({ description: event.target.value })}
          className="mt-3"
          placeholder="Тайлбар, шаардлагатай засвар"
        />
      )}
    </section>
  );
}
