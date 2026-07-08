"use client";

import { getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const getAuthTokenSnapshot = () => {
  if (typeof window === "undefined") return null;

  const token = getCookie("token");
  return typeof token === "string" ? token : null;
};

export default function WithAuthClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/login";
  const [token, setToken] = useState<string | null>(null);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  useEffect(() => {
    let isActive = true;

    queueMicrotask(() => {
      if (!isActive) return;
      setToken(getAuthTokenSnapshot());
      setHasCheckedAuth(true);
    });

    return () => {
      isActive = false;
    };
  }, [pathname]);

  const isAuthorized = isLoginPage || Boolean(token);

  useEffect(() => {
    if (hasCheckedAuth && !isAuthorized) {
      router.replace("/login");
    }
  }, [hasCheckedAuth, isAuthorized, router]);

  if (!isLoginPage && !hasCheckedAuth) {
    return null;
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
