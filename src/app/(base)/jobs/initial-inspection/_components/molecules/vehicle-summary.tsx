import { MetricCard } from "@/components/page-shell";
import { Card } from "@/components/ui/card";
import { CarFront, CheckCircle2 } from "lucide-react";

type VehicleSummaryProps = {
  licensePlate: string;
  vehicleName: string;
  totals: {
    answered: number;
    total: number;
    progress: number;
  };
};

export function VehicleSummary({ licensePlate, vehicleName, totals }: VehicleSummaryProps) {
  return (
    <section className="grid gap-3 lg:grid-cols-[1fr_280px]">
      <Card className="rounded-2xl border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <CarFront className="size-6" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
              Сонгосон машин
            </p>
            <h2 className="mt-1 truncate text-base font-semibold text-slate-950 sm:text-lg">
              {licensePlate || "Машин сонгогдоогүй"}
            </h2>
            <p className="mt-1 truncate text-sm text-slate-500">
              {vehicleName || "Сонгосон машины мэдээлэл татагдаж байна..."}
            </p>
          </div>
        </div>
      </Card>

      <MetricCard
        label="Дууссан"
        value={`${totals.answered}/${totals.total}`}
        description={`Progress ${totals.progress}%`}
        tone="blue"
        icon={<CheckCircle2 className="size-5" />}
      />
    </section>
  );
}
