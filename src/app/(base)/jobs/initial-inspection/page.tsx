"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/authClient";
import { createInitialInspectionChecklist, type ChecklistStatus, type ChecklistValue } from "@/lib/inspection-checklist";
import { getCookie } from "cookies-next";
import { ArrowLeft, CarFront, ClipboardCheck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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
          : { ...group, values: group.values.map((value, itemIndex) => (itemIndex === valueIndex ? { ...value, ...patch } : value)) }
      )
    );
  };

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
      const inspectionResponse = await apiClient.api.crm.inspection.post({
        licensePlate,
        description: description.trim() || undefined,
        inspection: checklist,
      }, { headers });
      if (inspectionResponse.error || !inspectionResponse.data) throw inspectionResponse.error;

      const serviceOrderResponse = await apiClient.api.crm.inspection({ id: inspectionResponse.data.id })["service-order"].post({}, { headers });
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
    <div className="mx-auto max-w-3xl space-y-4">
      <header className="flex items-center gap-3">
        <Button type="button" variant="outline" size="icon" aria-label="Буцах" onClick={() => router.back()}>
          <ArrowLeft className="size-4" />
        </Button>
        <div>
          <p className="text-sm text-slate-500">Jobs / Анхан үзлэг</p>
          <h1 className="text-2xl font-bold text-slate-950">Анхан үзлэг</h1>
        </div>
      </header>

      <Card className="rounded-2xl border-slate-200 p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><CarFront className="size-5" /></span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-950">{licensePlate || "Машин сонгогдоогүй"}</p>
            <p className="truncate text-xs text-slate-500">{vehicleName || "Сонгосон машины үзлэгийг бөглөнө"}</p>
          </div>
        </div>
      </Card>

      {checklist.map((group, groupIndex) => (
        <Card key={group.type} className="rounded-2xl border-slate-200 p-4 shadow-sm">
          <h2 className="text-base font-bold text-slate-900">{group.type === "General" ? "Ерөнхий шалгалт" : "Техникийн шалгалт"}</h2>
          <div className="mt-3 space-y-4">
            {group.values.map((value, valueIndex) => (
              <section key={value.question} className="border-t border-slate-100 pt-4 first:border-0 first:pt-0">
                <p className="text-sm font-medium leading-5 text-slate-800">{value.question}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {statusOptions.map((option) => (
                    <button key={option.value} type="button" onClick={() => updateValue(groupIndex, valueIndex, { answer: option.value })} className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${value.answer === option.value ? option.className : "border-slate-200 bg-white text-slate-600"}`}>
                      {option.label}
                    </button>
                  ))}
                </div>
                {value.answer !== "Regular" && value.answer && (
                  <Input value={value.description} onChange={(event) => updateValue(groupIndex, valueIndex, { description: event.target.value })} className="mt-2 h-9 text-sm" placeholder="Тайлбар / шаардлагатай засвар" />
                )}
              </section>
            ))}
          </div>
        </Card>
      ))}

      <Card className="rounded-2xl border-slate-200 p-4 shadow-sm">
        <label className="text-sm font-semibold text-slate-800" htmlFor="inspection-note">Нэмэлт тэмдэглэл</label>
        <textarea id="inspection-note" value={description} onChange={(event) => setDescription(event.target.value)} className="mt-2 min-h-20 w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-blue-500" placeholder="Үзлэгийн ерөнхий тайлбар" />
      </Card>

      <Button type="button" size="lg" className="mb-6 w-full" disabled={isSaving || !licensePlate} onClick={() => void submitInspection()}>
        <ClipboardCheck className="size-4" />
        {isSaving ? "Захиалга үүсгэж байна..." : "Үзлэг дуусгаж, захиалга үүсгэх"}
      </Button>
    </div>
  );
}
