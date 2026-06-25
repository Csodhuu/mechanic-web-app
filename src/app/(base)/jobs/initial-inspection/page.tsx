"use client";

import { PageShell, MetricCard } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/authClient";
import {
  createInitialInspectionChecklist,
  type ChecklistStatus,
  type ChecklistValue,
} from "@/lib/inspection-checklist";
import { getCookie } from "cookies-next";
import { ArrowLeft, CarFront, CheckCircle2, ClipboardCheck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

const statusOptions: { value: ChecklistStatus; label: string; className: string }[] = [
  { value: "Regular", label: "Хэвийн", className: "border-emerald-200 bg-emerald-50 text-emerald-700" },
  { value: "Warning", label: "Анхаарах", className: "border-amber-200 bg-amber-50 text-amber-700" },
  { value: "Danger", label: "Яаралтай", className: "border-rose-200 bg-rose-50 text-rose-700" },
];

export default function InitialInspectionPage() {
  const router = useRouter();
  const licensePlate = useSearchParams().get("licensePlate")?.trim() ?? "";
  const [checklist, setChecklist] = useState(createInitialInspectionChecklist);
  const [description, setDescription] = useState("");
  const [vehicleName, setVehicleName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!licensePlate) return;
    void apiClient.api.crm.vehicle
      .get({ query: { licensePlate } })
      .then((response) => {
        if (response.data) {
          setVehicleName([response.data.mark_name, response.data.model_name].filter(Boolean).join(" "));
        }
      })
      .catch((error) => console.error("Failed to load selected vehicle:", error));
  }, [licensePlate]);

  const updateValue = (groupIndex: number, valueIndex: number, patch: Partial<ChecklistValue>) => {
    setChecklist((current) =>
      current.map((group, index) =>
        index !== groupIndex
          ? group
          : {
              ...group,
              values: group.values.map((value, itemIndex) =>
                itemIndex === valueIndex ? { ...value, ...patch } : value
              ),
            }
      )
    );
  };

  const totals = useMemo(() => {
    const total = checklist.reduce((sum, group) => sum + group.values.length, 0);
    const answered = checklist.reduce(
      (sum, group) => sum + group.values.filter((value) => Boolean(value.answer)).length,
      0
    );
    return { total, answered, progress: total ? Math.round((answered / total) * 100) : 0 };
  }, [checklist]);

  const submitInspection = async () => {
    if (!licensePlate) {
      toast.error("Улсын дугаар олдсонгүй.");
      return;
    }
    if (checklist.some((group) => group.values.some((value) => !value.answer))) {
      toast.error("Бүх шалгах зүйлд үр дүн оруулна уу.");
      return;
    }

    try {
      setIsSaving(true);
      const token = getCookie("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
      const inspectionResponse = await apiClient.api.crm.inspection.post(
        {
          licensePlate,
          description: description.trim() || undefined,
          inspection: checklist,
        },
        { headers }
      );
      if (inspectionResponse.error || !inspectionResponse.data) throw inspectionResponse.error;

      const serviceOrderResponse = await apiClient.api.crm.inspection({ id: inspectionResponse.data.id })[
        "service-order"
      ].post({}, { headers });
      if (serviceOrderResponse.error || !serviceOrderResponse.data) throw serviceOrderResponse.error;

      toast.success("Үзлэг баталгаажлаа. Захиалга үүсгэгдлээ.");
      router.replace(`/service-order-detail?id=${encodeURIComponent(serviceOrderResponse.data.cpOrderId)}`);
    } catch (error) {
      console.error("Failed to create service order from inspection:", error);
      toast.error("Үзлэгээс захиалга үүсгэхэд алдаа гарлаа.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <PageShell
      eyebrow="Jobs / Анхан үзлэг"
      title="Анхан үзлэг"
      description="Сонгосон машин дээр ерөнхий болон техникийн checklist бөглөж, хяналт руу шилжүүлэх service order үүсгэнэ."
      action={
        <Button type="button" variant="outline" size="icon" aria-label="Буцах" onClick={() => router.back()}>
          <ArrowLeft className="size-4" />
        </Button>
      }
      contentClassName="space-y-5"
    >
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
              <h2 className="mt-1 truncate text-lg font-semibold text-slate-950">
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

      {checklist.map((group, groupIndex) => (
        <Card key={group.type} className="rounded-2xl border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-slate-950">
                {group.type === "General" ? "Ерөнхий шалгалт" : "Техникийн шалгалт"}
              </h2>
              <p className="mt-0.5 text-sm text-slate-500">
                {group.type === "General"
                  ? "Гадна байдал, гэрэл, суудал, аюулгүй байдал"
                  : "Тулгуур эд анги, шингэн, хөдөлгүүр, явах эд анги"}
              </p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {group.values.filter((value) => Boolean(value.answer)).length}/{group.values.length}
            </span>
          </div>

          <div className="mt-4 space-y-4">
            {group.values.map((value, valueIndex) => (
              <section key={value.question} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <p className="text-sm font-medium leading-6 text-slate-900">{value.question}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateValue(groupIndex, valueIndex, { answer: option.value })}
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
                    onChange={(event) =>
                      updateValue(groupIndex, valueIndex, { description: event.target.value })
                    }
                    className="mt-3"
                    placeholder="Тайлбар, шаардлагатай засвар"
                  />
                )}
              </section>
            ))}
          </div>
        </Card>
      ))}

      <Card className="rounded-2xl border-slate-200 bg-white p-4 shadow-sm">
        <label className="text-sm font-semibold text-slate-900" htmlFor="inspection-note">
          Нэмэлт тэмдэглэл
        </label>
        <textarea
          id="inspection-note"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="mt-2 min-h-24 w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          placeholder="Үзлэгийн ерөнхий тайлбар"
        />
      </Card>

      <div className="sticky bottom-[calc(5rem+env(safe-area-inset-bottom))] z-10 -mx-4 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:static sm:mx-0 sm:border sm:rounded-2xl sm:px-4">
        <Button type="button" size="lg" className="w-full" disabled={isSaving || !licensePlate} onClick={() => void submitInspection()}>
          <ClipboardCheck className="size-4" />
          {isSaving ? "Захиалга үүсгэж байна..." : "Үзлэг дуусгаж, захиалга үүсгэх"}
        </Button>
      </div>
    </PageShell>
  );
}
