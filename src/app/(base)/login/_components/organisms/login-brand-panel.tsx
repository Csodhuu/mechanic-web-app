import { ShieldCheck } from "lucide-react";

export function LoginBrandPanel() {
  return (
    <section className="flex flex-col justify-between bg-slate-950 p-6 text-white sm:p-8">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-200">
          <ShieldCheck className="size-3.5" />
          Mechanic ERP
        </div>
        <h1 className="mt-5 text-xl font-bold leading-tight sm:text-4xl">
          Засварын ажил, үзлэг, хяналтыг нэг урсгалаар удирдана.
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
          Нэвтэрсний дараа машинуудын үзлэг, service order, хяналтын шилжилт,
          дууссан ажлын түүх нэг дор харагдана.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-3 text-white/90">
        {[
          { label: "Шалгалт", value: "Live" },
          { label: "Order", value: "Trackable" },
          { label: "History", value: "Auditable" },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
              {item.label}
            </p>
            <p className="mt-1 text-base font-bold sm:text-lg">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
