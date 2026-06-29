"use client";

import { apiClient } from "@/lib/authClient";
import { Input } from "@/components/ui/input";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import { CalendarClock, CarFront, ChevronRight, Gauge, Phone, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CpOrderQuery } from "../../_types/cp-order";

const statusFilters = [
  { value: "ALL", label: "Бүгд" },
  { value: "CREATED", label: "Шинэ" },
  { value: "PROGRESSING", label: "Засвар явагдаж буй" },
  { value: "COMPLETE", label: "Дууссан" },
] as const;

const searchFields = [
  { value: "licensePlate", label: "Улсын дугаар", placeholder: "Жишээ: 1234 УБА" },
  { value: "vin", label: "Арлын дугаар", placeholder: "Арлын дугаар оруулна уу" },
  { value: "phone", label: "Утас", placeholder: "Утасны дугаар оруулна уу" },
  { value: "model", label: "Модель", placeholder: "Модель оруулна уу" },
] as const;

type StatusFilter = (typeof statusFilters)[number]["value"];
type SearchField = (typeof searchFields)[number]["value"];
type CpOrderQueryParams = Parameters<(typeof apiClient.api.crm)["cp-order"]["get"]>[0]["query"];

const formatDate = (value?: string | null) =>
  value ? dayjs(value).format("YYYY-MM-DD HH.mm") : "-";

const PAGE_SIZE = 10;

export default function ServiceList({ refreshKey }: { refreshKey: number }) {
  const router = useRouter();
  const [data, setData] = useState<CpOrderQuery | null>();
  const [isLoading, setLoading] = useState(false);
  const [status, setStatus] = useState<StatusFilter>("ALL");
  const [searchField, setSearchField] = useState<SearchField>("licensePlate");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const openDetail = (id: string) => {
    router.push(`/service-order-detail?id=${encodeURIComponent(id)}`);
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        if (isMounted) setLoading(true);
        const token = getCookie("token");
        if (!token) return;

        const query: CpOrderQueryParams = { pagination: { page, size: PAGE_SIZE } };
        if (status !== "ALL") query.state = status;

        const searchValue = search.trim();
        if (searchValue) {
          if (searchField === "licensePlate") query.licensePlate = searchValue;
          if (searchField === "vin") query.vin = searchValue;
          if (searchField === "phone") query.phone = searchValue;
          if (searchField === "model") query.model = searchValue;
        }

        const res = await apiClient.api.crm["cp-order"].get({
          query,
          headers: { Authorization: `Bearer ${token}` },
        });
        if (isMounted) setData(res.data);
      } catch (error) {
        console.error("Failed to fetch service orders:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    const debounceId = window.setTimeout(fetchData, search.trim() ? 350 : 0);
    return () => {
      isMounted = false;
      window.clearTimeout(debounceId);
    };
  }, [page, refreshKey, search, searchField, status]);

  const orders = data?.result ?? [];

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 sm:px-5">
        <div>
          <h2 className="text-base font-semibold text-slate-950">Засвар үйлчилгээ</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Нийт {data?.totalCount ?? orders.length} захиалга
          </p>
        </div>
        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
          Идэвхтэй
        </span>
      </div>

      <div className="border-b border-slate-100 px-4 py-3 sm:px-5">
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={search}
              onChange={(event) => {
                setPage(1);
                setSearch(event.target.value);
              }}
              placeholder={searchFields.find((field) => field.value === searchField)?.placeholder}
              className="h-9 pr-9 pl-9 text-sm"
            />
            {search && (
              <button
                type="button"
                aria-label="Хайлтыг арилгах"
                onClick={() => {
                  setPage(1);
                  setSearch("");
                }}
                className="absolute top-1/2 right-2 flex size-6 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
          <select
            value={searchField}
            onChange={(event) => {
              setPage(1);
              setSearchField(event.target.value as SearchField);
            }}
            aria-label="Хайлтын төрөл"
            className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 sm:w-40"
          >
            {searchFields.map((field) => (
              <option key={field.value} value={field.value}>
                {field.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-2 flex gap-1.5 overflow-x-auto pb-0.5">
          {statusFilters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => {
                setPage(1);
                setStatus(filter.value);
              }}
              className={`h-7 shrink-0 rounded-full px-3 text-xs font-medium transition-colors ${
                status === filter.value
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {isLoading && <ListMessage>Уншиж байна...</ListMessage>}

        {!isLoading && orders.length === 0 && (
          <ListMessage>Засвар үйлчилгээний ажил олдсонгүй.</ListMessage>
        )}

        {orders.map((item, index) => {
          const vehicleName = [item.make?.name, item.model?.name].filter(Boolean).join(" ");

          return (
            <article
              key={item.order.id ?? index}
              role="button"
              tabIndex={0}
              className="group grid cursor-pointer grid-cols-[36px_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 transition-colors hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none sm:grid-cols-[40px_minmax(0,1fr)_auto_auto] sm:px-5"
              onClick={() => openDetail(item.order.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openDetail(item.order.id);
                }
              }}
            >
              <div className="flex size-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 sm:size-10">
                <CarFront className="size-4" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="truncate text-sm font-semibold text-slate-900">
                    {vehicleName || "Машины мэдээлэлгүй"}
                  </h3>
                  <span className="hidden shrink-0 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 sm:inline-flex">
                    {item.order.state}
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                  <span className="font-medium text-slate-700">
                    {item.vehicle?.licensePlate ?? "Дугааргүй"}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Gauge className="size-3" />
                    {item.vehicle?.km ?? item.order.km ?? "-"} км
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <CalendarClock className="size-3" />
                    {formatDate(item.order.createdAt)}
                  </span>
                  {item.customer?.phoneNumber && (
                    <span className="inline-flex items-center gap-1">
                      <Phone className="size-3" />
                      {item.customer.phoneNumber}
                    </span>
                  )}
                </div>
                <span className="mt-1 inline-flex rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 sm:hidden">
                  {item.order.state}
                </span>
              </div>

              <ChevronRight className="hidden size-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-500 sm:block" />
            </article>
          );
        })}
      </div>

      <PaginationControls
        disabled={isLoading}
        embedded
        page={page}
        pageSize={PAGE_SIZE}
        totalCount={data?.totalCount ?? orders.length}
        totalPage={data?.totalPage}
        visibleCount={orders.length}
        onPageChange={setPage}
      />
    </section>
  );
}

function ListMessage({ children }: { children: React.ReactNode }) {
  return <div className="px-4 py-10 text-center text-sm text-slate-500">{children}</div>;
}
