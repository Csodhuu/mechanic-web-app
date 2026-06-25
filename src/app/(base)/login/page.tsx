"use client";

import { deleteCookie, setCookie } from "cookies-next";
import { ArrowRight, Eye, EyeOff, Loader2, Mail, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/authClient";

export default function Login() {
  const router = useRouter();

  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!loginInput.email || !loginInput.password) {
      setFormError("И-мэйл болон нууц үгээ бөглөнө үү.");
      return;
    }

    setLoading(true);

    try {
      await authClient.signIn.email(
        {
          email: loginInput.email,
          password: loginInput.password,
        },
        {
          onSuccess: async (ctx) => {
            const authToken = ctx.response.headers.get("set-auth-token");

            if (!authToken) {
              toast.error("Нэвтрэх token олдсонгүй.");
              return;
            }

            setCookie("token", authToken);

            const images = [
              "/advertisement/champ.webp",
              "/advertisement/monroe.webp",
              "/advertisement/perede.webp",
              "/advertisement/moog.webp",
            ];

            images.forEach((src) => {
              const img = new Image();
              img.src = src;
            });

            sessionStorage.setItem("showLoginAdvertisement", "true");
            toast.success("Амжилттай нэвтэрлээ.");

            setTimeout(() => {
              router.push("/dashboard");
            }, 100);

            setTimeout(() => {
              deleteCookie("__Secure-better-auth.session_token");
            }, 1000);
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Нэвтрэхэд алдаа гарлаа.");
          },
        }
      );
    } catch (error) {
      console.error(error);
      toast.error("Системийн алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.12),transparent_30%),radial-gradient(circle_at_top_right,rgba(15,23,42,0.08),transparent_26%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] px-4 py-6">
      <div className="mx-auto flex min-h-[calc(100svh-3rem)] w-full max-w-5xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-[0_28px_90px_-36px_rgba(15,23,42,0.45)] lg:grid-cols-[1.05fr_0.95fr]">
          <section className="flex flex-col justify-between bg-slate-950 p-6 text-white sm:p-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-200">
                <ShieldCheck className="size-3.5" />
                Mechanic ERP
              </div>
              <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
                Засварын ажил, үзлэг, хяналтыг нэг урсгалаар удирдана.
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
                Нэвтэрсний дараа машинуудын үзлэг, service order, хяналтын шилжилт, дууссан
                ажлын түүх нэг дор харагдана.
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
                  <p className="mt-1 text-lg font-bold">{item.value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="p-6 sm:p-8">
            <div className="mx-auto max-w-md">
              <div className="mb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <ShieldCheck className="size-7" />
                </div>
                <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950">
                  Нэвтрэх
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Ажилтны эрхээр системд нэвтэрнэ үү.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">И-мэйл</Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={loginInput.email}
                      onChange={(e) =>
                        setLoginInput({
                          ...loginInput,
                          email: e.target.value,
                        })
                      }
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Нууц үг</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={loginInput.password}
                      onChange={(e) =>
                        setLoginInput({
                          ...loginInput,
                          password: e.target.value,
                        })
                      }
                      className="pr-12"
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-900"
                    >
                      {showPassword ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(!!checked)}
                    />
                    <span className="text-sm text-slate-600">Намайг сана</span>
                  </label>

                  <button
                    type="button"
                    className="text-sm font-medium text-blue-700 hover:underline"
                  >
                    Нууц үг мартсан?
                  </button>
                </div>

                {formError && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {formError}
                  </div>
                )}

                <Button type="submit" disabled={loading} className="h-11 w-full">
                  {loading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Түр хүлээнэ үү...
                    </>
                  ) : (
                    <>
                      Нэвтрэх
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-8 grid grid-cols-2 gap-3 text-sm text-slate-500">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <p className="font-semibold text-slate-900">Аюулгүй</p>
                  <p className="mt-1 text-xs leading-5">Session token cookie-оор хадгална.</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <p className="font-semibold text-slate-900">Түргэн</p>
                  <p className="mt-1 text-xs leading-5">Dashboard руу шууд шилжинэ.</p>
                </div>
              </div>

              <p className="mt-6 text-center text-xs text-slate-400">© 2026 AutoSync ERP System</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
