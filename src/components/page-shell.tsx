"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type PageShellProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  eyebrow?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function PageShell({
  title,
  description,
  action,
  eyebrow,
  icon,
  children,
  className,
  contentClassName,
}: PageShellProps) {
  return (
    <main
      className={cn(
        "mx-auto w-full max-w-[1120px] px-3 pb-[calc(6rem+env(safe-area-inset-bottom))] pt-3 sm:px-6 sm:pt-4 lg:px-8",
        className
      )}
    >
      <header className="mb-3 border-b border-slate-200/80 pb-3 sm:mb-4 sm:pb-4">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:gap-4">
          <div className="min-w-0">
            {eyebrow && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600">
                {eyebrow}
              </p>
            )}
            <div className="mt-1 flex items-center gap-3">
              {icon && (
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 sm:h-10 sm:w-10">
                  {icon}
                </span>
              )}
              <div className="min-w-0">
                <h1 className="break-words text-lg font-bold leading-6 text-slate-950 sm:text-[22px] sm:leading-7">
                  {title}
                </h1>
                {description && (
                  <p className="mt-1 hidden max-w-xl text-[13px] leading-5 text-slate-500 sm:block">
                    {description}
                  </p>
                )}
              </div>
            </div>
          </div>
          {action && <div className="w-full shrink-0 self-start sm:w-auto">{action}</div>}
        </div>
      </header>

      <div className={cn("space-y-4", contentClassName)}>{children}</div>
    </main>
  );
}

type MetricCardProps = {
  label: string;
  value: string;
  description?: string;
  tone?: "blue" | "emerald" | "amber" | "slate";
  icon?: ReactNode;
};

const toneClass: Record<NonNullable<MetricCardProps["tone"]>, string> = {
  blue: "bg-blue-50 text-blue-700 ring-blue-100",
  emerald: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  amber: "bg-amber-50 text-amber-700 ring-amber-100",
  slate: "bg-slate-100 text-slate-700 ring-slate-200",
};

export function MetricCard({ label, value, description, tone = "blue", icon }: MetricCardProps) {
  return (
    <div className="rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-600">
            {label}
          </p>
          <p className="mt-1 break-words text-lg font-bold leading-6 text-slate-950">{value}</p>
          {description && (
            <p className="mt-1 hidden text-[13px] leading-5 text-slate-500 sm:block">
              {description}
            </p>
          )}
        </div>
        {icon && (
          <span
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1",
              toneClass[tone]
            )}
          >
            {icon}
          </span>
        )}
      </div>
    </div>
  );
}

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center shadow-sm">
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  );
}
