import { cn } from "@/lib/utils";

import {
  getGroupDescription,
  getGroupTitle,
  InspectionGroup,
  summarizeGroup,
} from "../../_types/inspection";
import { AnswerBadge } from "../atoms/answer-badge";

export function InspectionGroupSection({ group }: { group: InspectionGroup }) {
  const summary = summarizeGroup(group.values);
  const hasIssues = summary.warning + summary.danger > 0;

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 bg-slate-50/80 p-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-slate-950">{getGroupTitle(group.type)}</h2>
            <p className="mt-0.5 text-xs leading-5 text-slate-500">
              {getGroupDescription(group.type)}
            </p>
          </div>
          <span
            className={cn(
              "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold",
              hasIssues ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"
            )}
          >
            {hasIssues ? "Шалгах зүйлтэй" : "Хэвийн"}
          </span>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-emerald-50 px-2 py-2 text-center text-emerald-700">
            <p className="text-base font-bold leading-5">{summary.regular}</p>
            <p className="text-[10px] font-medium">Хэвийн</p>
          </div>
          <div className="rounded-xl bg-amber-50 px-2 py-2 text-center text-amber-700">
            <p className="text-base font-bold leading-5">{summary.warning}</p>
            <p className="text-[10px] font-medium">Анхаарах</p>
          </div>
          <div className="rounded-xl bg-rose-50 px-2 py-2 text-center text-rose-700">
            <p className="text-base font-bold leading-5">{summary.danger}</p>
            <p className="text-[10px] font-medium">Яаралтай</p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {group.values.map((value) => (
          <div key={value.question} className="p-3">
            <div className="flex items-start justify-between gap-3">
              <p className="min-w-0 text-sm font-medium leading-5 text-slate-800">
                {value.question}
              </p>
              <AnswerBadge answer={value.answer} />
            </div>
            {value.description && (
              <p className="mt-2 rounded-xl bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-600">
                {value.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
