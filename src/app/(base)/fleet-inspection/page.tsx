"use client";

import { EmptyState, MetricCard, PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { apiClient } from "@/lib/authClient";
import { cn } from "@/lib/utils";
import { getCookie } from "cookies-next";
import {
  CalendarClock,
  ClipboardCheck,
  FileText,
  Gauge,
  Plus,
  RefreshCw,
  Search,
  Truck,
  Wrench,
  X,
} from "lucide-react";
import { FormEvent, ReactNode, useCallback, useEffect, useMemo, useState } from "react";

import {
  fleetInspectionResultFilters,
  fleetInspectionResultStyle,
  fleetInspectionStateFilters,
  fleetInspectionStateStyle,
  FleetInspectionFieldResult,
  FleetInspectionItem,
  FleetInspectionQueryParams,
  FleetInspectionResult,
  FleetInspectionState,
  FleetInspectionTemplate,
  FleetInspectionTemplateField,
  FleetMachine,
  formatFleetInspectionDate,
  formatFleetNumber,
  getMachineLabel,
  getMachineSubtitle,
  matchesFleetInspectionSearch,
} from "./_types/fleet-inspection";

type CreateState = Extract<FleetInspectionState, "CREATED" | "SCHEDULED" | "IN_PROGRESS">;

const createStateOptions: { label: string; value: CreateState }[] = [
  { label: "Үүссэн", value: "CREATED" },
  { label: "Товлосон", value: "SCHEDULED" },
  { label: "Явагдаж буй", value: "IN_PROGRESS" },
];

const PAGE_SIZE = 25;

export default function FleetInspectionPage() {
  const [items, setItems] = useState<FleetInspectionItem[]>([]);
  const [templates, setTemplates] = useState<FleetInspectionTemplate[]>([]);
  const [machines, setMachines] = useState<FleetMachine[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [stateFilter, setStateFilter] = useState<FleetInspectionState | "ALL">("ALL");
  const [resultFilter, setResultFilter] = useState<FleetInspectionResult | "ALL">("ALL");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<FleetInspectionItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [templateId, setTemplateId] = useState("");
  const [machineId, setMachineId] = useState("");
  const [createState, setCreateState] = useState<CreateState>("CREATED");
  const [note, setNote] = useState("");

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const token = getCookie("token");
      if (!token) throw new Error("Authentication token is missing");

      const query: FleetInspectionQueryParams = {
        pagination: { page, size: PAGE_SIZE },
      };
      if (stateFilter !== "ALL") query.state = stateFilter;
      if (resultFilter !== "ALL") query.stateResult = resultFilter;

      const response = await apiClient.api.fleet.inspection.get({
        query,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.error || !response.data) throw response.error;

      setItems(response.data.result);
      setTotal(response.data.totalCount);
      setTotalPage(response.data.totalPage);
    } catch (cause) {
      console.error("Failed to fetch fleet inspections:", cause);
      setError("Fleet inspection жагсаалт авахад алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  }, [page, resultFilter, stateFilter]);

  const loadOptions = useCallback(async () => {
    try {
      setOptionsLoading(true);
      setFormError(null);

      const token = getCookie("token");
      if (!token) throw new Error("Authentication token is missing");

      const [templateResponse, machineResponse] = await Promise.all([
        apiClient.api.fleet.inspection.template.get({
          query: { pagination: { page: 1, size: 100 } },
          headers: { Authorization: `Bearer ${token}` },
        }),
        apiClient.api.fleet.machine.get({
          query: { pagination: { page: 1, size: 100 } },
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (templateResponse.error || !templateResponse.data) throw templateResponse.error;
      if (machineResponse.error || !machineResponse.data) throw machineResponse.error;

      setTemplates(templateResponse.data.result);
      setMachines(machineResponse.data.result);
      setTemplateId((current) => current || templateResponse.data.result[0]?.id || "");
      setMachineId((current) => current || machineResponse.data.result[0]?.id || "");
    } catch (cause) {
      console.error("Failed to fetch fleet inspection options:", cause);
      setFormError("Template эсвэл машин татахад алдаа гарлаа.");
    } finally {
      setOptionsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timeoutId);
  }, [load]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => void loadOptions(), 0);
    return () => window.clearTimeout(timeoutId);
  }, [loadOptions]);

  const visibleItems = useMemo(
    () => items.filter((item) => matchesFleetInspectionSearch(item, search)),
    [items, search]
  );

  const counts = useMemo(
    () => ({
      total,
      visible: visibleItems.length,
      completed: items.filter((item) => item.inspection.state === "COMPLETED").length,
      failed: items.filter((item) => item.inspection.stateResult === "FAILED").length,
    }),
    [items, total, visibleItems.length]
  );

  const createInspection = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setCreating(true);
      setFormError(null);

      if (!templateId || !machineId) {
        setFormError("Template болон машин сонгоно уу.");
        return;
      }

      const token = getCookie("token");
      if (!token) throw new Error("Authentication token is missing");

      const response = await apiClient.api.fleet.inspection.post(
        {
          templateId,
          machineId,
          state: createState,
          note: note.trim() || undefined,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.error) throw response.error;

      setNote("");
      await load();
    } catch (cause) {
      console.error("Failed to create fleet inspection:", cause);
      setFormError("Fleet inspection үүсгэхэд алдаа гарлаа.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <PageShell
      eyebrow="Fleet"
      title="Fleet inspection"
      description="Машин, тоног төхөөрөмжийн үзлэгийн бүртгэл."
      icon={<Truck className="size-5" />}
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
      <section className="grid gap-3 sm:grid-cols-4">
        <MetricCard
          label="Нийт"
          value={String(counts.total)}
          description="Бүртгэл"
          tone="blue"
          icon={<ClipboardCheck className="size-5" />}
        />
        <MetricCard
          label="Харагдаж буй"
          value={String(counts.visible)}
          description="Одоогийн шүүлтүүр"
          tone="slate"
          icon={<Search className="size-5" />}
        />
        <MetricCard
          label="Дууссан"
          value={String(counts.completed)}
          description="Дууссан төлөв"
          tone="emerald"
          icon={<CalendarClock className="size-5" />}
        />
        <MetricCard
          label="Failed"
          value={String(counts.failed)}
          description="Унасан үр дүн"
          tone="amber"
          icon={<Wrench className="size-5" />}
        />
      </section>

      <form
        onSubmit={(event) => void createInspection(event)}
        className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-slate-950">Fleet inspection үүсгэх</h2>
            <p className="mt-1 text-sm text-slate-500">Шинэ үзлэгийн бүртгэл.</p>
          </div>
          <Button
            type="submit"
            size="sm"
            disabled={creating || optionsLoading || !templateId || !machineId}
          >
            <Plus className="size-4" />
            {creating ? "Үүсгэж байна" : "Үүсгэх"}
          </Button>
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_1fr_160px]">
          <div className="space-y-1.5">
            <Label htmlFor="fleet-inspection-template">Template</Label>
            <select
              id="fleet-inspection-template"
              value={templateId}
              onChange={(event) => setTemplateId(event.target.value)}
              disabled={optionsLoading || templates.length === 0}
              className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-400"
            >
              {templates.length === 0 && <option value="">Template алга</option>}
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="fleet-inspection-machine">Машин</Label>
            <select
              id="fleet-inspection-machine"
              value={machineId}
              onChange={(event) => setMachineId(event.target.value)}
              disabled={optionsLoading || machines.length === 0}
              className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-400"
            >
              {machines.length === 0 && <option value="">Машин алга</option>}
              {machines.map((machine) => (
                <option key={machine.id} value={machine.id}>
                  {getMachineLabel(machine)}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="fleet-inspection-state">Төлөв</Label>
            <select
              id="fleet-inspection-state"
              value={createState}
              onChange={(event) => setCreateState(event.target.value as CreateState)}
              className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-blue-500"
            >
              {createStateOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-3">
          <Label htmlFor="fleet-inspection-note" className="mb-1.5">
            Тэмдэглэл
          </Label>
          <Input
            id="fleet-inspection-note"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Нэмэлт тэмдэглэл"
          />
        </div>

        {formError && <p className="mt-3 text-sm font-medium text-rose-600">{formError}</p>}
      </form>

      <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row">
          <label className="relative block min-w-0 flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={search}
              onChange={(event) => {
                setPage(1);
                setSearch(event.target.value);
              }}
              className="pr-9 pl-9"
              placeholder="Улсын дугаар, asset, VIN, template"
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
          </label>
        </div>

        <FilterRow
          label="Төлөв"
          options={fleetInspectionStateFilters}
          value={stateFilter}
          onChange={(value) => {
            setPage(1);
            setStateFilter(value);
          }}
        />
        <FilterRow
          label="Үр дүн"
          options={fleetInspectionResultFilters}
          value={resultFilter}
          onChange={(value) => {
            setPage(1);
            setResultFilter(value);
          }}
        />
      </section>

      {error && <EmptyState title="Мэдээлэл авах боломжгүй" description={error} />}
      {loading && (
        <EmptyState title="Уншиж байна" description="Fleet inspection жагсаалт татаж байна..." />
      )}
      {!loading && !error && visibleItems.length === 0 && (
        <EmptyState
          title="Fleet inspection олдсонгүй"
          description="Шүүлтүүр эсвэл хайлтын утгаа өөрчилж шалгана уу."
        />
      )}

      {!loading && !error && visibleItems.length > 0 && (
        <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          {visibleItems.map((item) => (
            <FleetInspectionRow key={item.inspection.id} item={item} onSelect={setSelected} />
          ))}
        </section>
      )}

      {!loading && !error && (
        <PaginationControls
          disabled={loading}
          page={page}
          pageSize={PAGE_SIZE}
          totalCount={total}
          totalPage={totalPage}
          visibleCount={items.length}
          onPageChange={setPage}
        />
      )}

      <FleetInspectionDetailDialog
        item={selected}
        onOpenChange={(open) => !open && setSelected(null)}
      />
    </PageShell>
  );
}

function FilterRow<TValue extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { label: string; value: TValue }[];
  value: TValue;
  onChange: (value: TValue) => void;
}) {
  return (
    <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
      <span className="w-16 shrink-0 text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
        {label}
      </span>
      <div className="flex gap-2 overflow-x-auto">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "h-9 shrink-0 rounded-full px-3 text-xs font-semibold transition",
              value === option.value
                ? "bg-slate-950 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function FleetInspectionRow({
  item,
  onSelect,
}: {
  item: FleetInspectionItem;
  onSelect: (item: FleetInspectionItem) => void;
}) {
  const stateBadge = fleetInspectionStateStyle[item.inspection.state];
  const resultBadge = item.inspection.stateResult
    ? fleetInspectionResultStyle[item.inspection.stateResult]
    : null;

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className="w-full border-b border-slate-100 px-4 py-3 text-left transition last:border-b-0 hover:bg-slate-50"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <Truck className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-950">
              {getMachineLabel(item.machine)}
            </p>
            <p className="truncate text-sm text-slate-500">
              {item.template?.name ?? "Template байхгүй"}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <Badge className={stateBadge.className}>{stateBadge.label}</Badge>
          {resultBadge && <Badge className={resultBadge.className}>{resultBadge.label}</Badge>}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <Gauge className="size-3.5" />
          {formatFleetNumber(item.inspection.mileageKm, "км")}
        </span>
        <span className="flex items-center gap-1">
          <Wrench className="size-3.5" />
          {formatFleetNumber(item.inspection.hours, "цаг")}
        </span>
        <span className="flex items-center gap-1">
          <CalendarClock className="size-3.5" />
          {formatFleetInspectionDate(item.inspection.createdAt)}
        </span>
        <span className="min-w-0 truncate">{getMachineSubtitle(item.machine)}</span>
      </div>
    </button>
  );
}

function FleetInspectionDetailDialog({
  item,
  onOpenChange,
}: {
  item: FleetInspectionItem | null;
  onOpenChange: (open: boolean) => void;
}) {
  const [results, setResults] = useState<FleetInspectionFieldResult[]>([]);
  const [fields, setFields] = useState<FleetInspectionTemplateField[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (!item) {
        setResults([]);
        setFields([]);
        setError(null);
      }
    }, 0);

    if (!item) {
      return () => window.clearTimeout(timeoutId);
    }

    let active = true;

    const loadDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = getCookie("token");
        if (!token) throw new Error("Authentication token is missing");

        const [resultResponse, fieldResponse] = await Promise.all([
          apiClient.api.fleet.inspection["field-result"].get({
            query: {
              inspectionId: item.inspection.id,
              pagination: { page: 1, size: 200 },
            },
            headers: { Authorization: `Bearer ${token}` },
          }),
          apiClient.api.fleet.inspection.template({ id: item.inspection.templateId }).field.get({
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!active) return;
        if (resultResponse.error || !resultResponse.data) throw resultResponse.error;

        setResults(resultResponse.data.result);
        setFields(fieldResponse.data ? (fieldResponse.data as FleetInspectionTemplateField[]) : []);
      } catch (cause) {
        if (!active) return;
        console.error("Failed to fetch fleet inspection detail:", cause);
        setError("Inspection detail татахад алдаа гарлаа.");
      } finally {
        if (active) setLoading(false);
      }
    };

    window.clearTimeout(timeoutId);
    const detailTimeoutId = window.setTimeout(() => void loadDetail(), 0);

    return () => {
      active = false;
      window.clearTimeout(detailTimeoutId);
    };
  }, [item]);

  const fieldById = useMemo(() => new Map(fields.map((field) => [field.id, field])), [fields]);

  if (!item) return null;

  const stateBadge = fleetInspectionStateStyle[item.inspection.state];
  const resultBadge = item.inspection.stateResult
    ? fleetInspectionResultStyle[item.inspection.stateResult]
    : null;

  return (
    <Dialog open={Boolean(item)} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85svh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader className="pr-7">
          <DialogTitle className="break-words">{getMachineLabel(item.machine)}</DialogTitle>
          <DialogDescription>
            {item.template?.name ?? "Template байхгүй"} / {item.inspection.id}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap gap-2">
          <Badge className={stateBadge.className}>{stateBadge.label}</Badge>
          {resultBadge && <Badge className={resultBadge.className}>{resultBadge.label}</Badge>}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <DetailBox label="Машин" value={getMachineSubtitle(item.machine)} />
          <DetailBox label="Байгууллага" value={item.machine?.companyId ?? "-"} />
          <DetailBox label="Үүссэн" value={formatFleetInspectionDate(item.inspection.createdAt)} />
          <DetailBox
            label="Товлосон"
            value={formatFleetInspectionDate(item.inspection.timeScheduled)}
          />
          <DetailBox
            label="Дууссан"
            value={formatFleetInspectionDate(item.inspection.timeCompleted)}
          />
          <DetailBox label="Гүйлт" value={formatFleetNumber(item.inspection.mileageKm, "км")} />
        </div>

        {item.inspection.note && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
              Тэмдэглэл
            </p>
            <p className="mt-1 whitespace-pre-wrap text-sm text-slate-700">
              {item.inspection.note}
            </p>
          </div>
        )}

        <section className="rounded-xl border border-slate-200">
          <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
              <FileText className="size-4 text-blue-600" />
              Үзлэгийн үр дүн
            </div>
            {loading && <RefreshCw className="size-4 animate-spin text-slate-400" />}
          </div>

          {error && <p className="p-3 text-sm text-rose-600">{error}</p>}
          {!loading && !error && results.length === 0 && (
            <p className="p-3 text-sm text-slate-500">Үр дүн бүртгэгдээгүй байна.</p>
          )}

          <div className="divide-y divide-slate-100">
            {results.map((result) => {
              const field = fieldById.get(result.templateFieldId);
              const value = result.result ?? result.numeric?.toLocaleString("mn-MN") ?? "-";

              return (
                <div key={result.id} className="px-3 py-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="break-words text-sm font-medium text-slate-900">
                        {field?.description ||
                          field?.code ||
                          field?.fieldGroup ||
                          result.templateFieldId}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {field?.fieldGroup ?? field?.fieldType ?? "Field"}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                      {value}
                    </span>
                  </div>
                  {result.comment && (
                    <p className="mt-2 whitespace-pre-wrap text-sm text-slate-600">
                      {result.comment}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}

function DetailBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-3">
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">{label}</p>
      <p className="mt-1 break-words text-sm font-medium text-slate-900">{value}</p>
    </div>
  );
}

function Badge({ className, children }: { className: string; children: ReactNode }) {
  return (
    <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1", className)}>
      {children}
    </span>
  );
}
