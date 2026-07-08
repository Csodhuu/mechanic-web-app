import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  DetailDialogType,
  formatOrderDate,
  OrderDetail,
  stateLabel,
} from "../../_types/service-order-detail";
import { DetailRow } from "../atoms/detail-row";

type OrderDetailDialogProps = {
  customerName: string;
  data: OrderDetail;
  detailDialog: DetailDialogType | null;
  onOpenChange: (open: boolean) => void;
};

export function OrderDetailDialog({
  customerName,
  data,
  detailDialog,
  onOpenChange,
}: OrderDetailDialogProps) {
  return (
    <Dialog open={detailDialog !== null} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80svh] overflow-y-auto p-4 sm:max-w-[480px] sm:p-5">
        <DialogHeader>
          <DialogTitle className="text-base">
            {detailDialog === "order"
              ? "Захиалгын дэлгэрэнгүй"
              : detailDialog === "vehicle"
                ? "Автомашины дэлгэрэнгүй"
                : "Харилцагчийн дэлгэрэнгүй"}
          </DialogTitle>
          <DialogDescription>
            Захиалга, автомашин болон харилцагчийн бүртгэлийн мэдээлэл.
          </DialogDescription>
        </DialogHeader>

        {detailDialog === "order" && (
          <div>
            <DetailRow label="Дугаар" value={data.order.orderId} />
            <DetailRow label="Төлөв" value={stateLabel[data.order.state]} />
            <DetailRow label="Төрөл" value={data.order.type} />
            <DetailRow label="Үүссэн огноо" value={formatOrderDate(data.order.createdAt)} />
            <DetailRow label="Дууссан огноо" value={formatOrderDate(data.order.timeCompleted)} />
            <DetailRow
              label="Дараагийн үйлчилгээ"
              value={formatOrderDate(data.order.nextServiceDate)}
            />
            <DetailRow label="Тайлбар" value={data.order.description} />
            <DetailRow label="Шинэчлэгдсэн" value={formatOrderDate(data.order.updatedAt)} />
          </div>
        )}

        {detailDialog === "vehicle" && (
          <div>
            <DetailRow label="VIN" value={data.vehicle?.vin} />
            <DetailRow label="Улсын дугаар" value={data.vehicle?.licensePlate} />
            <DetailRow label="Нийт гүйлт" value={data.vehicle?.km ?? data.order.km} />
            <DetailRow label="Утас" value={data.customer?.phoneNumber} />
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
  );
}