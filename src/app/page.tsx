import { TextScanner } from "@/components/text-scanner";

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#e0f2fe_0%,#f8fafc_32%,#e2e8f0_100%)] px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section className="overflow-hidden rounded-[2rem] bg-slate-950 px-5 py-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.35)] sm:px-8 sm:py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-300">
                Mechanic Mobile Scanner
              </p>
              <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                Утаснаас нээгээд камераар текст уншдаг дэлгэц
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Энэ дэлгэц нь гар утсанд зохицсон layout-тай бөгөөд камер эсвэл
                зураг ашиглан текст танина. `localhost` эсвэл `https` орчинд
                камерын permission зөвшөөрөх шаардлагатай.
              </p>
            </div>

            <div className="grid gap-3 rounded-[1.5rem] bg-white/8 p-4 backdrop-blur sm:grid-cols-3 lg:min-w-[360px]">
              <div>
                <p className="text-2xl font-semibold text-cyan-300">Mobile</p>
                <p className="mt-1 text-sm text-slate-300">
                  Жижиг дэлгэц дээр давхар багана задрахгүй.
                </p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-cyan-300">Camera</p>
                <p className="mt-1 text-sm text-slate-300">
                  Арын камерыг нээж frame-ээс текст авна.
                </p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-cyan-300">OCR</p>
                <p className="mt-1 text-sm text-slate-300">
                  Зураг болон live capture дээр ажиллана.
                </p>
              </div>
            </div>
          </div>
        </section>

        <TextScanner />
      </div>
    </main>
  );
}
