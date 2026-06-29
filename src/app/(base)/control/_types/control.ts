import { CpOrderQuery } from "@/app/(base)/jobs/_types/cp-order";
import { Clock3, ShieldCheck } from "lucide-react";

export type OrderItem = CpOrderQuery["result"][number];
export type OrderState = OrderItem["order"]["state"];

export const controlTabs: { value: OrderState; label: string; detail: string }[] = [
  { value: "CREATED", label: "Эхлэхэд бэлэн", detail: "Засвар үйлчилгээ эхлүүлэхэд бэлэн" },
  { value: "PROGRESSING", label: "Засвар явагдаж буй", detail: "Одоогоор засварлаж байна" },
  { value: "COMPLETE", label: "Дууссан", detail: "Засвар дууссан ажлууд" },
];

export const stateStyle: Record<
  OrderState,
  { label: string; className: string; icon: typeof ShieldCheck }
> = {
  CREATED: {
    label: "Эхлэхэд бэлэн",
    className: "border-amber-200 bg-amber-50 text-amber-700",
    icon: Clock3,
  },
  PROGRESSING: {
    label: "Засвар явагдаж буй",
    className: "border-blue-200 bg-blue-50 text-blue-700",
    icon: ShieldCheck,
  },
  COMPLETE: {
    label: "Дууссан",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
    icon: ShieldCheck,
  },
};

export function formatControlDate(value?: string | null) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("mn-MN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function getVehicleName(item: OrderItem) {
  return [item.make?.name, item.model?.name].filter(Boolean).join(" ") || "Машины мэдээлэлгүй";
}

export function getCustomerName(item: OrderItem) {
  return (
    [item.customer?.lastname, item.customer?.firstname].filter(Boolean).join(" ") ||
    item.customer?.phoneNumber ||
    "-"
  );
}
