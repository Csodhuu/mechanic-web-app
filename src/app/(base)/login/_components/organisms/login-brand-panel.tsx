import { ClipboardCheck, ShieldCheck, Wrench } from "lucide-react";
import Image from "next/image";

export function LoginBrandPanel() {
  return (
    <section className="relative hidden min-h-[560px] overflow-hidden bg-[#111827] p-6 text-white md:block lg:min-h-[640px] lg:p-10">
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:36px_36px]" />
      <Image
        src="/onlylogo.png"
        alt=""
        width={520}
        height={520}
        priority
        className="pointer-events-none absolute -right-28 bottom-2 w-72 opacity-[0.09] sm:w-96 lg:w-[460px]"
      />

      <div className="relative z-10 flex min-h-full flex-col justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-lg bg-white p-2 shadow-sm">
              <Image src="/onlylogo.png" alt="AutoSync" width={36} height={36} priority />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
                AutoSync
              </p>
              <p className="text-sm font-semibold text-white">Mechanic ERP</p>
            </div>
          </div>

          <div className="mt-10 max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Operations console
            </p>
            <h1 className="mt-3 text-2xl font-bold leading-tight sm:text-4xl">
              Хяналт, checklist, засварын ажлыг нэг дарааллаар.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-6 text-slate-300">
              Ажилтны эрхээр нэвтэрч өнөөдрийн ажлын урсгалаа үргэлжлүүлнэ.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-2">
          {[
            { icon: ShieldCheck, label: "01", value: "Оношлогоо" },
            { icon: ClipboardCheck, label: "02", value: "Checklist бөглөх" },
            { icon: Wrench, label: "03", value: "Засвар үйлчилгээ эхлүүлэх" },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="grid grid-cols-[36px_minmax(0,1fr)] items-center gap-3 rounded-lg border border-white/10 bg-white/[0.06] p-3 backdrop-blur"
              >
                <span className="flex size-9 items-center justify-center rounded-md bg-white text-slate-950">
                  <Icon className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-300">
                    {item.label}
                  </p>
                  <p className="mt-0.5 truncate text-sm font-semibold text-white">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-between gap-3 border-t border-white/10 pt-5 text-xs text-slate-400">
          <span>Autosync.mn</span>
          <span className="inline-flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-400" />
            Online
          </span>
        </div>
      </div>
    </section>
  );
}
