import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { apiClient } from "@/lib/authClient";
import type { ChecklistStatus, ChecklistValue } from "@/lib/inspection-checklist";
import { cn } from "@/lib/utils";
import { getCookie } from "cookies-next";
import { BriefcaseBusiness, CalendarDays, Pencil, Save, UserRound, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { ChecklistGroup } from "@/app/(base)/jobs/initial-inspection/_components/organisms/checklist-group";
import { InspectionNoteCard } from "@/app/(base)/jobs/initial-inspection/_components/organisms/inspection-note-card";
import {
  employeeName,
  formatInspectionDate,
  InspectionItem,
  statusStyle,
} from "../../_types/inspection";
import { InspectionGroupSection } from "../molecules/inspection-group-section";

type DraftInspectionGroup = {
  type: string;
  values: ChecklistValue[];
};

type InspectionDetailDialogProps = {
  item: InspectionItem | null;
  onOpenChange: (open: boolean) => void;
  onUpdated: (inspection: InspectionItem["inspection"]) => void;
};

const toChecklistAnswer = (answer: string): ChecklistStatus | "" => {
  if (answer === "Regular" || answer === "Warning" || answer === "Danger") return answer;
  return "";
};

const toDraftInspection = (item: InspectionItem | null): DraftInspectionGroup[] =>
  item?.inspection.inspection?.map((group) => ({
    type: group.type,
    values: group.values.map((value) => ({
      question: value.question,
      answer: toChecklistAnswer(value.answer),
      description: value.description ?? "",
    })),
  })) ?? [];

export function InspectionDetailDialog({
  item,
  onOpenChange,
  onUpdated,
}: InspectionDetailDialogProps) {
  const router = useRouter();
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSavingInspection, setIsSavingInspection] = useState(false);
  const [draftInspection, setDraftInspection] = useState<DraftInspectionGroup[]>([]);
  const [draftDescription, setDraftDescription] = useState("");

  useEffect(() => {
    setIsEditing(false);
    setDraftInspection(toDraftInspection(item));
    setDraftDescription(item?.inspection.description ?? "");
  }, [item]);

  const createServiceOrder = async () => {
    if (!item) return;

    const token = getCookie("token");
    if (!token) {
      toast.error("Нэвтрэх token олдсонгүй.");
      return;
    }

    try {
      setIsCreatingOrder(true);
      const response = await apiClient.api.crm
        .inspection({ id: item.inspection.id })
        ["service-order"].post(
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      if (response.error || !response.data) throw response.error;

      toast.success("Үзлэгээс оношлогоо үүслээ.");
      onOpenChange(false);
      router.push(`/service-order-detail?id=${encodeURIComponent(response.data.cpOrderId)}`);
    } catch (error) {
      console.error("Failed to create service order from inspection:", error);
      toast.error("Үзлэгээс оношлогоо үүсгэхэд алдаа гарлаа.");
    } finally {
      setIsCreatingOrder(false);
    }
  };

  const beginEdit = () => {
    setDraftInspection(toDraftInspection(item));
    setDraftDescription(item?.inspection.description ?? "");
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setDraftInspection(toDraftInspection(item));
    setDraftDescription(item?.inspection.description ?? "");
    setIsEditing(false);
  };

  const updateDraftValue = (
    groupIndex: number,
    valueIndex: number,
    patch: Partial<ChecklistValue>
  ) => {
    setDraftInspection((current) =>
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

  const saveInspection = async () => {
    if (!item) return;

    const token = getCookie("token");
    if (!token) {
      toast.error("Нэвтрэх token олдсонгүй.");
      return;
    }

    try {
      setIsSavingInspection(true);
      const response = await apiClient.api.crm.inspection({ id: item.inspection.id }).patch(
        {
          description: draftDescription.trim(),
          inspection: draftInspection,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.error || !response.data) throw response.error;

      onUpdated(response.data);
      setIsEditing(false);
      toast.success("Үзлэгийн мэдээлэл хадгалагдлаа.");
    } catch (error) {
      console.error("Failed to update inspection:", error);
      toast.error("Үзлэг хадгалахад алдаа гарлаа.");
    } finally {
      setIsSavingInspection(false);
    }
  };

  const isBusy = isCreatingOrder || isSavingInspection;

  return (
    <Dialog open={Boolean(item)} onOpenChange={onOpenChange}>
      {item && (
        <DialogContent className="max-h-[85svh] overflow-y-auto p-0 sm:max-w-2xl">
          <DialogHeader>
            <div className="border-b border-slate-100 p-4 pb-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <DialogTitle>{item.inspection.licensePlate} - Анхан үзлэг</DialogTitle>
                  <DialogDescription>
                    Анхан үзлэгийн тэмдэглэл, checklist-ийн бүлэг болон хариунууд.
                  </DialogDescription>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  {isEditing ? (
                    <>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="w-full sm:w-auto"
                        disabled={isBusy}
                        onClick={cancelEdit}
                      >
                        <X className="size-4" />
                        Болих
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        className="w-full sm:w-auto"
                        disabled={isBusy}
                        onClick={() => void saveInspection()}
                      >
                        <Save className="size-4" />
                        {isSavingInspection ? "Хадгалж байна..." : "Хадгалах"}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="w-full sm:w-auto"
                        disabled={isBusy}
                        onClick={beginEdit}
                      >
                        <Pencil className="size-4" />
                        Засах
                      </Button>
                      {item.inspection.status !== "CANCELLED" && (
                        <Button
                          type="button"
                          size="sm"
                          className="w-full sm:w-auto"
                          disabled={isBusy}
                          onClick={() => void createServiceOrder()}
                        >
                          <BriefcaseBusiness className="size-4" />
                          {isCreatingOrder ? "Үүсгэж байна..." : "Оношлогоо"}
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <UserRound className="size-3.5" />
                  {employeeName(item)}
                </span>
                <span className="inline-flex items-center gap-1">
                  <CalendarDays className="size-3.5" />
                  {formatInspectionDate(item.inspection.createdAt)}
                </span>
                <span
                  className={cn(
                    "inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1",
                    statusStyle[item.inspection.status].className
                  )}
                >
                  {statusStyle[item.inspection.status].label}
                </span>
              </div>
            </div>
          </DialogHeader>
          <div className="space-y-3 p-4">
            {isEditing ? (
              <>
                {draftInspection.length > 0 ? (
                  draftInspection.map((group, groupIndex) => (
                    <ChecklistGroup
                      key={group.type}
                      group={group}
                      groupIndex={groupIndex}
                      onValueChange={updateDraftValue}
                    />
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-center text-sm text-slate-500">
                    Checklist мэдээлэл олдсонгүй.
                  </div>
                )}
                <InspectionNoteCard value={draftDescription} onChange={setDraftDescription} />
              </>
            ) : (
              <>
                {item.inspection.description && (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <p className="text-xs font-semibold text-slate-400">Тэмдэглэл</p>
                    <p className="mt-1 text-sm leading-6 text-slate-700">
                      {item.inspection.description}
                    </p>
                  </div>
                )}

                {item.inspection.inspection?.map((group) => (
                  <InspectionGroupSection key={group.type} group={group} />
                ))}
              </>
            )}
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
