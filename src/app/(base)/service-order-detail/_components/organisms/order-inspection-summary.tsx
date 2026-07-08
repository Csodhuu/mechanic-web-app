"use client";

import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { apiClient } from "@/lib/authClient";
import { cn } from "@/lib/utils";
import { getCookie } from "cookies-next";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  ClipboardCheck,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import {
  employeeName,
  formatInspectionDate,
  InspectionItem,
} from "@/app/(base)/inspection/_types/inspection";
import { InspectionGroupSection } from "@/app/(base)/inspection/_components/molecules/inspection-group-section";

type InspectionCounts = {
  danger: number;
  regular: number;
  warning: number;
};

const emptyCounts: InspectionCounts = {
  danger: 0,
  regular: 0,
  warning: 0,
};

type InspectionResult = {
  licensePlate: string;
  item: InspectionItem | null;
};

const countInspectionAnswers = (item: InspectionItem | null): InspectionCounts => {
  if (!item?.inspection.inspection) return emptyCounts;

  return item.inspection.inspection.reduce(
    (summary, group) => {
      group.values.forEach((value) => {
        if (value.answer === "Danger") summary.danger += 1;
        if (value.answer === "Regular") summary.regular += 1;
        if (value.answer === "Warning") summary.warning += 1;
      });
      return summary;
    },
    { ...emptyCounts }
  );
};

export function OrderInspectionSummary({ licensePlate }: { licensePlate?: string | null }) {
  const [inspectionResult, setInspectionResult] = useState<InspectionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const normalizedLicensePlate = licensePlate?.trim() ?? "";

  useEffect(() => {
    let isMounted = true;

    if (!normalizedLicensePlate) return;

    const loadInspection = async () => {
      try {
        setIsLoading(true);
        const token = getCookie("token");
        if (!token) return;

        const response = await apiClient.api.crm.inspection.get({
          query: {
            licensePlate: normalizedLicensePlate,
            pagination: { page: 1, size: 1 },
          },
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!isMounted) return;
        setInspectionResult({
          licensePlate: normalizedLicensePlate,
          item: response.data?.result?.[0] ?? null,
        });
      } catch (error) {
        console.error("Failed to fetch order inspection summary:", error);
        if (isMounted) {
          setInspectionResult({ licensePlate: normalizedLicensePlate, item: null });
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    void loadInspection();

    return () => {
      isMounted = false;
    };
  }, [normalizedLicensePlate]);

  const inspection =
    inspectionResult?.licensePlate === normalizedLicensePlate ? inspectionResult.item : null;
  const isSummaryLoading = Boolean(normalizedLicensePlate) && isLoading;
  const counts = useMemo(() => countInspectionAnswers(inspection), [inspection]);
  const total = counts.danger + counts.regular + counts.warning;

  return (
    <>
      <Card
        role={inspection ? "button" : undefined}
        tabIndex={inspection ? 0 : undefined}
        className={cn(
          "gap-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 shadow-sm",
          inspection && "cursor-pointer transition hover:border-blue-200 hover:shadow-md"
        )}
        onClick={() => inspection && setOpen(true)}
        onKeyDown={(event) => {
          if (!inspection) return;
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setOpen(true);
          }
        }}
      >
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <ClipboardCheck className="size-4" />
              </span>
              <div className="min-w-0">
                <h2 className="truncate text-sm font-bold text-slate-950">Анхан үзлэгийн дүн</h2>
                <p className="truncate text-xs text-slate-500">
                  {isSummaryLoading
                    ? "Уншиж байна..."
                    : inspection
                      ? `${formatInspectionDate(inspection.inspection.createdAt)} · ${employeeName(inspection)}`
                      : "Анхан үзлэг олдсонгүй"}
                </p>
              </div>
            </div>
          </div>
          {inspection && <ChevronRight className="size-4 shrink-0 text-slate-300" />}
        </div>

        <div className="grid grid-cols-3 gap-2 p-3">
          <InspectionStatusCount
            icon={CircleAlert}
            label="Warning"
            value={counts.warning}
            className="bg-amber-50 text-amber-700"
          />
          <InspectionStatusCount
            icon={CheckCircle2}
            label="Regular"
            value={counts.regular}
            className="bg-emerald-50 text-emerald-700"
          />
          <InspectionStatusCount
            icon={AlertTriangle}
            label="Danger"
            value={counts.danger}
            className="bg-rose-50 text-rose-700"
          />
        </div>

        <div className="border-t border-slate-100 px-4 py-2 text-xs text-slate-500">
          Нийт {total} checklist мөр
        </div>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        {inspection && (
          <DialogContent className="max-h-[85svh] overflow-y-auto p-0 sm:max-w-2xl">
            <DialogHeader>
              <div className="border-b border-slate-100 p-4 pb-3">
                <DialogTitle>{inspection.inspection.licensePlate} - Анхан үзлэг</DialogTitle>
                <DialogDescription>
                  Warning {counts.warning}, Regular {counts.regular}, Danger {counts.danger}
                </DialogDescription>
              </div>
            </DialogHeader>
            <div className="space-y-3 p-4">
              {inspection.inspection.description && (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold text-slate-400">Тэмдэглэл</p>
                  <p className="mt-1 text-sm leading-6 text-slate-700">
                    {inspection.inspection.description}
                  </p>
                </div>
              )}

              {inspection.inspection.inspection?.map((group) => (
                <InspectionGroupSection key={group.type} group={group} />
              ))}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}

function InspectionStatusCount({
  className,
  icon: Icon,
  label,
  value,
}: {
  className: string;
  icon: typeof CheckCircle2;
  label: string;
  value: number;
}) {
  return (
    <div className={cn("rounded-xl px-2 py-2.5 text-center", className)}>
      <Icon className="mx-auto mb-1 size-4" />
      <p className="text-lg font-bold leading-5">{value}</p>
      <p className="mt-0.5 text-[10px] font-semibold uppercase leading-3">{label}</p>
    </div>
  );
}
