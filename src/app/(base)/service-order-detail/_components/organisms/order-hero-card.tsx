import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Ban, CheckCircle2, Gauge, UserRoundPlus } from "lucide-react";

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
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h2 className="truncate text-lg font-bold sm:text-2xl">
              {data.vehicle?.licensePlate ?? vehicleName}
            </h2>
            <p className="mt-1 truncate text-sm text-slate-300">{vehicleName}</p>
          </div>
          <span className="w-fit shrink-0 rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold leading-4 text-white">
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
    </Card>
  );
}
