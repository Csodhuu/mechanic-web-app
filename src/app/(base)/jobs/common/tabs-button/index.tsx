"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import ServiceList from "../service-list";
import { ServiceOrderDialog } from "./service-order-dialog";

export default function TabsButton() {
  const [open, setOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <>
      <div className="flex justify-end">
        <Button type="button" size="sm" onClick={() => setOpen(true)}>
          Шинэ захиалга <Plus />
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
