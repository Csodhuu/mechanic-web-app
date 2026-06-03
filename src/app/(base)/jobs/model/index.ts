import { GetTreatyType } from "@/utils/types";

export type CpOrderQuery = GetTreatyType<
  () => ReturnType<(typeof import("@/lib/authClient").apiClient.api.crm)["cp-order"]["get"]>
>;
