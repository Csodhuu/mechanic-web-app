import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Gauge, Phone, ReceiptText } from "lucide-react";

import { OrderDetail, stateLabel } from "../../_types/service-order-detail";

type OrderHeroCardProps = {
  data: OrderDetail;
  isStartingService: boolean;
  vehicleName: string;
  onStartService: () => void;
};

export function OrderHeroCard({
  data,
  isStartingService,
  vehicleName,
  onStartService,
}: OrderHeroCardProps) {
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
        {data.order.state === "CREATED" && (
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Button
              type="button"
              className="w-full bg-white text-slate-950 hover:bg-slate-100 sm:w-auto"
              disabled={isStartingService}
              onClick={onStartService}
            >
              {isStartingService ? "Эхлүүлж байна..." : "Засвар үйлчилгээ эхлүүлэх"}
            </Button>
          </div>
        )}
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
