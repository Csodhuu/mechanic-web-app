"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiClient } from "@/lib/authClient";
import { getCookie } from "cookies-next";
import { Gauge, UserRoundPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { OrderDetail } from "../../_types/service-order-detail";

type EditableDialogProps = {
  data: OrderDetail;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: () => void;
};

type AuthHeaders = { Authorization: string } | undefined;

const getHeaders = (): AuthHeaders => {
  const token = getCookie("token");
  return token ? { Authorization: `Bearer ${token}` } : undefined;
};

const optionalValue = (value: string) => {
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
};

export function OrderCustomerDialog({ data, open, onOpenChange, onSaved }: EditableDialogProps) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [regNum, setRegNum] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!open) return;

    setFirstname(data.customer?.firstname ?? "");
    setLastname(data.customer?.lastname ?? "");
    setPhoneNumber(data.customer?.phoneNumber ?? "");
    setEmail(data.customer?.email ?? "");
    setRegNum(data.customer?.regNum ?? "");
  }, [data.customer, open]);

  const saveCustomer = async () => {
    const phone = phoneNumber.trim();
    if (!phone) {
      toast.error("Үйлчлүүлэгчийн утасны дугаар оруулна уу.");
      return;
    }

    const headers = getHeaders();
    if (!headers) {
      toast.error("Нэвтрэх token олдсонгүй.");
      return;
    }

    try {
      setIsSaving(true);

      const payload = {
        firstname: optionalValue(firstname),
        lastname: optionalValue(lastname),
        phoneNumber: phone,
        email: optionalValue(email),
        regNum: optionalValue(regNum),
      };

      const customerId = data.customer?.id;
      const customerResponse = customerId
        ? await apiClient.api.crm.customer({ id: customerId }).put(payload, { headers })
        : await apiClient.api.crm.customer.post(payload, { headers });

      if (customerResponse.error || !customerResponse.data) throw customerResponse.error;

      const nextCustomerId = customerResponse.data.id;
      if (data.order.customerId !== nextCustomerId) {
        const orderResponse = await apiClient.api.crm["cp-order"]({ id: data.order.id }).put(
          { customerId: nextCustomerId },
          { headers }
        );
        if (orderResponse.error) throw orderResponse.error;
      }

      if (data.vehicle?.id && data.vehicle.customerId !== nextCustomerId) {
        const vehicleResponse = await apiClient.api.crm.vehicle.fleet({ id: data.vehicle.id }).put(
          { customerId: nextCustomerId },
          { headers }
        );
        if (vehicleResponse.error) throw vehicleResponse.error;
      }

      toast.success("Үйлчлүүлэгчийн мэдээлэл хадгалагдлаа.");
      onOpenChange(false);
      onSaved();
    } catch (error) {
      console.error("Failed to save order customer:", error);
      toast.error("Үйлчлүүлэгчийн мэдээлэл хадгалахад алдаа гарлаа.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85svh] overflow-y-auto p-4 sm:max-w-[480px] sm:p-5">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            <UserRoundPlus className="size-4 text-blue-600" />
            Үйлчлүүлэгчийн мэдээлэл
          </DialogTitle>
          <DialogDescription>Захиалгад холбох үйлчлүүлэгчийн мэдээлэл нэмнэ эсвэл засна.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-3">
          <Field label="Овог">
            <Input value={lastname} onChange={(event) => setLastname(event.target.value)} />
          </Field>
          <Field label="Нэр">
            <Input value={firstname} onChange={(event) => setFirstname(event.target.value)} />
          </Field>
          <Field label="Утас" required>
            <Input
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              inputMode="tel"
            />
          </Field>
          <Field label="Имэйл">
            <Input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              inputMode="email"
            />
          </Field>
          <Field label="Регистр">
            <Input value={regNum} onChange={(event) => setRegNum(event.target.value)} />
          </Field>
        </div>

        <Button type="button" className="mt-4 w-full" disabled={isSaving} onClick={() => void saveCustomer()}>
          {isSaving ? "Хадгалж байна..." : "Үйлчлүүлэгч хадгалах"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export function OrderMileageDialog({ data, open, onOpenChange, onSaved }: EditableDialogProps) {
  const [km, setKm] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setKm(String(data.vehicle?.km ?? data.order.km ?? ""));
  }, [data.order.km, data.vehicle?.km, open]);

  const saveMileage = async () => {
    const value = Number(km);
    if (!Number.isFinite(value) || value < 0) {
      toast.error("Машины нийт гүйлтийг зөв тоогоор оруулна уу.");
      return;
    }

    const headers = getHeaders();
    if (!headers) {
      toast.error("Нэвтрэх token олдсонгүй.");
      return;
    }

    try {
      setIsSaving(true);
      const nextKm = Math.round(value);

      const orderResponse = await apiClient.api.crm["cp-order"]({ id: data.order.id }).put(
        { km: nextKm },
        { headers }
      );
      if (orderResponse.error) throw orderResponse.error;

      if (data.vehicle?.id) {
        const vehicleResponse = await apiClient.api.crm.vehicle.fleet({ id: data.vehicle.id }).put(
          { km: nextKm },
          { headers }
        );
        if (vehicleResponse.error) throw vehicleResponse.error;
      }

      toast.success("Машины нийт гүйлт хадгалагдлаа.");
      onOpenChange(false);
      onSaved();
    } catch (error) {
      console.error("Failed to save mileage:", error);
      toast.error("Машины нийт гүйлт хадгалахад алдаа гарлаа.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-4 sm:max-w-[420px] sm:p-5">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            <Gauge className="size-4 text-blue-600" />
            Машины нийт гүйлт
          </DialogTitle>
          <DialogDescription>Одоогийн нийт километрийг захиалга болон машин дээр хадгална.</DialogDescription>
        </DialogHeader>

        <Field label="Нийт гүйлт" required>
          <Input
            type="number"
            min="0"
            value={km}
            onChange={(event) => setKm(event.target.value)}
            inputMode="numeric"
          />
        </Field>

        <Button type="button" className="mt-4 w-full" disabled={isSaving} onClick={() => void saveMileage()}>
          {isSaving ? "Хадгалж байна..." : "Гүйлт хадгалах"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  children,
  label,
  required,
}: {
  children: React.ReactNode;
  label: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold text-slate-600">
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </Label>
      {children}
    </div>
  );
}