import { MetricCard } from "@/components/page-shell";
import { cn } from "@/lib/utils";
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
import { ProfileDetailRow } from "../atoms/profile-detail-row";
import { formatProfileDate, getInitials, kindLabel, type MeQuery } from "../../_types/profile";

export function ProfileContent({ user }: { user: MeQuery }) {
  const initials = getInitials(user.name);
  const userKind = user.kind ? (kindLabel[user.kind] ?? user.kind) : "-";

  return (
    <>
      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="bg-slate-950 px-4 py-5 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white/10 text-lg font-bold sm:h-16 sm:w-16 sm:text-xl">
              {user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.image} alt={user.name} className="h-full w-full object-cover" />
              ) : (
                initials
              )}
            </div>
            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold sm:text-xl">{user.name}</h2>
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
          <ProfileDetailRow icon={UserRound} label="Нэр" value={user.name} />
          <ProfileDetailRow icon={Mail} label="Имэйл" value={user.email} />
          <ProfileDetailRow icon={ShieldCheck} label="Эрх" value={user.role ?? userKind} />
          <ProfileDetailRow icon={BriefcaseBusiness} label="Ажилтны ID" value={user.employeeId} />
        </div>
        <div className={cn("rounded-2xl border border-slate-200/80 bg-white px-4 shadow-sm")}>
          <ProfileDetailRow icon={Building2} label="Компанийн ID" value={user.companyId} />
          <ProfileDetailRow icon={IdCard} label="Салбарын ID" value={user.branchId} />
          <ProfileDetailRow icon={CalendarDays} label="Үүссэн огноо" value={formatProfileDate(user.createdAt)} />
          <ProfileDetailRow icon={BadgeCheck} label="Имэйл баталгаажсан" value={user.emailVerified} />
        </div>
      </section>
    </>
  );
}
