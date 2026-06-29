"use client";

import { CpOrderQuery } from "@/app/(base)/jobs/_types/cp-order";
import { EmptyState, PageShell } from "@/components/page-shell";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { apiClient } from "@/lib/authClient";
import { getCookie } from "cookies-next";
import { History as HistoryIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { HistoryList } from "./_components/organisms/history-list";
import { HistorySummary } from "./_components/organisms/history-summary";
import { groupByCompletedDate } from "./_types/history";

const PAGE_SIZE = 25;

export default function History() {
  const router = useRouter();
  const [data, setData] = useState<CpOrderQuery | null>();
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const orders = useMemo(() => data?.result ?? [], [data?.result]);
  const groupedHistories = useMemo(() => groupByCompletedDate(orders), [orders]);

  const openDetail = (id: string) => {
    router.push(`/service-order-detail?id=${encodeURIComponent(id)}`);
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        if (isMounted) {
          setLoading(true);
          setError(null);
        }

        const token = getCookie("token");
        if (!token) {
          if (isMounted) setError("Нэвтрэх token олдсонгүй.");
          return;
        }

        const res = await apiClient.api.crm["cp-order"].get({
          query: {
            state: "COMPLETE",
            pagination: { page, size: PAGE_SIZE },
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (isMounted) setData(res.data);
      } catch (cause) {
        console.error("Failed to fetch completed orders:", cause);
        if (isMounted) setError("Дууссан ажлын түүх авахад алдаа гарлаа.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    void fetchData();

    return () => {
      isMounted = false;
    };
  }, [page]);

  return (
    <PageShell
      eyebrow="Archive"
      title="Засварын түүх"
      description="Дууссан service order-ууд, харилцагч болон машины мэдээлэл."
      icon={<HistoryIcon className="size-5" />}
    >
      <HistorySummary totalCount={data?.totalCount ?? orders.length} visibleCount={orders.length} />

      {isLoading && (
        <EmptyState title="Уншиж байна" description="Дууссан ажлуудыг татаж байна..." />
      )}
      {!isLoading && error && <EmptyState title="Мэдээлэл авах боломжгүй" description={error} />}
      {!isLoading && !error && orders.length === 0 && (
        <EmptyState
          title="Түүх хоосон байна"
          description="Засвар үйлчилгээ дууссан service order энд харагдана."
        />
      )}

      {!isLoading && !error && (
        <>
          <HistoryList groups={groupedHistories} onOpen={openDetail} />
          <PaginationControls
            disabled={isLoading}
            page={page}
            pageSize={PAGE_SIZE}
            totalCount={data?.totalCount ?? orders.length}
            totalPage={data?.totalPage}
            visibleCount={orders.length}
            onPageChange={setPage}
          />
        </>
      )}
    </PageShell>
  );
}
