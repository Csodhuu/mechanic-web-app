import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationControlsProps = {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPage?: number;
  visibleCount: number;
  disabled?: boolean;
  embedded?: boolean;
  onPageChange: (page: number) => void;
};

export function PaginationControls({
  page,
  pageSize,
  totalCount,
  totalPage,
  visibleCount,
  disabled = false,
  embedded = false,
  onPageChange,
}: PaginationControlsProps) {
  const pageCount = Math.max(totalPage ?? Math.ceil(totalCount / pageSize), 1);
  const safePage = Math.min(Math.max(page, 1), pageCount);
  const start = totalCount === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const end = totalCount === 0 ? 0 : Math.min(start + visibleCount - 1, totalCount);

  if (pageCount <= 1 && totalCount <= pageSize) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5",
        embedded
          ? "border-t border-slate-100"
          : "rounded-2xl border border-slate-200 bg-white shadow-sm"
      )}
    >
      <p className="text-xs font-medium text-slate-500">
        {start}-{end} / {totalCount} · Хуудас {safePage}/{pageCount}
      </p>
      <div className="grid grid-cols-2 gap-2 sm:flex">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled || safePage <= 1}
          onClick={() => onPageChange(safePage - 1)}
        >
          <ChevronLeft className="size-4" />
          Өмнөх
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled || safePage >= pageCount}
          onClick={() => onPageChange(safePage + 1)}
        >
          Дараах
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
