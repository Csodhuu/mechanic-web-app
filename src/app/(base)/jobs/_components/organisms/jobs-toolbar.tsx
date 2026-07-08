"use client";

import { Button } from "@/components/ui/button";
import { ClipboardPlus } from "lucide-react";
import { useState } from "react";
import { ServiceOrderDialog } from "../molecules/service-order-dialog";
import ServiceList from "./service-list";

export default function TabsButton() {
  const [open, setOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <>
      <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm">
        <p className="text-sm font-semibold text-slate-950">Шинэ оношлогоо</p>
        <Button type="button" size="sm" className="shrink-0" onClick={() => setOpen(true)}>
          <ClipboardPlus className="size-4" />
          Оношлогоо
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
