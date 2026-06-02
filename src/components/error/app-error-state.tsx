"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { getApiErrorMessage } from "../api-response";

export default function AppErrorState({
  error,
  reset,
  title = "Алдаа гарлаа",
  description = "Хуудас ачаалах үед асуудал гарсан тул дахин оролдоно уу.",
}: {
  error?: Error & { digest?: string };
  reset: () => void;
  title?: string;
  description?: string;
}) {
  const errorMessage = getApiErrorMessage(error, description);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl rounded-[28px] border border-rose-200/80 bg-white/95 p-8 text-center shadow-[0_24px_64px_-42px_rgba(15,23,42,0.35)]">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
          <AlertTriangle className="h-7 w-7" />
        </div>

        <h1 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950">
          {title}
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">{errorMessage}</p>

        <div className="mt-6 flex justify-center">
          <Button className="rounded-2xl px-5" onClick={reset}>
            <RefreshCw className="h-4 w-4" />
            Дахин оролдох
          </Button>
        </div>
      </div>
    </div>
  );
}
