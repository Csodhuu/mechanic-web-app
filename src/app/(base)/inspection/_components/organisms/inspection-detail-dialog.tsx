import { Button } from "@/components/ui/button";
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
import { BriefcaseBusiness, CalendarDays, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import {
  employeeName,
  formatInspectionDate,
  InspectionItem,
  statusStyle,
} from "../../_types/inspection";
import { InspectionGroupSection } from "../molecules/inspection-group-section";

type InspectionDetailDialogProps = {
  item: InspectionItem | null;
  onOpenChange: (open: boolean) => void;
};

export function InspectionDetailDialog({ item, onOpenChange }: InspectionDetailDialogProps) {
  const router = useRouter();
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

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

      toast.success("Үзлэгээс ажил үүслээ.");
      onOpenChange(false);
      router.push(`/service-order-detail?id=${encodeURIComponent(response.data.cpOrderId)}`);
    } catch (error) {
      console.error("Failed to create service order from inspection:", error);
      toast.error("Үзлэгээс ажил үүсгэхэд алдаа гарлаа.");
    } finally {
      setIsCreatingOrder(false);
    }
  };

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
                {item.inspection.status !== "CANCELLED" && (
                  <Button
                    type="button"
                    size="sm"
                    className="w-full sm:w-auto"
                    disabled={isCreatingOrder}
                    onClick={() => void createServiceOrder()}
                  >
                    <BriefcaseBusiness className="size-4" />
                    {isCreatingOrder ? "Үүсгэж байна..." : "Ажил үүсгэх"}
                  </Button>
                )}
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
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}