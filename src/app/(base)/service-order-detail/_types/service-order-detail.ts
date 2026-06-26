import { CpOrderQuery } from "@/app/(base)/jobs/_types/cp-order";
import dayjs from "dayjs";

export type OrderDetail = CpOrderQuery["result"][number];
export type DetailDialogType = "order" | "vehicle" | "customer";

export const stateLabel: Record<OrderDetail["order"]["state"], string> = {
  CREATED: "Үүссэн",
  PROGRESSING: "Хийгдэж байна",
  COMPLETE: "Дууссан",
};

export const formatOrderDate = (value?: string | null) =>
  value ? dayjs(value).format("YYYY-MM-DD HH.mm") : "-";
