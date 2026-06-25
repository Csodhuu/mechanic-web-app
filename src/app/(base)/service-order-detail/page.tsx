"use client";

import { CpOrderQuery } from "@/app/(base)/jobs/model";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { apiClient } from "@/lib/authClient";
import { OrderItemsSection } from "./order-items-section";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import {
  ArrowLeft,
  Car,
  CircleDollarSign,
  Gauge,
  IdCard,
  Phone,
  ReceiptText,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type OrderDetail = CpOrderQuery["result"][number];

const stateLabel: Record<OrderDetail["order"]["state"], string> = {
  CREATED: "Үүссэн",
  PROGRESSING: "Хийгдэж байна",
  COMPLETE: "Дууссан",
};

const formatMoney = (value?: number | null) =>
  new Intl.NumberFormat("mn-MN", {
    style: "currency",
    currency: "MNT",
    maximumFractionDigits: 0,
  }).format(value ?? 0);

const formatDate = (value?: string | null) => (value ? dayjs(value).format("YYYY-MM-DD HH.mm") : "-");

function DetailRow({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 py-3 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="max-w-[60%] text-right text-sm font-medium text-slate-900">
        {value ?? "-"}
      </span>
    </div>
  );
}

export default function ServiceOrderDetail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  const [data, setData] = useState<OrderDetail | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [detailDialog, setDetailDialog] = useState<"order" | "vehicle" | "customer" | null>(null);
  const [isHandingOff, setIsHandingOff] = useState(false);

  const vehicleName = useMemo(() => {
    const name = [data?.make?.name, data?.model?.name].filter(Boolean).join(" ");
    return name || "Тээврийн хэрэгсэл";
  }, [data?.make?.name, data?.model?.name]);

  const customerName = useMemo(() => {
    const name = [data?.customer?.lastname, data?.customer?.firstname].filter(Boolean).join(" ");
    return name || "Харилцагчийн нэргүй";
  }, [data?.customer?.firstname, data?.customer?.lastname]);

  const handOffToControl = async () => {
    if (!data) return;

    try {
      setIsHandingOff(true);

      const token = getCookie("token");
      if (!token) {
        toast.error("Нэвтрэх token олдсонгүй.");
        return;
      }

      const res = await apiClient.api.crm["cp-order"]({ id: data.order.id }).put(
        {
          state: "PROGRESSING",
          isQualityCheck: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.error || !res.data) throw res.error;

      toast.success("Хяналт руу шилжлээ.");
      router.push("/control?state=PROGRESSING");
    } catch (transferError) {
      console.error("Failed to hand off order to control:", transferError);
      toast.error("Хяналт руу шилжүүлэхэд алдаа гарлаа.");
    } finally {
      setIsHandingOff(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!orderId) {
        setError("Захиалгын id олдсонгүй.");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const token = getCookie("token");
        if (!token) {
          setError("Нэвтрэх token олдсонгүй.");
          return;
        }

        const res = await apiClient.api.crm["cp-order"].get({
          query: {
            id: orderId,
            pagination: { page: 1, size: 1 },
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const detail = res.data?.result?.[0] ?? null;
        setData(detail);

        if (!detail) {
          setError("Захиалгын дэлгэрэнгүй мэдээлэл олдсонгүй.");
        }
      } catch (fetchError) {
        console.error("Failed to fetch service order detail:", fetchError);
        setError("Захиалгын дэлгэрэнгүй мэдээлэл авахад алдаа гарлаа.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [orderId, refreshKey]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Буцах"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="min-w-0">
          <p className="text-sm text-slate-500">Засвар үйлчилгээ</p>
          <h1 className="truncate text-2xl font-bold text-slate-950">
            {data?.order.orderId ?? "Дэлгэрэнгүй"}
          </h1>
        </div>
      </div>

      {isLoading && (
        <Card className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
          Дэлгэрэнгүй мэдээлэл уншиж байна...
        </Card>
      )}

      {!isLoading && error && (
        <Card className="rounded-2xl border border-red-100 bg-red-50 p-5 text-sm font-medium text-red-700">
          {error}
        </Card>
      )}

      {!isLoading && data && (
        <>
          <Card className="overflow-hidden rounded-[24px] border border-slate-200 bg-white p-0 shadow-sm">
            <div className="bg-slate-950 p-4 text-white">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="truncate text-2xl font-bold">{vehicleName}</h2>
                  <p className="mt-1 text-sm text-slate-300">
                    {data.vehicle?.licensePlate ?? "-"} · {data.vehicle?.vin ?? "-"}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
                  {stateLabel[data.order.state]}
                </span>
              </div>
              {data.order.state === "CREATED" && (
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <Button
                    type="button"
                    className="w-full bg-white text-slate-950 hover:bg-slate-100 sm:w-auto"
                    disabled={isHandingOff}
                    onClick={() => void handOffToControl()}
                  >
                    {isHandingOff ? "Шилжиж байна..." : "Хяналт руу шилжүүлэх"}
                  </Button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2 p-4">
              <div className="rounded-xl bg-slate-50 p-3">
                <Gauge className="mb-2 h-4 w-4 text-blue-600" />
                <p className="text-xs text-slate-500">Километр</p>
                <p className="mt-1 text-sm font-bold text-slate-900">
                  {data.vehicle?.km ?? data.order.km} Km
                </p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <Phone className="mb-2 h-4 w-4 text-blue-600" />
                <p className="text-xs text-slate-500">Утас</p>
                <p className="mt-1 text-sm font-bold text-slate-900">
                  {data.customer?.phoneNumber ?? "-"}
                </p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <CircleDollarSign className="mb-2 h-4 w-4 text-blue-600" />
                <p className="text-xs text-slate-500">Нийт</p>
                <p className="mt-1 text-sm font-bold text-slate-900">
                  {formatMoney(data.totalAmount)}
                </p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <CompactDetailCard
              icon={ReceiptText}
              title="Захиалга"
              primary={data.order.orderId}
              secondary={stateLabel[data.order.state]}
              onClick={() => setDetailDialog("order")}
            />
            <CompactDetailCard
              icon={Car}
              title="Автомашин"
              primary={data.vehicle?.licensePlate ?? "Дугааргүй"}
              secondary={vehicleName}
              onClick={() => setDetailDialog("vehicle")}
            />
          </div>

          <OrderItemsSection
            orderId={data.order.id}
            onItemsChanged={() => setRefreshKey((current) => current + 1)}
          />

          <CompactDetailCard
            icon={IdCard}
            title="Харилцагч"
            primary={customerName}
            secondary={data.customer?.phoneNumber ?? "Утасгүй"}
            onClick={() => setDetailDialog("customer")}
          />

          <Dialog open={detailDialog !== null} onOpenChange={(open) => !open && setDetailDialog(null)}>
            <DialogContent className="max-h-[80svh] overflow-y-auto p-4 sm:max-w-[480px] sm:p-5">
              <DialogHeader>
                <DialogTitle className="text-base">
                  {detailDialog === "order"
                    ? "Захиалгын дэлгэрэнгүй"
                    : detailDialog === "vehicle"
                      ? "Автомашины дэлгэрэнгүй"
                      : "Харилцагчийн дэлгэрэнгүй"}
                </DialogTitle>
              </DialogHeader>

              {detailDialog === "order" && (
                <div>
                  <DetailRow label="Дугаар" value={data.order.orderId} />
                  <DetailRow label="Төлөв" value={stateLabel[data.order.state]} />
                  <DetailRow label="Төрөл" value={data.order.type} />
                  <DetailRow label="Үүссэн огноо" value={formatDate(data.order.createdAt)} />
                  <DetailRow label="Дууссан огноо" value={formatDate(data.order.timeCompleted)} />
                  <DetailRow label="Дараагийн үйлчилгээ" value={formatDate(data.order.nextServiceDate)} />
                  <DetailRow label="Тайлбар" value={data.order.description} />
                  <DetailRow label="Шинэчлэгдсэн" value={formatDate(data.order.updatedAt)} />
                </div>
              )}

              {detailDialog === "vehicle" && (
                <div>
                  <DetailRow label="Марк, модель" value={vehicleName} />
                  <DetailRow label="Улсын дугаар" value={data.vehicle?.licensePlate} />
                  <DetailRow label="Арлын дугаар" value={data.vehicle?.vin} />
                  <DetailRow label="Өнгө" value={data.vehicle?.color} />
                  <DetailRow label="Үйлдвэрлэсэн он" value={data.vehicle?.yearManufacture} />
                  <DetailRow label="Орж ирсэн он" value={data.vehicle?.yearImport} />
                  <DetailRow label="Хөдөлгүүр" value={data.vehicle?.engineCode} />
                  <DetailRow label="Багтаамж" value={data.vehicle?.engineCc} />
                  <DetailRow label="Түлш" value={data.vehicle?.gasType} />
                  <DetailRow label="Төрөл" value={data.vehicle?.vehicleType} />
                </div>
              )}

              {detailDialog === "customer" && (
                <div>
                  <DetailRow label="Нэр" value={customerName} />
                  <DetailRow label="Утас" value={data.customer?.phoneNumber} />
                  <DetailRow label="Имэйл" value={data.customer?.email} />
                  <DetailRow label="Регистр" value={data.customer?.regNum} />
                </div>
              )}
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}

function CompactDetailCard({
  icon: Icon,
  title,
  primary,
  secondary,
  onClick,
}: {
  icon: typeof Car;
  title: string;
  primary: string | null;
  secondary: string;
  onClick: () => void;
}) {
  return (
    <Card className="gap-2 rounded-xl border border-slate-200 p-3 shadow-sm">
      <div className="flex items-center gap-2 text-slate-500">
        <Icon className="size-4 text-blue-600" />
        <span className="text-xs font-medium">{title}</span>
      </div>
      <p className="truncate text-sm font-semibold text-slate-900">{primary ?? "-"}</p>
      <p className="truncate text-xs text-slate-500">{secondary}</p>
      <Button type="button" variant="outline" size="xs" className="w-full" onClick={onClick}>
        Дэлгэрэнгүй
      </Button>
    </Card>
  );
}
