import type { CpOrderQuery } from "@/app/(base)/jobs/_types/cp-order";

export type HistoryOrderItem = NonNullable<CpOrderQuery>["result"][number];
export type HistoryGroup = { group: string; items: HistoryOrderItem[] };

export function formatHistoryDate(value?: string | null) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("mn-MN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value));
}

export function formatHistoryTime(value?: string | null) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("mn-MN", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function getHistoryVehicleName(item: HistoryOrderItem) {
  return [item.make?.name, item.model?.name].filter(Boolean).join(" ") || "Машины мэдээлэлгүй";
}

export function getHistoryCustomerName(item: HistoryOrderItem) {
  return (
    [item.customer?.lastname, item.customer?.firstname].filter(Boolean).join(" ") ||
    item.customer?.phoneNumber ||
    "-"
  );
}

export function groupByCompletedDate(items: HistoryOrderItem[]) {
  return items.reduce<HistoryGroup[]>((groups, item) => {
    const group = formatHistoryDate(item.order.timeCompleted ?? item.order.updatedAt);
    const existingGroup = groups.find((entry) => entry.group === group);
    if (existingGroup) {
      existingGroup.items.push(item);
      return groups;
    }
    return [...groups, { group, items: [item] }];
  }, []);
}
