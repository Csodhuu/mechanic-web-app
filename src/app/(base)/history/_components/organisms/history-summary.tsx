import { MetricCard } from "@/components/page-shell";
import { CheckCircle2, ReceiptText } from "lucide-react";

export function HistorySummary({
  totalCount,
  visibleCount,
}: {
  totalCount: number;
  visibleCount: number;
}) {
  return (
    <section className="grid gap-3 sm:grid-cols-2">
      <MetricCard
        label="Нийт"
        value={String(totalCount)}
        description="Дууссан захиалга"
        tone="blue"
        icon={<ReceiptText className="size-5" />}
      />
      <MetricCard
        label="Ажлын тоо"
        value={String(visibleCount)}
        description="Энэ хуудсанд харагдаж буй"
        tone="emerald"
        icon={<CheckCircle2 className="size-5" />}
      />
      <MetricCard
        label="Архив"
        value="Идэвхтэй"
        description="Дууссан ажлын бүртгэл"
        tone="amber"
        icon={<ReceiptText className="size-5" />}
      />
    </section>
  );
}
