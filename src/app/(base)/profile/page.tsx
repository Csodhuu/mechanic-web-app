"use client";

import { EmptyState, MetricCard, PageShell } from "@/components/page-shell";
import { apiClient } from "@/lib/authClient";
import { cn } from "@/lib/utils";
import { getCookie } from "cookies-next";
import type { LucideIcon } from "lucide-react";
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
  Awaited<ReturnType<typeof apiClient.api.user.me.get>>["data"]
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
  icon: LucideIcon;
  label: string;
  value?: string | number | boolean | null;
}) {
  return (
    <div className="flex items-start gap-3 border-b border-slate-100 py-3 last:border-b-0">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-slate-400">{label}</p>
        <p className="mt-0.5 truncate text-sm font-semibold text-slate-950">
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
    <PageShell
      eyebrow="Account"
      title="Профайл"
      description="Нэвтэрсэн ажилтны эрх, салбар, холбоо барих мэдээлэл."
      icon={<UserRound className="size-5" />}
    >
      {isLoading && (
        <EmptyState title="Уншиж байна" description="Хувийн мэдээлэл татаж байна..." />
      )}

      {!isLoading && error && (
        <EmptyState title="Мэдээлэл авах боломжгүй" description={error} />
      )}

      {!isLoading && user && (
        <>
          <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
            <div className="bg-slate-950 px-4 py-5 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white/10 text-xl font-bold">
                  {user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={user.image} alt={user.name} className="h-full w-full object-cover" />
                  ) : (
                    initials
                  )}
                </div>
                <div className="min-w-0">
                  <h2 className="truncate text-xl font-bold">{user.name}</h2>
                  <p className="mt-1 truncate text-sm text-slate-300">{user.email}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-3 sm:grid-cols-3">
            <MetricCard
              label="Төрөл"
              value={userKind}
              description="Хэрэглэгчийн ангилал"
              tone="blue"
              icon={<ShieldCheck className="size-5" />}
            />
            <MetricCard
              label="Имэйл"
              value={user.emailVerified ? "Баталгаажсан" : "Баталгаажаагүй"}
              description="Нэвтрэх мэдээллийн төлөв"
              tone="emerald"
              icon={<BadgeCheck className="size-5" />}
            />
            <MetricCard
              label="Төлөв"
              value={user.banned ? "Хязгаарласан" : "Идэвхтэй"}
              description="Системийн эрх"
              tone={user.banned ? "amber" : "slate"}
              icon={<UserRound className="size-5" />}
            />
          </section>

          <section className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200/80 bg-white px-4 shadow-sm">
              <DetailRow icon={UserRound} label="Нэр" value={user.name} />
              <DetailRow icon={Mail} label="Имэйл" value={user.email} />
              <DetailRow icon={ShieldCheck} label="Эрх" value={user.role ?? userKind} />
              <DetailRow icon={BriefcaseBusiness} label="Ажилтны ID" value={user.employeeId} />
            </div>
            <div className={cn("rounded-2xl border border-slate-200/80 bg-white px-4 shadow-sm")}>
              <DetailRow icon={Building2} label="Компанийн ID" value={user.companyId} />
              <DetailRow icon={IdCard} label="Салбарын ID" value={user.branchId} />
              <DetailRow icon={CalendarDays} label="Үүссэн огноо" value={formatDate(user.createdAt)} />
              <DetailRow icon={BadgeCheck} label="Имэйл баталгаажсан" value={user.emailVerified} />
            </div>
          </section>
        </>
      )}
    </PageShell>
  );
}
