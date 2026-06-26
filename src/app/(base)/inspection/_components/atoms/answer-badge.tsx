import { cn } from "@/lib/utils";
import { CircleAlert } from "lucide-react";

import { answerStyle } from "../../_types/inspection";

export function AnswerBadge({ answer }: { answer: string }) {
  const meta = answerStyle[answer] ?? {
    label: answer || "Оруулаагүй",
    className: "border-slate-200 bg-slate-100 text-slate-600",
    icon: CircleAlert,
  };
  const Icon = meta.icon;

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold",
        meta.className
      )}
    >
      <Icon className="size-3.5" />
      {meta.label}
    </span>
  );
}
