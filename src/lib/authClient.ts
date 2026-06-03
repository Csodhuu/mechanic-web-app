import { treaty } from "@elysiajs/eden";
import { createAuthClient } from "better-auth/react";
import type { App } from "./server";
import { getCookie } from "cookies-next";
import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";

export const API_URL = "https://api.autosync.mn";
// export const API_URL = "http://202.70.40.82:3000";

const resolveToken = () => {
  if (typeof window === "undefined") return undefined;
  const token = getCookie("token");
  return typeof token === "string" ? token : undefined;
};

const authFetch: typeof fetch = async (input, init) => {
  const headers = new Headers(input instanceof Request ? input.headers : undefined);

  if (init?.headers) {
    new Headers(init.headers).forEach((value, key) => headers.set(key, value));
  }

  const token = resolveToken();
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(input, {
    ...init,
    credentials: init?.credentials ?? "include",
    headers,
  });
};

export const apiClient = treaty<App>(API_URL, {
  fetch: {
    credentials: "include",
  },
  fetcher: authFetch,
});

export const authClient = createAuthClient({
  baseURL: API_URL,
  basePath: "/auth/api",
  plugins: [
    adminClient(),
    inferAdditionalFields({
      user: {
        merchantId: {
          type: "string",
        },
        branchId: {
          type: "string",
        },
      },
    }),
  ],
});
