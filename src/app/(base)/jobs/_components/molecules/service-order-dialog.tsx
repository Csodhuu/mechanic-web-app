"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/authClient";
import { createInitialInspectionChecklist, type ChecklistValue } from "@/lib/inspection-checklist";
import { cn } from "@/lib/utils";
import { getCookie } from "cookies-next";
import { ArrowLeft, CheckCircle2, ClipboardCheck, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { ChecklistGroup } from "../../initial-inspection/_components/organisms/checklist-group";
import { InspectionNoteCard } from "../../initial-inspection/_components/organisms/inspection-note-card";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: () => void;
};

type Vehicle = NonNullable<Awaited<ReturnType<typeof apiClient.api.crm.vehicle.get>>["data"]>;
type Step = "vehicle" | "general" | "technical" | "review" | "done";

const steps: { key: Exclude<Step, "done">; label: string }[] = [
  { key: "vehicle", label: "Машин" },
  { key: "general", label: "Ерөнхий" },
  { key: "technical", label: "Техник" },
  { key: "review", label: "Баталгаажуулах" },
];

export function ServiceOrderDialog({ open, onOpenChange, onCreated }: Props) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("vehicle");
  const [licensePlate, setLicensePlate] = useState("");
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [checklist, setChecklist] = useState(createInitialInspectionChecklist);
  const [description, setDescription] = useState("");
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const selectedLicensePlate = (vehicle?.plate_no || licensePlate).trim();
  const vinNumber = vehicle?.cabin_no ?? "";
  const isBusy = isSearching || isSaving;

  const totals = useMemo(() => {
    const total = checklist.reduce((sum, group) => sum + group.values.length, 0);
    const answered = checklist.reduce(
      (sum, group) => sum + group.values.filter((value) => Boolean(value.answer)).length,
      0
    );

    return { total, answered, progress: total ? Math.round((answered / total) * 100) : 0 };
  }, [checklist]);

  const flaggedItems = useMemo(
    () =>
      checklist.flatMap((group) =>
        group.values
          .filter((value) => value.answer && value.answer !== "Regular")
          .map((value) => ({ group: group.type, value }))
      ),
    [checklist]
  );

  const resetDialog = () => {
    setStep("vehicle");
    setLicensePlate("");
    setVehicle(null);
    setChecklist(createInitialInspectionChecklist());
    setDescription("");
    setCreatedOrderId(null);
  };

  const handleInternalOpenChange = (next: boolean) => {
    if (!next && isSaving) return;
    if (!next) resetDialog();
    onOpenChange(next);
  };

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

  const isGroupComplete = (groupIndex: number) =>
    checklist[groupIndex]?.values.every((value) => Boolean(value.answer)) ?? false;

  const firstIncompleteGroupIndex = () =>
    checklist.findIndex((group) => group.values.some((value) => !value.answer));

  const findVehicle = async () => {
    const value = licensePlate.trim();
    if (!value) {
      toast.error("Улсын дугаар оруулна уу.");
      return;
    }

    try {
      setIsSearching(true);
      setVehicle(null);
      setCreatedOrderId(null);
      const response = await apiClient.api.crm.vehicle.get({
        query: { licensePlate: value },
      });
      if (response.error || !response.data) throw response.error ?? new Error("Vehicle not found");

      setVehicle(response.data);
    } catch (error) {
      console.error("Failed to find vehicle:", error);
      toast.error("Энэ улсын дугаартай машин олдсонгүй. Дугаараа шалгана уу.");
    } finally {
      setIsSearching(false);
    }
  };

  const goToGeneralStep = () => {
    if (!vehicle || !selectedLicensePlate) {
      toast.error("Эхлээд улсын дугаараар машиныг шалгана уу.");
      return;
    }

    setStep("general");
  };

  const goToTechnicalStep = () => {
    if (!isGroupComplete(0)) {
      toast.error("Ерөнхий шалгалтын бүх асуултад хариулна уу.");
      return;
    }

    setStep("technical");
  };

  const goToReviewStep = () => {
    if (!isGroupComplete(1)) {
      toast.error("Техникийн шалгалтын бүх асуултад хариулна уу.");
      return;
    }

    setStep("review");
  };

  const submitInspection = async () => {
    if (!vehicle || !selectedLicensePlate) {
      toast.error("Машин сонгогдоогүй байна.");
      setStep("vehicle");
      return;
    }

    const incompleteGroup = firstIncompleteGroupIndex();
    if (incompleteGroup !== -1) {
      toast.error("Бүх шалгах зүйлд үр дүн оруулна уу.");
      setStep(incompleteGroup === 0 ? "general" : "technical");
      return;
    }

    try {
      setIsSaving(true);
      const token = getCookie("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
      const inspectionResponse = await apiClient.api.crm.inspection.post(
        {
          licensePlate: selectedLicensePlate,
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

      setCreatedOrderId(serviceOrderResponse.data.cpOrderId);
      setStep("done");
      onCreated();
      toast.success("Үзлэг баталгаажлаа. Засварын захиалга нээгдлээ.");
    } catch (error) {
      console.error("Failed to create service order from inspection:", error);
      toast.error("Үзлэгээс захиалга үүсгэхэд алдаа гарлаа.");
    } finally {
      setIsSaving(false);
    }
  };

  const openCreatedOrder = () => {
    if (!createdOrderId) return;

    const nextUrl = `/service-order-detail?id=${encodeURIComponent(createdOrderId)}`;
    resetDialog();
    onOpenChange(false);
    router.push(nextUrl);
  };

  const closeDoneState = () => {
    resetDialog();
    onOpenChange(false);
  };

  const goBack = () => {
    if (step === "vehicle") {
      handleInternalOpenChange(false);
      return;
    }

    if (step === "general") setStep("vehicle");
    if (step === "technical") setStep("general");
    if (step === "review") setStep("technical");
  };

  const goForward = () => {
    if (step === "vehicle") goToGeneralStep();
    if (step === "general") goToTechnicalStep();
    if (step === "technical") goToReviewStep();
    if (step === "review") void submitInspection();
  };

  return (
    <Dialog open={open} onOpenChange={handleInternalOpenChange}>
      <DialogContent
        className="top-0 left-0 flex h-[100svh] max-h-[100svh] w-full max-w-none translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden rounded-none border-0 p-0 sm:top-[50%] sm:left-[50%] sm:h-auto sm:max-h-[90svh] sm:w-full sm:max-w-3xl sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-2xl sm:border"
        showCloseButton={!isSaving}
      >
        <div className="shrink-0 border-b border-slate-200 bg-white px-4 py-3 sm:px-5 sm:py-4">
          <DialogHeader className="pr-8 text-left">
            <DialogTitle className="text-base font-semibold">
              {step === "done" ? "Оношлогоо амжилттай үүслээ" : "Оношлогоо"}
            </DialogTitle>
            <DialogDescription>
              {step === "done"
                ? "Жагсаалт шинэчлэгдсэн. Дэлгэрэнгүй рүү орох эсвэл цонхоо хааж болно."
                : "Машин сонгоод анхан үзлэгийг энэ цонхонд дуусгана."}
            </DialogDescription>
          </DialogHeader>

          {step !== "done" && <StepIndicator step={step} />}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50 px-4 py-4 sm:bg-white sm:px-5">
          {step === "vehicle" && (
            <VehicleStep
              licensePlate={licensePlate}
              vehicle={vehicle}
              isSearching={isSearching}
              onLicensePlateChange={(value) => {
                setLicensePlate(value);
                setVehicle(null);
                setCreatedOrderId(null);
              }}
              onFindVehicle={() => void findVehicle()}
            />
          )}

          {step === "general" && (
            <ChecklistGroup group={checklist[0]} groupIndex={0} onValueChange={updateValue} />
          )}

          {step === "technical" && (
            <ChecklistGroup group={checklist[1]} groupIndex={1} onValueChange={updateValue} />
          )}

          {step === "review" && (
            <ReviewStep
              licensePlate={selectedLicensePlate}
              vinNumber={vinNumber}
              totals={totals}
              flaggedItems={flaggedItems}
              description={description}
              onDescriptionChange={setDescription}
            />
          )}

          {step === "done" && (
            <DoneStep
              licensePlate={selectedLicensePlate}
              orderId={createdOrderId}
              onOpenOrder={openCreatedOrder}
              onStartAnother={resetDialog}
              onClose={closeDoneState}
            />
          )}
        </div>

        {step !== "done" && (
          <div className="grid shrink-0 gap-2 border-t border-slate-200 bg-white px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 sm:flex sm:flex-row sm:justify-between sm:px-5 sm:pb-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full sm:w-auto"
              disabled={isBusy}
              onClick={goBack}
            >
              {step === "vehicle" ? "Хаах" : (
                <>
                  <ArrowLeft className="size-4" />
                  Буцах
                </>
              )}
            </Button>

            <Button
              type="button"
              size="sm"
              className="w-full sm:w-auto"
              disabled={isBusy || (step === "vehicle" && !vehicle)}
              onClick={goForward}
            >
              {step === "review" && <ClipboardCheck className="size-4" />}
              {primaryActionLabel(step, isSaving)}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function StepIndicator({ step }: { step: Exclude<Step, "done"> }) {
  const activeIndex = steps.findIndex((item) => item.key === step);

  return (
    <div className="mt-3 flex gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-4 sm:overflow-visible sm:pb-0">
      {steps.map((item, index) => {
        const isActive = item.key === step;
        const isComplete = index < activeIndex;

        return (
          <div
            key={item.key}
            className={cn(
              "min-w-[7rem] rounded-xl border px-3 py-2 text-left transition sm:min-w-0",
              isActive && "border-blue-200 bg-blue-50 text-blue-700",
              isComplete && "border-emerald-200 bg-emerald-50 text-emerald-700",
              !isActive && !isComplete && "border-slate-200 bg-white text-slate-500"
            )}
          >
            <span className="block text-[11px] font-semibold uppercase">Алхам {index + 1}</span>
            <span className="mt-0.5 block break-words text-xs font-semibold">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function VehicleStep({
  licensePlate,
  vehicle,
  isSearching,
  onLicensePlateChange,
  onFindVehicle,
}: {
  licensePlate: string;
  vehicle: Vehicle | null;
  isSearching: boolean;
  onLicensePlateChange: (value: string) => void;
  onFindVehicle: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
        <label className="text-sm font-semibold text-slate-900" htmlFor="service-order-license">
          Улсын дугаар
        </label>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <Input
            id="service-order-license"
            value={licensePlate}
            onChange={(event) => onLicensePlateChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") onFindVehicle();
            }}
            placeholder="Улсын дугаар оруулна уу"
            disabled={isSearching}
            className="h-9 text-sm"
          />
          <Button
            type="button"
            size="sm"
            onClick={onFindVehicle}
            disabled={isSearching}
            className="sm:w-28"
          >
            <Search className="size-4" />
            {isSearching ? "Хайж..." : "Хайх"}
          </Button>
        </div>
      </div>

      {vehicle && (
        <div className="rounded-xl border border-slate-200 bg-white p-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase text-slate-400">Сонгосон машин</p>
              <h3 className="mt-1 truncate text-base font-semibold text-slate-950">
                {vehicle.plate_no}
              </h3>
              <p className="mt-1 truncate text-sm text-slate-500">VIN: {vehicle.cabin_no || "-"}</p>
            </div>
            <CheckCircle2 className="size-5 shrink-0 text-emerald-500" />
          </div>

          <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-xs sm:grid-cols-4">
            <VehicleDetail label="Улсын дугаар" value={vehicle.plate_no} />
            <VehicleDetail label="VIN" value={vehicle.cabin_no} />
            <VehicleDetail label="Км" value={null} />
            <VehicleDetail label="Утас" value={null} />
          </dl>
        </div>
      )}
    </div>
  );
}

function ReviewStep({
  licensePlate,
  vinNumber,
  totals,
  flaggedItems,
  description,
  onDescriptionChange,
}: {
  licensePlate: string;
  vinNumber: string;
  totals: { total: number; answered: number; progress: number };
  flaggedItems: { group: string; value: ChecklistValue }[];
  description: string;
  onDescriptionChange: (value: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <SummaryBox
          label="Машин"
          value={licensePlate || "-"}
          description={`VIN: ${vinNumber || "-"}`}
        />
        <SummaryBox
          label="Checklist"
          value={`${totals.answered}/${totals.total}`}
          description={`Progress ${totals.progress}%`}
        />
        <SummaryBox
          label="Анхаарах"
          value={`${flaggedItems.length}`}
          description="Warning / Danger"
        />
      </div>

      {flaggedItems.length > 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
          <p className="text-sm font-semibold text-amber-900">Анхаарах зүйлс</p>
          <div className="mt-2 space-y-2">
            {flaggedItems.map((item) => (
              <div
                key={`${item.group}-${item.value.question}`}
                className="rounded-lg border border-amber-200 bg-white/70 p-2"
              >
                <p className="text-sm font-medium text-slate-900">{item.value.question}</p>
                <p className="mt-1 text-xs text-slate-600">
                  {item.value.answer}
                  {item.value.description ? ` - ${item.value.description}` : ""}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <InspectionNoteCard value={description} onChange={onDescriptionChange} />
    </div>
  );
}

function DoneStep({
  licensePlate,
  orderId,
  onOpenOrder,
  onStartAnother,
  onClose,
}: {
  licensePlate: string;
  orderId: string | null;
  onOpenOrder: () => void;
  onStartAnother: () => void;
  onClose: () => void;
}) {
  return (
    <div className="space-y-4 py-2 text-center">
      <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <CheckCircle2 className="size-7" />
      </span>
      <div>
        <h3 className="text-base font-semibold text-slate-950">Засварын захиалга нээгдлээ</h3>
        <p className="mt-1 text-sm text-slate-500">
          {licensePlate}
          {orderId ? ` / ${orderId}` : ""}
        </p>
      </div>
      <div className="mx-auto grid max-w-md gap-2 sm:grid-cols-3">
        <Button type="button" size="sm" onClick={onOpenOrder} disabled={!orderId}>
          Дэлгэрэнгүй
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={onStartAnother}>
          Дахин оношлогоо
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={onClose}>
          Хаах
        </Button>
      </div>
    </div>
  );
}

function VehicleDetail({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div className="min-w-0">
      <dt className="text-[11px] text-slate-500">{label}</dt>
      <dd className="mt-px truncate text-xs font-medium text-slate-800">{value || "-"}</dd>
    </div>
  );
}

function SummaryBox({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <p className="text-[11px] font-semibold uppercase text-slate-400">{label}</p>
      <p className="mt-1 truncate text-base font-semibold text-slate-950">{value}</p>
      <p className="mt-1 truncate text-xs text-slate-500">{description}</p>
    </div>
  );
}

function primaryActionLabel(step: Exclude<Step, "done">, isSaving: boolean) {
  if (step === "vehicle") return "Үзлэг эхлүүлэх";
  if (step === "general") return "Техник рүү";
  if (step === "technical") return "Хураангуй";
  return isSaving ? "Үүсгэж байна..." : "Үзлэг баталгаажуулж, оношлогоо нээх";
}