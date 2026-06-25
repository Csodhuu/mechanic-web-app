"use client";

import { Button } from "@/components/ui/button";
import { ClipboardPlus } from "lucide-react";
import { useState } from "react";
import ServiceList from "../service-list";
import { ServiceOrderDialog } from "./service-order-dialog";

export default function TabsButton() {
  const [open, setOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <>
      <div className="flex flex-col gap-2 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-950">Шинэ ажил бүртгэх</p>
          <p className="mt-0.5 text-sm text-slate-500">
            Улсын дугаараар машин сонгоод анхан үзлэг эхлүүлнэ.
          </p>
        </div>
        <Button type="button" size="sm" onClick={() => setOpen(true)}>
          <ClipboardPlus className="size-4" />
          Анхан үзлэг
        </Button>

        <ServiceOrderDialog
          open={open}
          onOpenChange={setOpen}
          onCreated={() => setRefreshKey((current) => current + 1)}
        />
      </div>
      <ServiceList refreshKey={refreshKey} />
    </>
  );
}
