"use client";

import AppErrorState from "@/components/error/app-error-state";
import { useEffect } from "react";

export default function BaseAppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Base route error:", error);
  }, [error]);

  return (
    <AppErrorState
      error={error}
      reset={reset}
      title="Хуудас түр доголдлоо"
      description="Өгөгдөл боловсруулах үед алдаа гарсан тул дахин ачаална уу."
    />
  );
}
