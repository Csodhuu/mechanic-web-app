"use client";

import InitialExamination from "./common/Initial-examination";
import ServiceInfo from "./common/service-info";

export type MeQuery = NonNullable<
  Awaited<ReturnType<typeof import("@/lib/authClient").apiClient.api.user.me.get>>["data"]
>;

export default function Login() {
  return (
    <div className="w-full space-y-4">
      {/* <Userinfo data={useMe} /> */}
      <ServiceInfo />
      <InitialExamination />
    </div>
  );
}
