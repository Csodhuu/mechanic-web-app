"use client";

import { apiClient } from "@/lib/authClient";
import { cn } from "@/lib/utils";
import { getCookie } from "cookies-next";
import {
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  IdCard,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type MeQuery = NonNullable<
  Awaited<ReturnType<typeof import("@/lib/authClient").apiClient.api.user.me.get>>["data"]
>;

const kindLabel: Record<string, string> = {
  ADMIN: "Админ",
  COMPANY_ADMIN: "Компанийн админ",
  CUSTOMER: "Харилцагч",
  INSPECTION: "Хяналтын инженер",
};

function formatDate(value?: Date | string | null) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("mn-MN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value));
}

function getInitials(name?: string | null) {
  if (!name) return "U";

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof UserRound;
  label: string;
  value?: string | number | boolean | null;
}) {
  return (
    <div className="flex items-start gap-3 border-b border-slate-100 py-3 last:border-b-0">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
        <Icon className="h-4.5 w-4.5" strokeWidth={2} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold leading-4 text-slate-400">{label}</p>
        <p className="mt-0.5 truncate text-[14px] font-semibold leading-5 text-[#101735]">
          {value === true ? "Тийм" : value === false ? "Үгүй" : value || "-"}
        </p>
      </div>
    </div>
  );
}

export default function Profile() {
  const [user, setUser] = useState<MeQuery | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initials = useMemo(() => getInitials(user?.name), [user?.name]);
  const userKind = user?.kind ? (kindLabel[user.kind] ?? user.kind) : "-";

  useEffect(() => {
    let isMounted = true;

    const fetchMe = async () => {
      await Promise.resolve();
      try {
        if (isMounted) {
          setLoading(true);
          setError(null);
        }

        const token = getCookie("token");
        if (!token) {
          if (isMounted) setError("Нэвтрэх token олдсонгүй.");
          return;
        }

        const res = await apiClient.api.user.me.get();

        if (isMounted) {
          setUser(res.data ?? null);
          if (!res.data) setError("Хэрэглэгчийн мэдээлэл олдсонгүй.");
        }
      } catch (fetchError) {
        console.error("Failed to fetch profile data:", fetchError);
        if (isMounted) setError("Хувийн мэдээлэл авахад алдаа гарлаа.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    void fetchMe();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="mx-auto min-h-[calc(100svh-8rem)] w-full max-w-[430px] bg-white px-4 pb-3 pt-2">
      <header className="mb-4 pt-[env(safe-area-inset-top)]">
        <div className="grid h-14 grid-cols-[48px_1fr_48px] items-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <UserRound className="h-6 w-6" strokeWidth={2.1} />
          </span>
          <div className="min-w-0 text-center">
            <h1 className="truncate text-[20px] font-bold leading-6 text-[#101735]">Профайл</h1>
            <p className="truncate text-[13px] font-medium text-slate-500">Миний хувийн мэдээлэл</p>
          </div>
          <span />
        </div>
      </header>

      {isLoading && (
        <div className="rounded-[15px] border border-dashed border-slate-200 bg-white p-5 text-center text-sm text-slate-500">
          Хувийн мэдээлэл уншиж байна...
        </div>
      )}

      {!isLoading && error && (
        <div className="rounded-[15px] border border-red-100 bg-red-50 p-5 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {!isLoading && user && (
        <div className="space-y-4">
          <section className="overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-sm">
            <div className="bg-[#101735] px-4 py-5 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/10 text-[22px] font-bold">
                  {user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={user.image} alt={user.name} className="h-full w-full object-cover" />
                  ) : (
                    initials
                  )}
                </div>
                <div className="min-w-0">
                  <h2 className="truncate text-[21px] font-bold leading-7">{user.name}</h2>
                  <p className="mt-0.5 truncate text-[13px] font-medium text-slate-300">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 p-3">
              <div className="rounded-[10px] bg-blue-50 px-3 py-2.5 text-blue-700">
                <p className="text-[11px] font-semibold leading-4 opacity-80">Төрөл</p>
                <p className="mt-0.5 truncate text-[13px] font-bold leading-5">{userKind}</p>
              </div>
              <div className="rounded-[10px] bg-emerald-50 px-3 py-2.5 text-emerald-700">
                <p className="text-[11px] font-semibold leading-4 opacity-80">Имэйл</p>
                <p className="mt-0.5 truncate text-[13px] font-bold leading-5">
                  {user.emailVerified ? "Баталгаажсан" : "Баталгаажаагүй"}
                </p>
              </div>
              <div
                className={cn(
                  "rounded-[10px] px-3 py-2.5",
                  user.banned ? "bg-red-50 text-red-700" : "bg-slate-100 text-slate-700"
                )}
              >
                <p className="text-[11px] font-semibold leading-4 opacity-80">Төлөв</p>
                <p className="mt-0.5 truncate text-[13px] font-bold leading-5">
                  {user.banned ? "Хязгаарласан" : "Идэвхтэй"}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[15px] border border-slate-200 bg-white px-3 shadow-sm">
            <DetailRow icon={UserRound} label="Нэр" value={user.name} />
            <DetailRow icon={Mail} label="Имэйл" value={user.email} />
            <DetailRow icon={ShieldCheck} label="Эрх" value={user.role ?? userKind} />
            <DetailRow icon={BriefcaseBusiness} label="Ажилтны ID" value={user.employeeId} />
          </section>

          <section className="rounded-[15px] border border-slate-200 bg-white px-3 shadow-sm">
            <DetailRow icon={Building2} label="Компанийн ID" value={user.companyId} />
            <DetailRow icon={IdCard} label="Салбарын ID" value={user.branchId} />
            <DetailRow
              icon={CalendarDays}
              label="Үүссэн огноо"
              value={formatDate(user.createdAt)}
            />
            <DetailRow icon={BadgeCheck} label="Имэйл баталгаажсан" value={user.emailVerified} />
          </section>
        </div>
      )}
    </main>
  );
}
