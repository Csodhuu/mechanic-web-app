import { cn } from "@/lib/utils";
import { ArrowLeft, RefreshCw } from "lucide-react";

type ControlHeaderProps = {
  loading: boolean;
  onBack: () => void;
  onRefresh: () => void;
};

export function ControlHeader({ loading, onBack, onRefresh }: ControlHeaderProps) {
  return (
    <header className="mb-4 pt-[env(safe-area-inset-top)]">
      <div className="grid h-14 grid-cols-[48px_1fr_48px] items-center">
        <button
          type="button"
          aria-label="Буцах"
          onClick={onBack}
          className="flex h-11 w-11 items-center justify-center text-blue-600"
        >
          <ArrowLeft className="h-8 w-8" strokeWidth={2.4} />
        </button>
        <div className="min-w-0 text-center">
          <h1 className="truncate text-lg font-bold leading-6 text-[#101735] sm:text-[20px]">
            Засвар үйлчилгээ
          </h1>
          <p className="truncate text-[13px] font-medium text-slate-500">
            Эхлэхэд бэлэн болон явагдаж буй ажлууд
          </p>
        </div>
        <button
          type="button"
          aria-label="Дахин ачаалах"
          onClick={onRefresh}
          className="ml-auto flex h-11 w-11 items-center justify-center text-blue-600"
        >
          <RefreshCw className={cn("h-7 w-7", loading && "animate-spin")} strokeWidth={2.2} />
        </button>
      </div>
    </header>
  );
}
