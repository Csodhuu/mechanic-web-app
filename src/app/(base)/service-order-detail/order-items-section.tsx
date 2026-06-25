"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/authClient";
import { getCookie } from "cookies-next";
import { Check, Package, Search, Trash2, Wrench } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type OrderItems = NonNullable<
  Awaited<ReturnType<(typeof apiClient.api.crm)["cp-order"]["item"]["get"]>>["data"]
>;
type CatalogProduct = NonNullable<Awaited<ReturnType<typeof apiClient.api.warehouse.product.get>>["data"]>["result"][number];
type CatalogService = NonNullable<
  Awaited<ReturnType<(typeof apiClient.api.company)["service-kind"]["get"]>>["data"]
>["result"][number];

type CatalogSelection = {
  id: string;
  kind: "product" | "service";
  name: string;
  price: number;
};

export function OrderItemsSection({ orderId, onItemsChanged }: { orderId: string; onItemsChanged: () => void }) {
  const [items, setItems] = useState<OrderItems>([]);
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [services, setServices] = useState<CatalogService[]>([]);
  const [open, setOpen] = useState(false);
  const [catalogType, setCatalogType] = useState<CatalogSelection["kind"]>("service");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<CatalogSelection | null>(null);
  const [quantity, setQuantity] = useState("1");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const getHeaders = useCallback(() => {
    const token = getCookie("token");
    return token ? { Authorization: `Bearer ${token}` } : undefined;
  }, []);

  const loadItems = useCallback(async () => {
    try {
      const response = await apiClient.api.crm["cp-order"].item.get({
        query: { cpOrderId: orderId },
        headers: getHeaders(),
      });
      if (response.error) throw response.error;
      setItems(response.data ?? []);
    } catch (error) {
      console.error("Failed to fetch order items:", error);
      toast.error("Захиалгын бараа, үйлчилгээ уншихад алдаа гарлаа.");
    }
  }, [getHeaders, orderId]);

  useEffect(() => {
    void Promise.resolve().then(loadItems);
  }, [loadItems]);

  useEffect(() => {
    if (!open || products.length || services.length) return;

    const loadCatalog = async () => {
      try {
        setIsLoading(true);
        const headers = getHeaders();
        const [productResponse, serviceResponse] = await Promise.all([
          apiClient.api.warehouse.product.get({
            query: { pagination: { page: 1, size: 50 } },
            headers,
          }),
          apiClient.api.company["service-kind"].get({
            query: { enabled: true, pagination: { page: 1, size: 50 } },
            headers,
          }),
        ]);
        if (productResponse.error) throw productResponse.error;
        if (serviceResponse.error) throw serviceResponse.error;

        setProducts(productResponse.data?.result ?? []);
        setServices(serviceResponse.data?.result ?? []);
      } catch (error) {
        console.error("Failed to fetch item catalogs:", error);
        toast.error("Бараа, үйлчилгээний жагсаалт уншихад алдаа гарлаа.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadCatalog();
  }, [getHeaders, open, products.length, services.length]);

  const catalog = useMemo<CatalogSelection[]>(() => {
    const query = search.trim().toLowerCase();
    const source =
      catalogType === "service"
        ? services.map(({ serviceKind }) => ({
            id: serviceKind.id,
            kind: "service" as const,
            name: serviceKind.name,
            price: serviceKind.price,
          }))
        : products.map(({ product }) => ({
            id: product.id,
            kind: "product" as const,
            name: product.name,
            price: product.priceSell,
          }));

    return query ? source.filter((item) => item.name.toLowerCase().includes(query)) : source;
  }, [catalogType, products, search, services]);

  const addItem = async () => {
    const amount = Number(quantity);
    if (!selected || !Number.isFinite(amount) || amount <= 0) {
      toast.error("Нэмэх бараа, үйлчилгээ болон зөв тоо оруулна уу.");
      return;
    }

    try {
      setIsSaving(true);
      const response = await apiClient.api.crm["cp-order"].item.post({
        cpOrderId: orderId,
        quantity: amount,
        priceUnit: selected.price,
        name: selected.name,
        ...(selected.kind === "service"
          ? { companyServiceKindId: selected.id }
          : { companyProductId: selected.id }),
      });
      if (response.error) throw response.error;

      toast.success("Захиалгад нэмлээ.");
      setOpen(false);
      setSelected(null);
      setSearch("");
      setQuantity("1");
      await loadItems();
      onItemsChanged();
    } catch (error) {
      console.error("Failed to add order item:", error);
      toast.error("Захиалгад нэмэхэд алдаа гарлаа.");
    } finally {
      setIsSaving(false);
    }
  };

  const openCatalog = (kind: CatalogSelection["kind"]) => {
    setCatalogType(kind);
    setSelected(null);
    setSearch("");
    setOpen(true);
  };

  const removeItem = async (itemId: string, name: string) => {
    if (!window.confirm(`"${name}"-г захиалгаас устгах уу?`)) return;

    try {
      setRemovingId(itemId);
      const response = await apiClient.api.crm["cp-order"].item({ id: itemId }).delete({
        query: {},
        headers: getHeaders(),
      });
      if (response.error) throw response.error;

      toast.success("Захиалгын зүйл устгагдлаа.");
      await loadItems();
      onItemsChanged();
    } catch (error) {
      console.error("Failed to remove order item:", error);
      toast.error("Захиалгын зүйлийг устгахад алдаа гарлаа.");
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <Card className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-900">Бараа, үйлчилгээ</h2>
          <p className="mt-0.5 text-xs text-slate-500">{items.length} зүйл нэмэгдсэн</p>
        </div>
        <div className="flex gap-2">
          <ActionButton icon={Wrench} label="Үйлчилгээ" onClick={() => openCatalog("service")} />
          <ActionButton icon={Package} label="Бараа" onClick={() => openCatalog("product")} />
        </div>
      </div>

      {items.length === 0 ? (
        <div className="grid grid-cols-2 gap-2">
          <EmptyAction icon={Wrench} title="Үйлчилгээ нэмэх" detail="Ажил, үйлчилгээ сонгох" onClick={() => openCatalog("service")} />
          <EmptyAction icon={Package} title="Бараа нэмэх" detail="Сэлбэг, бараа сонгох" onClick={() => openCatalog("product")} />
        </div>
      ) : (
        <div className="divide-y divide-slate-100 rounded-xl border border-slate-100">
          {items.map((item) => {
            const isService = Boolean(item.service_kind);
            const name = item.cp_order_item.name ?? item.service_kind?.name ?? item.product?.name ?? "Нэргүй";
            return (
              <div key={item.cp_order_item.id} className="flex items-center gap-3 px-3 py-2.5">
                <span className={`flex size-8 items-center justify-center rounded-lg ${isService ? "bg-violet-50 text-violet-600" : "bg-amber-50 text-amber-600"}`}>
                  {isService ? <Wrench className="size-4" /> : <Package className="size-4" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900">{name}</p>
                  <button
                    type="button"
                    aria-label={`${name} устгах`}
                    disabled={removingId === item.cp_order_item.id}
                    onClick={() => void removeItem(item.cp_order_item.id, name)}
                    className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-rose-600 hover:text-rose-700 disabled:opacity-50"
                  >
                    <Trash2 className="size-3.5" />
                    Устгах
                  </button>
                  <p className="text-xs text-slate-500">Тоо хэмжээ: {item.cp_order_item.quantity}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[85svh] overflow-x-hidden overflow-y-auto gap-3 p-4 sm:max-w-[480px] sm:p-5">
          <DialogHeader className="min-w-0 pr-7">
            <DialogTitle className="break-words text-base">
              {catalogType === "service" ? "Үйлчилгээ сонгох" : "Бараа сонгох"}
            </DialogTitle>
          </DialogHeader>

          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-9 pl-9 text-sm"
              placeholder={catalogType === "service" ? "Үйлчилгээний нэрээр хайх" : "Барааны нэрээр хайх"}
            />
          </div>

          <div className="max-h-52 overflow-y-auto rounded-lg border border-slate-200">
            {isLoading && <p className="p-4 text-center text-sm text-slate-500">Уншиж байна...</p>}
            {!isLoading && catalog.length === 0 && <p className="p-4 text-center text-sm text-slate-500">Илэрц олдсонгүй.</p>}
            {catalog.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelected(item)}
                className={`flex min-w-0 w-full items-center gap-3 border-b border-slate-100 px-3 py-2.5 text-left last:border-0 ${selected?.id === item.id ? "bg-blue-50" : "hover:bg-slate-50"}`}
              >
                <span className="min-w-0 flex-1 overflow-hidden">
                  <span className="line-clamp-2 block break-words text-sm font-medium text-slate-900">{item.name}</span>
                </span>
                {selected?.id === item.id && <Check className="size-4 text-blue-600" />}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
            <div className="min-w-0 flex-1 overflow-hidden">
              <p className="line-clamp-2 break-words text-sm font-medium text-slate-900">{selected?.name ?? "Сонголт хийнэ үү"}</p>
            </div>
            <Input type="number" min="1" value={quantity} onChange={(event) => setQuantity(event.target.value)} className="h-9 w-20 text-center text-sm" aria-label="Тоо хэмжээ" />
          </div>

          <Button type="button" size="sm" className="w-full" disabled={!selected || isSaving} onClick={() => void addItem()}>
            {isSaving ? "Нэмж байна..." : "Захиалгад нэмэх"}
          </Button>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

function ActionButton({ icon: Icon, label, onClick }: { icon: typeof Wrench; label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex h-8 items-center gap-1 rounded-lg border border-slate-200 px-2 text-xs font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700">
      <Icon className="size-3.5" />
      {label}
    </button>
  );
}

function EmptyAction({ icon: Icon, title, detail, onClick }: { icon: typeof Wrench; title: string; detail: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="rounded-xl border border-dashed border-slate-200 p-3 text-left transition hover:border-blue-300 hover:bg-blue-50/40">
      <span className="mb-2 flex size-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        <Icon className="size-4" />
      </span>
      <span className="block text-sm font-medium text-slate-800">{title}</span>
      <span className="mt-0.5 block text-xs text-slate-500">{detail}</span>
    </button>
  );
}
