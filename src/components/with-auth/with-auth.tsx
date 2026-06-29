"use client";

import { getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";

const subscribeToAuthCookie = () => () => {};

const getAuthTokenSnapshot = () => {
  if (typeof window === "undefined") return null;

  const token = getCookie("token");
  return typeof token === "string" ? token : null;
};

const getServerAuthTokenSnapshot = () => null;

export default function WithAuthClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/login";
  const token = useSyncExternalStore(
    subscribeToAuthCookie,
    getAuthTokenSnapshot,
    getServerAuthTokenSnapshot
  );
  const isAuthorized = isLoginPage || Boolean(token);

  useEffect(() => {
    if (!isAuthorized) {
      router.replace("/login");
    }
  }, [isAuthorized, router]);

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
