import { apiClient } from "@/lib/authClient";
import { AlertTriangle, CheckCircle2, CircleAlert } from "lucide-react";

export type InspectionResponse = NonNullable<
  Awaited<ReturnType<typeof apiClient.api.crm.inspection.get>>["data"]
>;
export type InspectionItem = InspectionResponse["result"][number];
export type Status = InspectionItem["inspection"]["status"];
export type InspectionGroup = NonNullable<InspectionItem["inspection"]["inspection"]>[number];
export type InspectionValue = InspectionGroup["values"][number];

export const inspectionFilters: { label: string; value: Status | "ALL" }[] = [
  { label: "Бүгд", value: "ALL" },
  { label: "Хүлээгдэж буй", value: "CREATED" },
  { label: "Баталгаажсан", value: "APPROVED" },
  { label: "Цуцлагдсан", value: "CANCELLED" },
];

export const statusStyle: Record<Status, { label: string; className: string }> = {
  CREATED: { label: "Хүлээгдэж буй", className: "bg-amber-50 text-amber-700 ring-amber-200" },
  APPROVED: { label: "Баталгаажсан", className: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  CANCELLED: { label: "Цуцлагдсан", className: "bg-slate-100 text-slate-600 ring-slate-200" },
};

export const answerStyle: Record<
  string,
  { label: string; className: string; icon: typeof CheckCircle2 }
> = {
  Regular: {
    label: "Хэвийн",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
    icon: CheckCircle2,
  },
  Warning: {
    label: "Анхаарах",
    className: "border-amber-200 bg-amber-50 text-amber-700",
    icon: CircleAlert,
  },
  Danger: {
    label: "Яаралтай",
    className: "border-rose-200 bg-rose-50 text-rose-700",
    icon: AlertTriangle,
  },
};

export const formatInspectionDate = (value: string) =>
  new Intl.DateTimeFormat("mn-MN", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));

export const employeeName = (item: InspectionItem) =>
  [item.employee?.lastname, item.employee?.firstname].filter(Boolean).join(" ") || "Оноогдоогүй";

export function getGroupTitle(type: string) {
  if (type === "General") return "Ерөнхий үзлэг";
  if (type === "Technical") return "Техникийн үзлэг";
  return type;
}

export function getGroupDescription(type: string) {
  if (type === "General") return "Гадна байдал, гэрэл, салон, аюулгүй байдлын шалгалт";
  if (type === "Technical") return "Хөдөлгүүр, явах эд анги, шингэн, техникийн үзүүлэлт";
  return "Үзлэгийн бүлэг";
}

export function summarizeGroup(values: InspectionValue[]) {
  return values.reduce(
    (summary, value) => {
      if (value.answer === "Danger") summary.danger += 1;
      else if (value.answer === "Warning") summary.warning += 1;
      else if (value.answer === "Regular") summary.regular += 1;
      return summary;
    },
    { regular: 0, warning: 0, danger: 0 }
  );
}
