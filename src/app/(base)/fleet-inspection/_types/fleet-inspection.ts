import { apiClient } from "@/lib/authClient";

export type FleetInspectionResponse = NonNullable<
  Awaited<ReturnType<typeof apiClient.api.fleet.inspection.get>>["data"]
>;
export type FleetInspectionItem = FleetInspectionResponse["result"][number];
export type FleetInspectionState = FleetInspectionItem["inspection"]["state"];
export type FleetInspectionResult = Exclude<FleetInspectionItem["inspection"]["stateResult"], null>;

export type FleetInspectionQueryParams = Parameters<
  (typeof apiClient.api.fleet.inspection)["get"]
>[0]["query"];

export type FleetInspectionFieldResultResponse = NonNullable<
  Awaited<ReturnType<(typeof apiClient.api.fleet.inspection)["field-result"]["get"]>>["data"]
>;
export type FleetInspectionFieldResult = FleetInspectionFieldResultResponse["result"][number];

export type FleetInspectionTemplateResponse = NonNullable<
  Awaited<ReturnType<(typeof apiClient.api.fleet.inspection.template)["get"]>>["data"]
>;
export type FleetInspectionTemplate = FleetInspectionTemplateResponse["result"][number];

export type FleetMachineResponse = NonNullable<
  Awaited<ReturnType<(typeof apiClient.api.fleet.machine)["get"]>>["data"]
>;
export type FleetMachine = FleetMachineResponse["result"][number];

export type FleetInspectionTemplateField = {
  templateId: string;
  fieldGroupId: string | null;
  fieldGroup: string | null;
  fieldId: string | null;
  code: string | null;
  description: string | null;
  fieldType: "BOOLEAN" | "NUMERIC" | "TEXT" | "DATE" | "RATE" | "MULTI_CHOICE";
  required: boolean;
  metadata: unknown;
  sortIndex: number | null;
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  oldId: number | null;
};

export const fleetInspectionStateFilters: {
  label: string;
  value: FleetInspectionState | "ALL";
}[] = [
  { label: "Бүгд", value: "ALL" },
  { label: "Үүссэн", value: "CREATED" },
  { label: "Товлосон", value: "SCHEDULED" },
  { label: "Явагдаж буй", value: "IN_PROGRESS" },
  { label: "Дууссан", value: "COMPLETED" },
];

export const fleetInspectionResultFilters: {
  label: string;
  value: FleetInspectionResult | "ALL";
}[] = [
  { label: "Бүгд", value: "ALL" },
  { label: "Тэнцсэн", value: "PASSED" },
  { label: "Унасан", value: "FAILED" },
  { label: "Шалгаагүй", value: "NOT_INSPECTED" },
  { label: "Буцаасан", value: "RETURNED" },
  { label: "Чөлөөлсөн", value: "WAIVED" },
];

export const fleetInspectionStateStyle: Record<
  FleetInspectionState,
  { label: string; className: string }
> = {
  CREATED: { label: "Үүссэн", className: "bg-slate-100 text-slate-700 ring-slate-200" },
  SCHEDULED: { label: "Товлосон", className: "bg-blue-50 text-blue-700 ring-blue-200" },
  IN_PROGRESS: {
    label: "Явагдаж буй",
    className: "bg-amber-50 text-amber-700 ring-amber-200",
  },
  COMPLETED: {
    label: "Дууссан",
    className: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  },
};

export const fleetInspectionResultStyle: Record<
  FleetInspectionResult,
  { label: string; className: string }
> = {
  PASSED: { label: "Тэнцсэн", className: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  FAILED: { label: "Унасан", className: "bg-rose-50 text-rose-700 ring-rose-200" },
  NOT_INSPECTED: {
    label: "Шалгаагүй",
    className: "bg-slate-100 text-slate-600 ring-slate-200",
  },
  RETURNED: { label: "Буцаасан", className: "bg-orange-50 text-orange-700 ring-orange-200" },
  WAIVED: { label: "Чөлөөлсөн", className: "bg-violet-50 text-violet-700 ring-violet-200" },
};

export const formatFleetInspectionDate = (value: Date | string | null | undefined) => {
  if (!value) return "-";

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return new Intl.DateTimeFormat("mn-MN", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export const formatFleetNumber = (value: number | null | undefined, suffix: string) =>
  typeof value === "number" ? `${value.toLocaleString("mn-MN")} ${suffix}` : "-";

export function getMachineLabel(machine: FleetMachine | FleetInspectionItem["machine"] | null) {
  if (!machine) return "Машин сонгоогүй";
  return (
    machine.licensePlate ||
    machine.assetCode ||
    machine.name ||
    machine.vin ||
    `Machine ${machine.id.slice(0, 8)}`
  );
}

export function getMachineSubtitle(machine: FleetInspectionItem["machine"] | null) {
  if (!machine) return "-";
  return [machine.name, machine.assetCode, machine.vin].filter(Boolean).join(" / ") || "-";
}

export function matchesFleetInspectionSearch(item: FleetInspectionItem, search: string) {
  const normalized = search.trim().toLowerCase();
  if (!normalized) return true;

  const machine = item.machine;
  const values = [
    item.inspection.id,
    item.template?.name,
    machine?.licensePlate,
    machine?.assetCode,
    machine?.name,
    machine?.vin,
  ];

  return values.some((value) => value?.toLowerCase().includes(normalized));
}
