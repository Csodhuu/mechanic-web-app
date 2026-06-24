"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/authClient";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: () => void;
};

type Vehicle = NonNullable<Awaited<ReturnType<typeof apiClient.api.crm.vehicle.get>>["data"]>;

export function ServiceOrderDialog({ open, onOpenChange, onCreated }: Props) {
  const [licensePlate, setLicensePlate] = useState("");
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetDialog = () => {
    setLicensePlate("");
    setVehicle(null);
  };

  const handleInternalOpenChange = (next: boolean) => {
    if (!next) resetDialog();
    onOpenChange(next);
  };

  const findVehicle = async () => {
    const value = licensePlate.trim();
    if (!value) {
      toast.error("Улсын дугаар оруулна уу.");
      return;
    }

    try {
      setIsSearching(true);
      setVehicle(null);
      const response = await apiClient.api.crm.vehicle.get({
        query: { licensePlate: value },
      });
      if (response.error || !response.data) throw response.error ?? new Error("Vehicle not found");

      setVehicle(response.data);
    } catch (error) {
      console.error("Failed to find vehicle:", error);
      toast.error("Энэ улсын дугаартай машин олдсонгүй. Дугаараа шалгана уу.");
    } finally {
      setIsSearching(false);
    }
  };

  const createServiceOrder = async () => {
    const value = licensePlate.trim();
    if (!vehicle || !value) {
      toast.error("Эхлээд улсын дугаараар машиныг шалгана уу.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await apiClient.api.crm["cp-order"].post({ licensePlate: value });
      if (response.error) throw response.error;

      toast.success("Үйлчилгээний захиалга амжилттай үүслээ.");
      resetDialog();
      onOpenChange(false);
      onCreated();
    } catch (error) {
      console.error("Failed to create service order:", error);
      toast.error("Үйлчилгээний захиалга үүсгэхэд алдаа гарлаа.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isBusy = isSearching || isSubmitting;

  return (
    <Dialog open={open} onOpenChange={handleInternalOpenChange}>
      <DialogContent className="gap-3 p-4 sm:max-w-[440px] sm:p-5">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">Улсын дугаараар хайх</DialogTitle>
        </DialogHeader>

        <div className="flex gap-2">
          <Input
            value={licensePlate}
            onChange={(event) => {
              setLicensePlate(event.target.value);
              setVehicle(null);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") void findVehicle();
            }}
            placeholder="Улсын дугаар оруулна уу"
            disabled={isBusy}
            className="h-9 text-sm"
          />
          <Button type="button" size="sm" onClick={() => void findVehicle()} disabled={isBusy}>
            {isSearching ? "Хайж байна..." : "Хайх"}
          </Button>
        </div>

        {vehicle && (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="mb-2 text-xs font-semibold text-slate-900">Машины мэдээлэл</p>
            <dl className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
              <VehicleDetail label="Улсын дугаар" value={vehicle.plate_no} />
              <VehicleDetail label="Марк, модель" value={[vehicle.mark_name, vehicle.model_name].filter(Boolean).join(" ")} />
              <VehicleDetail label="Арлын дугаар" value={vehicle.cabin_no} />
              <VehicleDetail label="Үйлдвэрлэсэн он" value={vehicle.build_year} />
              <VehicleDetail label="Өнгө" value={vehicle.color_name} />
              <VehicleDetail label="Хөдөлгүүр" value={vehicle.engine_model_name} />
              <VehicleDetail label="Багтаамж" value={vehicle.capacity} />
              <VehicleDetail label="Түлш" value={vehicle.fuel_type_name} />
            </dl>
          </div>
        )}

        <Button
          type="button"
          size="sm"
          className="w-full text-xs"
          onClick={() => void createServiceOrder()}
          disabled={!vehicle || isBusy}
        >
          {isSubmitting ? "Үүсгэж байна..." : "Засвар үйлчилгээ үүсгэх"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

function VehicleDetail({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <dt className="text-[11px] text-slate-500">{label}</dt>
      <dd className="mt-px truncate text-xs font-medium text-slate-800">{value || "-"}</dd>
    </div>
  );
}
