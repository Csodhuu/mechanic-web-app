import { ChecklistStatus } from "@/lib/inspection-checklist";

export const statusOptions: { value: ChecklistStatus; label: string; className: string }[] = [
  {
    value: "Regular",
    label: "Хэвийн",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  { value: "Warning", label: "Анхаарах", className: "border-amber-200 bg-amber-50 text-amber-700" },
  { value: "Danger", label: "Яаралтай", className: "border-rose-200 bg-rose-50 text-rose-700" },
];

export function getChecklistGroupTitle(type: string) {
  return type === "General" ? "Ерөнхий шалгалт" : "Техникийн шалгалт";
}

export function getChecklistGroupDescription(type: string) {
  return type === "General"
    ? "Гадна байдал, гэрэл, суудал, аюулгүй байдал"
    : "Тулгуур эд анги, шингэн, хөдөлгүүр, явах эд анги";
}
