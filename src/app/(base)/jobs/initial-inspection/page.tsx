"use client";

import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/authClient";
import { createInitialInspectionChecklist, type ChecklistValue } from "@/lib/inspection-checklist";
import { getCookie } from "cookies-next";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { VehicleSummary } from "./_components/molecules/vehicle-summary";
import { ChecklistGroup } from "./_components/organisms/checklist-group";
import { InspectionNoteCard } from "./_components/organisms/inspection-note-card";
import { InspectionSubmitBar } from "./_components/organisms/inspection-submit-bar";

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
          setVehicleName(
            [response.data.mark_name, response.data.model_name].filter(Boolean).join(" ")
          );
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

      const serviceOrderResponse = await apiClient.api.crm
        .inspection({ id: inspectionResponse.data.id })
        ["service-order"].post({}, { headers });
      if (serviceOrderResponse.error || !serviceOrderResponse.data)
        throw serviceOrderResponse.error;

      toast.success("Үзлэг баталгаажлаа. Засварын захиалга нээгдлээ.");
      router.replace(
        `/service-order-detail?id=${encodeURIComponent(serviceOrderResponse.data.cpOrderId)}`
      );
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
      description="Checklist бөглөсний дараа анхан үзлэг баталгаажуулж, засварын захиалга нээнэ."
      action={
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Буцах"
          onClick={() => router.back()}
        >
          <ArrowLeft className="size-4" />
        </Button>
      }
      contentClassName="space-y-5"
    >
      <VehicleSummary licensePlate={licensePlate} vehicleName={vehicleName} totals={totals} />

      {checklist.map((group, groupIndex) => (
        <ChecklistGroup
          key={group.type}
          group={group}
          groupIndex={groupIndex}
          onValueChange={updateValue}
        />
      ))}

      <InspectionNoteCard value={description} onChange={setDescription} />
      <InspectionSubmitBar
        disabled={isSaving || !licensePlate}
        isSaving={isSaving}
        onSubmit={() => void submitInspection()}
      />
    </PageShell>
  );
}
