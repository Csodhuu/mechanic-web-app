"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { apiClient } from "@/lib/authClient";
import { getCookie } from "cookies-next";
import { ArrowLeft, Car, IdCard, ReceiptText } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { CompactDetailCard } from "./_components/molecules/compact-detail-card";
import { OrderDetailDialog } from "./_components/organisms/order-detail-dialog";
import { OrderHeroCard } from "./_components/organisms/order-hero-card";
import { OrderItemsSection } from "./_components/organisms/order-items-section";
import { DetailDialogType, OrderDetail, stateLabel } from "./_types/service-order-detail";

export default function ServiceOrderDetail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  const [data, setData] = useState<OrderDetail | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [detailDialog, setDetailDialog] = useState<DetailDialogType | null>(null);
  const [isStartingService, setIsStartingService] = useState(false);

  const vehicleName = useMemo(() => {
    const name = [data?.make?.name, data?.model?.name].filter(Boolean).join(" ");
    return name || "Тээврийн хэрэгсэл";
  }, [data?.make?.name, data?.model?.name]);

  const customerName = useMemo(() => {
    const name = [data?.customer?.lastname, data?.customer?.firstname].filter(Boolean).join(" ");
    return name || "Харилцагчийн нэргүй";
  }, [data?.customer?.firstname, data?.customer?.lastname]);

  const startRepairService = async () => {
    if (!data) return;

    try {
      setIsStartingService(true);

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

      toast.success("Засвар үйлчилгээ эхэллээ.");
      router.push("/control?state=PROGRESSING");
    } catch (transferError) {
      console.error("Failed to start repair service:", transferError);
      toast.error("Засвар үйлчилгээ эхлүүлэхэд алдаа гарлаа.");
    } finally {
      setIsStartingService(false);
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
    <main className="mx-auto w-full max-w-[1120px] space-y-4 px-3 pb-[calc(6rem+env(safe-area-inset-bottom))] pt-3 sm:px-6 sm:pt-4 lg:px-8">
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
          <h1 className="truncate text-lg font-bold text-slate-950 sm:text-2xl">
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
          <OrderHeroCard
            data={data}
            isStartingService={isStartingService}
            vehicleName={vehicleName}
            onStartService={() => void startRepairService()}
          />

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

          <OrderDetailDialog
            customerName={customerName}
            data={data}
            detailDialog={detailDialog}
            vehicleName={vehicleName}
            onOpenChange={(open) => !open && setDetailDialog(null)}
          />
        </>
      )}
    </main>
  );
}
