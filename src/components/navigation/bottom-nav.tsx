"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ClipboardList,
  History,
  House,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";

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
    href: "/control",
    label: "Хяналт",
    icon: ShieldCheck,
    match: (pathname: string) => pathname.startsWith("/control"),
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
      className="fixed inset-x-0 bottom-0 z-50 xl:hidden"
    >
      <div className="mx-auto w-full max-w-3xl px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]">
        <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/95 shadow-[0_-12px_40px_rgba(37,99,235,0.18)] backdrop-blur-xl">
          <div className="grid grid-cols-5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.match
                ? item.match(pathname)
                : pathname === item.href;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "flex min-h-20 flex-col items-center justify-center gap-1.5 px-2 py-3 text-slate-500 transition",
                      "hover:bg-slate-50",
                      isActive && "text-blue-600",
                    )}
                  >
                    <span
                      className={cn(
                        "rounded-2xl border border-transparent p-2.5 transition",
                        isActive &&
                          "border-blue-100 bg-linear-to-b from-blue-50 to-white text-blue-600 shadow-[0_10px_24px_rgba(37,99,235,0.16)]",
                      )}
                    >
                      <Icon className="h-6 w-6" strokeWidth={1.8} />
                    </span>
                    <span
                      className={cn(
                        "text-[11px] font-medium",
                        isActive && "font-semibold",
                      )}
                    >
                      {item.label}
                    </span>
                  </Link>
                );

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "flex min-h-20 flex-col items-center justify-center gap-1.5 px-2 py-3 text-slate-500 transition",
                    "hover:bg-slate-50",
                    isActive && "text-blue-600",
                  )}
                >
                  <span
                    className={cn(
                      "rounded-2xl border border-transparent p-2.5 transition",
                      isActive &&
                        "border-blue-100 bg-linear-to-b from-blue-50 to-white text-blue-600 shadow-[0_10px_24px_rgba(37,99,235,0.16)]",
                    )}
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <span
                    className={cn(
                      "text-[11px] font-medium",
                      isActive && "font-semibold",
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
