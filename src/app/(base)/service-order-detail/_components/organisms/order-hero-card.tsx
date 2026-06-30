import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Ban, CheckCircle2, Gauge, Phone, ReceiptText, UserRoundPlus } from "lucide-react";

import { OrderDetail, stateLabel } from "../../_types/service-order-detail";

type OrderHeroCardProps = {
  data: OrderDetail;
  isCancelling: boolean;
  isCompleting: boolean;
  isStartingService: boolean;
  vehicleName: string;
  onCancelOrder: () => void;
  onCompleteOrder: () => void;
  onEditCustomer: () => void;
  onEditMileage: () => void;
  onStartService: () => void;
};

export function OrderHeroCard({
  data,
  isCancelling,
  isCompleting,
  isStartingService,
  vehicleName,
  onCancelOrder,
  onCompleteOrder,
  onEditCustomer,
  onEditMileage,
  onStartService,
}: OrderHeroCardProps) {
  const canStartOrCancel = data.order.state === "CREATED";
  const canComplete = data.order.state === "PROGRESSING";
  const isMutating = isStartingService || isCancelling || isCompleting;

  return (
    <Card className="overflow-hidden rounded-[24px] border border-slate-200 bg-white p-0 shadow-sm">
      <div className="bg-slate-950 p-4 text-white">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate text-lg font-bold sm:text-2xl">{vehicleName}</h2>
            <p className="mt-1 text-sm text-slate-300">
              {data.vehicle?.licensePlate ?? "-"} · {data.vehicle?.vin ?? "-"}
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
            {stateLabel[data.order.state]}
          </span>
        </div>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Button
            type="button"
            variant="outline"
            className="w-full border-white/20 bg-white/10 text-white hover:bg-white/20 sm:w-auto"
            onClick={onEditCustomer}
          >
            <UserRoundPlus className="size-4" />
            Үйлчлүүлэгч
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full border-white/20 bg-white/10 text-white hover:bg-white/20 sm:w-auto"
            onClick={onEditMileage}
          >
            <Gauge className="size-4" />
            Гүйлт
          </Button>
          {canStartOrCancel && (
            <Button
              type="button"
              className="w-full bg-white text-slate-950 hover:bg-slate-100 sm:w-auto"
              disabled={isMutating}
              onClick={onStartService}
            >
              {isStartingService ? "Эхлүүлж байна..." : "Засвар үйлчилгээ эхлүүлэх"}
            </Button>
          )}
          {canComplete && (
            <Button
              type="button"
              className="w-full bg-emerald-500 text-white hover:bg-emerald-600 sm:w-auto"
              disabled={isMutating}
              onClick={onCompleteOrder}
            >
              <CheckCircle2 className="size-4" />
              {isCompleting ? "Дуусгаж байна..." : "Ажил дуусгах"}
            </Button>
          )}
          {canStartOrCancel && (
            <Button
              type="button"
              variant="destructive"
              className="w-full bg-rose-500 text-white hover:bg-rose-600 sm:w-auto"
              disabled={isMutating}
              onClick={onCancelOrder}
            >
              <Ban className="size-4" />
              {isCancelling ? "Цуцалж байна..." : "Ажил цуцлах"}
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 p-4">
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
          <ReceiptText className="mb-2 h-4 w-4 text-blue-600" />
          <p className="text-xs text-slate-500">Мэдээлэл</p>
          <p className="mt-1 text-sm font-bold text-slate-900">Нууцалсан</p>
        </div>
      </div>
    </Card>
  );
}