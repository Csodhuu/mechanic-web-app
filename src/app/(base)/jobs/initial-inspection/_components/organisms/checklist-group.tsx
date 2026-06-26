import { Card } from "@/components/ui/card";
import { ChecklistValue } from "@/lib/inspection-checklist";

import {
  getChecklistGroupDescription,
  getChecklistGroupTitle,
} from "../../_types/initial-inspection";
import { ChecklistQuestion } from "../molecules/checklist-question";

type ChecklistGroupProps = {
  group: {
    type: string;
    values: ChecklistValue[];
  };
  groupIndex: number;
  onValueChange: (groupIndex: number, valueIndex: number, patch: Partial<ChecklistValue>) => void;
};

export function ChecklistGroup({ group, groupIndex, onValueChange }: ChecklistGroupProps) {
  return (
    <Card className="rounded-2xl border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-950 sm:text-base">
            {getChecklistGroupTitle(group.type)}
          </h2>
          <p className="mt-0.5 text-sm text-slate-500">
            {getChecklistGroupDescription(group.type)}
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {group.values.filter((value) => Boolean(value.answer)).length}/{group.values.length}
        </span>
      </div>

      <div className="mt-4 space-y-4">
        {group.values.map((value, valueIndex) => (
          <ChecklistQuestion
            key={value.question}
            value={value}
            onChange={(patch) => onValueChange(groupIndex, valueIndex, patch)}
          />
        ))}
      </div>
    </Card>
  );
}
