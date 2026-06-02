"use client";

import { Card } from "@/components/ui/card";
import { apiClient } from "@/lib/authClient";
import { getCookie } from "cookies-next";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import Userinfo from "./common/user-info";
import ServiceInfo from "./common/service-info";

export type MeQuery = NonNullable<
  Awaited<
    ReturnType<typeof import("@/lib/authClient").apiClient.api.user.me.get>
  >["data"]
>;

export default function Login() {
  const [useMe, setUseMe] = useState<MeQuery | null>();
  const fetchData = async () => {
    try {
      const token = getCookie("token");
      if (!token) return;
      console.log(token);

      const res = await apiClient.api.user.me.get({
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data) setUseMe(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full space-y-6">
      <Userinfo data={useMe} />
      <ServiceInfo />
    </div>
  );
}
