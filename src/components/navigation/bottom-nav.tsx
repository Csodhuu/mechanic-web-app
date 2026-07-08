"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { ClipboardCheck, ClipboardList, History, House, Wrench } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
  match: (pathname: string) => boolean;
};

const navItems: NavItem[] = [
  {
    href: "/dashboard",
    label: "Нүүр",
    description: "Өдрийн тойм",
    icon: House,
    match: (pathname) => pathname === "/" || pathname === "/dashboard",
  },
  {
    href: "/jobs",
    label: "Ажил",
    description: "Захиалга үүсгэх",
    icon: ClipboardList,
    match: (pathname) =>
      pathname.startsWith("/jobs") || pathname.startsWith("/service-order-detail"),
  },
  {
    href: "/control",
    label: "Засвар",
    description: "Явц хянах",
    icon: Wrench,
    match: (pathname) => pathname.startsWith("/control"),
  },
  {
    href: "/inspection",
    label: "Үзлэг",
    description: "Checklist",
    icon: ClipboardCheck,
    match: (pathname) => pathname.startsWith("/inspection"),
  },
  {
    href: "/history",
    label: "Түүх",
    description: "Дууссан ажил",
    icon: History,
    match: (pathname) => pathname.startsWith("/history"),
  },
];

export function DesktopNav() {
  const pathname = usePathname();

  if (pathname === "/login") {
    return null;
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-slate-200 bg-white xl:flex xl:flex-col">
      <div className="border-b border-slate-100 px-5 py-5">
        <Link href="/dashboard" className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-slate-950 text-white">
            <Wrench className="size-5" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-bold text-slate-950">Mechanic ERP</span>
            <span className="block truncate text-xs text-slate-500">Service workflow</span>
          </span>
        </Link>
      </div>

      <nav aria-label="Desktop navigation" className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.match(pathname);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950",
                isActive && "bg-blue-50 text-blue-700 ring-1 ring-blue-100"
              )}
            >
              <span
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition group-hover:bg-white group-hover:text-slate-700",
                  isActive && "bg-white text-blue-600"
                )}
              >
                <Icon className="size-4" />
              </span>
              <span className="min-w-0">
                <span className="block truncate">{item.label}</span>
                <span
                  className={cn(
                    "block truncate text-xs font-normal text-slate-400",
                    isActive && "text-blue-500"
                  )}
                >
                  {item.description}
                </span>
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-100 px-5 py-4 text-xs leading-5 text-slate-500">
        Шуурхай шилжилт, захиалга, засварын явцыг нэг цэснээс удирдана.
      </div>
    </aside>
  );
}

export function BottomNav() {
  const pathname = usePathname();

  if (pathname === "/login") {
    return null;
  }

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 shadow-[0_-12px_40px_-30px_rgba(15,23,42,0.5)] backdrop-blur xl:hidden"
    >
      <div className="mx-auto grid h-[78px] w-full max-w-[640px] grid-cols-5 pb-[env(safe-area-inset-bottom)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.match(pathname);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex min-w-0 flex-col items-center justify-center gap-1 px-1 text-slate-500 transition hover:bg-slate-50",
                isActive && "text-blue-600"
              )}
            >
              <span
                className={cn(
                  "flex size-8 items-center justify-center rounded-xl",
                  isActive && "bg-blue-50"
                )}
              >
                <Icon className="size-[18px]" strokeWidth={isActive ? 2.3 : 1.9} />
              </span>
              <span
                className={cn(
                  "max-w-full truncate text-[10px] font-medium leading-none sm:text-[11px]",
                  isActive && "font-semibold"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
