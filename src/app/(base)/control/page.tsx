"use client";

import { apiClient } from "@/lib/authClient";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { getCookie } from "cookies-next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { ControlSearch } from "./_components/molecules/control-search";
import { ControlHeader } from "./_components/organisms/control-header";
import { ControlOrderList } from "./_components/organisms/control-order-list";
import { ControlTabs } from "./_components/organisms/control-tabs";
import { OrderItem, OrderState } from "./_types/control";

const PAGE_SIZE = 25;

function getHeaders() {
  const token = getCookie("token");
  return token ? { Authorization: `Bearer ${token}` } : undefined;
}

export default function Control() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialState = useMemo(() => {
    const value = searchParams.get("state");
    if (value === "CREATED" || value === "PROGRESSING" || value === "COMPLETE") return value;
    return "CREATED";
  }, [searchParams]);

  const [activeState, setActiveState] = useState<OrderState>(initialState);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [page, setPage] = useState(1);
  const [activeTotalCount, setActiveTotalCount] = useState(0);
  const [activeTotalPage, setActiveTotalPage] = useState(1);
  const [counts, setCounts] = useState<Record<OrderState, number>>({
    CREATED: 0,
    PROGRESSING: 0,
    COMPLETE: 0,
  });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mutatingId, setMutatingId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTabChange = useCallback(
    (nextState: OrderState) => {
      setActiveState(nextState);
      setPage(1);

      const params = new URLSearchParams(searchParams.toString());
      if (nextState === "CREATED") {
        params.delete("state");
      } else {
        params.set("state", nextState);
      }

      const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
      router.replace(nextUrl, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const headers = getHeaders();
      if (!headers) {
        setError("Нэвтрэх token олдсонгүй.");
        return;
      }

      const searchValue = search.trim();
      const queryBase = {
        pagination: { page, size: PAGE_SIZE },
        ...(searchValue ? { licensePlate: searchValue } : {}),
      };

      const [createdRes, progressingRes, completeRes, activeRes] = await Promise.all([
        apiClient.api.crm["cp-order"].get({
          query: { ...queryBase, state: "CREATED" },
          headers,
        }),
        apiClient.api.crm["cp-order"].get({
          query: { ...queryBase, state: "PROGRESSING" },
          headers,
        }),
        apiClient.api.crm["cp-order"].get({
          query: { ...queryBase, state: "COMPLETE" },
          headers,
        }),
        apiClient.api.crm["cp-order"].get({
          query: { ...queryBase, state: activeState },
          headers,
        }),
      ]);

      if (createdRes.error || progressingRes.error || completeRes.error || activeRes.error) {
        throw createdRes.error || progressingRes.error || completeRes.error || activeRes.error;
      }

      setCounts({
        CREATED: createdRes.data?.totalCount ?? 0,
        PROGRESSING: progressingRes.data?.totalCount ?? 0,
        COMPLETE: completeRes.data?.totalCount ?? 0,
      });
      setOrders(activeRes.data?.result ?? []);
      setActiveTotalCount(activeRes.data?.totalCount ?? 0);
      setActiveTotalPage(activeRes.data?.totalPage ?? 1);
    } catch (fetchError) {
      console.error("Failed to fetch control orders:", fetchError);
      setError("Засвар үйлчилгээний ажлуудыг уншихад алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  }, [activeState, page, search]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => void loadData(), search.trim() ? 300 : 0);
    return () => window.clearTimeout(timeoutId);
  }, [loadData, refreshKey, search]);

  const startControl = async (item: OrderItem) => {
    try {
      setMutatingId(item.order.id);
      const headers = getHeaders();
      if (!headers) {
        toast.error("Нэвтрэх token олдсонгүй.");
        return;
      }

      const response = await apiClient.api.crm["cp-order"]({ id: item.order.id }).put(
        {
          state: "PROGRESSING",
          isQualityCheck: true,
        },
        { headers }
      );

      if (response.error || !response.data) throw response.error;

      toast.success("Засвар үйлчилгээ эхэллээ.");
      setRefreshKey((current) => current + 1);
      if (activeState === "CREATED") {
        handleTabChange("PROGRESSING");
      }
    } catch (mutateError) {
      console.error("Failed to start repair service:", mutateError);
      toast.error("Засвар үйлчилгээ эхлүүлэхэд алдаа гарлаа.");
    } finally {
      setMutatingId(null);
    }
  };

  const completeControl = async (item: OrderItem) => {
    try {
      setMutatingId(item.order.id);
      const headers = getHeaders();
      if (!headers) {
        toast.error("Нэвтрэх token олдсонгүй.");
        return;
      }

      const response = await apiClient.api.crm["cp-order"].complete.post(
        {
          id: item.order.id,
          km: item.vehicle?.km ?? item.order.km,
        },
        { headers }
      );

      if (response.error || !response.data) throw response.error;

      toast.success("Засвар үйлчилгээ дууслаа.");
      setRefreshKey((current) => current + 1);
      if (activeState === "PROGRESSING") {
        handleTabChange("COMPLETE");
      }
    } catch (mutateError) {
      console.error("Failed to complete repair service:", mutateError);
      toast.error("Засвар үйлчилгээ дуусгахад алдаа гарлаа.");
    } finally {
      setMutatingId(null);
    }
  };

  const openDetail = (id: string) => {
    router.push(`/service-order-detail?id=${encodeURIComponent(id)}`);
  };

  return (
    <div className="mx-auto min-h-[calc(100svh-8rem)] w-full max-w-[1120px] px-4 pb-[calc(6rem+env(safe-area-inset-bottom))] pt-2 sm:px-6 lg:px-8">
      <ControlHeader
        loading={loading}
        onBack={() => router.back()}
        onRefresh={() => setRefreshKey((current) => current + 1)}
      />

      <ControlTabs activeState={activeState} counts={counts} onChange={handleTabChange} />
      <ControlSearch
        value={search}
        onChange={(value) => {
          setPage(1);
          setSearch(value);
        }}
      />

      {error && (
        <div className="mt-3 rounded-[15px] border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <ControlOrderList
        error={error}
        loading={loading}
        mutatingId={mutatingId}
        orders={orders}
        onOpenDetail={openDetail}
        onStartControl={(item) => void startControl(item)}
        onCompleteControl={(item) => void completeControl(item)}
      />

      {!error && (
        <PaginationControls
          disabled={loading}
          page={page}
          pageSize={PAGE_SIZE}
          totalCount={activeTotalCount}
          totalPage={activeTotalPage}
          visibleCount={orders.length}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
