"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, History, House, ShieldCheck, UserRound } from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/dashboard",
    label: "Нүүр",
    icon: House,
    match: (pathname: string) => pathname === "/" || pathname === "/dashboard",
  },
  {
    href: "/jobs",
    label: "Ажлууд",
    icon: ClipboardList,
    match: (pathname: string) => pathname.startsWith("/jobs"),
  },
  {
    href: "/inspection",
    label: "Хяналт",
    icon: ShieldCheck,
    match: (pathname: string) => pathname.startsWith("/inspection"),
  },
  {
    href: "/history",
    label: "Түүх",
    icon: History,
    match: (pathname: string) => pathname.startsWith("/history"),
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
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white xl:hidden"
    >
      <div className="mx-auto grid h-[76px] w-full max-w-[430px] grid-cols-5 pb-[env(safe-area-inset-bottom)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.match ? item.match(pathname) : pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 text-slate-500 transition hover:bg-slate-50",
                isActive && "text-blue-600"
              )}
            >
              <span className="flex h-8 items-center justify-center">
                <Icon
                  className={cn("h-7 w-7", isActive && "fill-blue-600/10")}
                  strokeWidth={isActive ? 2.2 : 1.9}
                />
              </span>
              <span
                className={cn("text-[12px] font-medium leading-none", isActive && "font-semibold")}
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
