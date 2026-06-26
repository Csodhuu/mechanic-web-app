import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Car } from "lucide-react";

type CompactDetailCardProps = {
  icon: typeof Car;
  title: string;
  primary: string | null;
  secondary: string;
  onClick: () => void;
};

export function CompactDetailCard({
  icon: Icon,
  title,
  primary,
  secondary,
  onClick,
}: CompactDetailCardProps) {
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
