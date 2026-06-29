"use client";

import { cn } from "@/lib/utils";
import { ClipboardCheck, ClipboardList, History, House, Truck, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/dashboard",
    label: "Нүүр",
    icon: House,
    match: (pathname: string) => pathname === "/" || pathname === "/dashboard",
  },
  {
    href: "/jobs",
    label: "Ажил",
    icon: ClipboardList,
    match: (pathname: string) => pathname.startsWith("/jobs"),
  },
  {
    href: "/inspection",
    label: "Үзлэг",
    icon: ClipboardCheck,
    match: (pathname: string) => pathname.startsWith("/inspection"),
  },
  {
    href: "/history",
    label: "Түүх",
    icon: History,
    match: (pathname: string) => pathname.startsWith("/history"),
  },
  {
    href: "/fleet-inspection",
    label: "Fleet",
    icon: Truck,
    match: (pathname: string) => pathname.startsWith("/fleet-inspection"),
  },
  {
    href: "/profile",
    label: "Профайл",
    icon: UserRound,
    match: (pathname: string) => pathname.startsWith("/profile"),
  },
];

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
      <div className="mx-auto grid h-[76px] w-full max-w-[560px] grid-cols-6 pb-[env(safe-area-inset-bottom)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.match(pathname);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 text-slate-500 transition hover:bg-slate-50",
                isActive && "text-blue-600"
              )}
            >
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-2xl",
                  isActive && "bg-blue-50"
                )}
              >
                <Icon className="size-5" strokeWidth={isActive ? 2.3 : 1.9} />
              </span>
              <span
                className={cn("text-[11px] font-medium leading-none", isActive && "font-semibold")}
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
