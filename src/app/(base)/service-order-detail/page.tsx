"use client";

import { CpOrderQuery } from "@/app/(base)/jobs/model";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { apiClient } from "@/lib/authClient";
import { getCookie } from "cookies-next";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  Car,
  CircleDollarSign,
  Gauge,
  IdCard,
  Phone,
  ReceiptText,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

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

const formatDate = (value?: string | null) => {
  if (!value) return "-";

  const date = new Date(value.replace(" ", "T"));
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("mn-MN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

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

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: typeof Car;
  children: React.ReactNode;
}) {
  return (
    <Card className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <Icon className="h-4 w-4" />
        </div>
        <h2 className="text-base font-bold text-slate-900">{title}</h2>
      </div>
      <div>{children}</div>
    </Card>
  );
}

export default function ServiceOrderDetail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  const [data, setData] = useState<OrderDetail | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const vehicleName = useMemo(() => {
    const name = [data?.make?.name, data?.model?.name].filter(Boolean).join(" ");
    return name || "Тээврийн хэрэгсэл";
  }, [data?.make?.name, data?.model?.name]);

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
  }, [orderId]);

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

          <Section title="Захиалгын мэдээлэл" icon={ReceiptText}>
            <DetailRow label="Дугаар" value={data.order.orderId} />
            <DetailRow label="Төлөв" value={stateLabel[data.order.state]} />
            <DetailRow label="Төрөл" value={data.order.type} />
            <DetailRow label="Үүссэн огноо" value={formatDate(data.order.createdAt)} />
            <DetailRow label="Дууссан огноо" value={formatDate(data.order.timeCompleted)} />
            <DetailRow label="Тайлбар" value={data.order.description} />
          </Section>

          <Section title="Автомашины мэдээлэл" icon={Car}>
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
          </Section>

          <Section title="Харилцагч" icon={IdCard}>
            <DetailRow
              label="Нэр"
              value={[data.customer?.lastname, data.customer?.firstname].filter(Boolean).join(" ")}
            />
            <DetailRow label="Утас" value={data.customer?.phoneNumber} />
            <DetailRow label="Имэйл" value={data.customer?.email} />
            <DetailRow label="Регистр" value={data.customer?.regNum} />
          </Section>

          <Section title="Төлбөр ба нэмэлт" icon={BadgeCheck}>
            <DetailRow label="Нийт дүн" value={formatMoney(data.totalAmount)} />
            <DetailRow label="Төлсөн дүн" value={formatMoney(data.paidAmount)} />
            <DetailRow label="НӨАТ" value={data.order.isNoat ? "Тийм" : "Үгүй"} />
            <DetailRow
              label="Чанарын шалгалт"
              value={data.order.isQualityCheck ? "Тийм" : "Үгүй"}
            />
            <DetailRow label="Дараагийн үйлчилгээ" value={formatDate(data.order.nextServiceDate)} />
          </Section>

          <Section title="Огноо" icon={CalendarDays}>
            <DetailRow label="Үүссэн" value={formatDate(data.order.createdAt)} />
            <DetailRow label="Шинэчлэгдсэн" value={formatDate(data.order.updatedAt)} />
            <DetailRow label="Устгах боломжтой" value={data.isDeleteAble ? "Тийм" : "Үгүй"} />
          </Section>
        </>
      )}
    </div>
  );
}
