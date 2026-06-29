"use client";

import { EmptyState, MetricCard, PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { apiClient } from "@/lib/authClient";
import { cn } from "@/lib/utils";
import { getCookie } from "cookies-next";
import { CarFront, ClipboardCheck, RefreshCw, ShieldCheck } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { InspectionDetailDialog } from "./_components/organisms/inspection-detail-dialog";
import { InspectionFilters } from "./_components/molecules/inspection-filters";
import { InspectionList } from "./_components/organisms/inspection-list";
import { InspectionItem, Status } from "./_types/inspection";

const PAGE_SIZE = 25;

export default function InspectionPage() {
  const [items, setItems] = useState<InspectionItem[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [filter, setFilter] = useState<Status | "ALL">("ALL");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<InspectionItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const counts = useMemo(
    () => ({
      total,
      visible: items.length,
      checked: items.reduce(
        (sum, item) =>
          sum +
          (item.inspection.inspection?.reduce(
            (groupSum, group) => groupSum + group.values.length,
            0
          ) ?? 0),
        0
      ),
    }),
    [items, total]
  );

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const token = getCookie("token");
      if (!token) throw new Error("Authentication token is missing");

      const response = await apiClient.api.crm.inspection.get({
        query: {
          pagination: { page, size: PAGE_SIZE },
          ...(filter !== "ALL" ? { status: filter } : {}),
          ...(search.trim() ? { licensePlate: search.trim() } : {}),
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.error || !response.data) throw response.error;

      setItems(response.data.result);
      setTotal(response.data.totalCount);
      setTotalPage(response.data.totalPage);
    } catch (cause) {
      console.error("Failed to fetch CRM inspections:", cause);
      setError("Анхан үзлэгийн жагсаалт авахад алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  }, [filter, page, search]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => void load(), search.trim() ? 300 : 0);
    return () => window.clearTimeout(timeoutId);
  }, [load, search]);

  return (
    <PageShell
      eyebrow="Inspections"
      title="Анхан үзлэгүүд"
      description="Бүртгэгдсэн үзлэгүүдийг улсын дугаар болон төлөвөөр хайж шалгана."
      icon={<ClipboardCheck className="size-5" />}
      action={
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Дахин ачаалах"
          onClick={() => void load()}
        >
          <RefreshCw className={cn("size-4", loading && "animate-spin")} />
        </Button>
      }
    >
      <section className="grid gap-3 sm:grid-cols-3">
        <MetricCard
          label="Нийт"
          value={String(counts.total)}
          description="Бүртгэгдсэн үзлэг"
          tone="blue"
          icon={<ClipboardCheck className="size-5" />}
        />
        <MetricCard
          label="Харагдаж буй"
          value={String(counts.visible)}
          description="Одоогийн filter"
          tone="emerald"
          icon={<ShieldCheck className="size-5" />}
        />
        <MetricCard
          label="Checklist"
          value={String(counts.checked)}
          description="Нийт шалгасан мөр"
          tone="amber"
          icon={<CarFront className="size-5" />}
        />
      </section>

      <InspectionFilters
        filter={filter}
        search={search}
        onFilterChange={(value) => {
          setPage(1);
          setFilter(value);
        }}
        onSearchChange={(value) => {
          setPage(1);
          setSearch(value);
        }}
      />

      {error && <EmptyState title="Мэдээлэл авах боломжгүй" description={error} />}
      {loading && (
        <EmptyState title="Уншиж байна" description="Анхан үзлэгийн жагсаалт татаж байна..." />
      )}
      {!loading && !error && items.length === 0 && (
        <EmptyState
          title="Үзлэг олдсонгүй"
          description="Хайлтын утга эсвэл төлөвийн filter-ээ өөрчилж шалгана уу."
        />
      )}

      {!loading && !error && items.length > 0 && (
        <>
          <InspectionList items={items} onSelect={setSelected} />
          <PaginationControls
            disabled={loading}
            page={page}
            pageSize={PAGE_SIZE}
            totalCount={total}
            totalPage={totalPage}
            visibleCount={items.length}
            onPageChange={setPage}
          />
        </>
      )}

      <InspectionDetailDialog item={selected} onOpenChange={(open) => !open && setSelected(null)} />
    </PageShell>
  );
}
