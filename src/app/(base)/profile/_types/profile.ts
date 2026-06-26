import { apiClient } from "@/lib/authClient";

export type MeQuery = NonNullable<
  Awaited<ReturnType<typeof apiClient.api.user.me.get>>["data"]
>;

export const kindLabel: Record<string, string> = {
  ADMIN: "Админ",
  COMPANY_ADMIN: "Компанийн админ",
  CUSTOMER: "Харилцагч",
  INSPECTION: "Хяналтын инженер",
};

export function formatProfileDate(value?: Date | string | null) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("mn-MN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value));
}

export function getInitials(name?: string | null) {
  if (!name) return "U";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}
