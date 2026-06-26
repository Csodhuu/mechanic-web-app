import { OrderItem } from "../../_types/control";
import { ControlOrderCard } from "./control-order-card";

type ControlOrderListProps = {
  error: string | null;
  loading: boolean;
  mutatingId: string | null;
  orders: OrderItem[];
  onOpenDetail: (id: string) => void;
  onStartControl: (item: OrderItem) => void;
  onCompleteControl: (item: OrderItem) => void;
};

export function ControlOrderList({
  error,
  loading,
  mutatingId,
  orders,
  onOpenDetail,
  onStartControl,
  onCompleteControl,
}: ControlOrderListProps) {
  return (
    <section className="mt-4 grid gap-3 lg:grid-cols-2">
      {loading && (
        <div className="rounded-[15px] border border-dashed border-slate-200 bg-white p-5 text-center text-sm text-slate-500">
          Хяналтын ажлууд уншиж байна...
        </div>
      )}

      {!loading && !error && orders.length === 0 && (
        <div className="rounded-[15px] border border-dashed border-slate-200 bg-white p-5 text-center text-sm text-slate-500">
          Хяналтанд буй ажил олдсонгүй.
        </div>
      )}

      {orders.map((item) => (
        <ControlOrderCard
          key={item.order.id}
          item={item}
          mutating={mutatingId === item.order.id}
          onOpenDetail={onOpenDetail}
          onStartControl={onStartControl}
          onCompleteControl={onCompleteControl}
        />
      ))}
    </section>
  );
}
