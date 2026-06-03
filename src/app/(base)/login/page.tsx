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

  const [loginInput, setLoginInput] = useState<{
    email: string;
    password: string;
  }>({
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
              toast.error("Нэвтрэх токен олдсонгүй.");
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

            toast.success("Амжилттай нэвтэрлээ!");

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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-100 px-4">
      {/* Background */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-orange-400/10 blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/80 p-8 shadow-2xl backdrop-blur-xl">
          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          )}

          {/* Header */}
          <div className="mb-8 flex flex-col items-center">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-orange-500 shadow-xl">
              <ShieldCheck className="h-10 w-10 text-white" />
            </div>

            <h1 className="text-3xl font-bold text-slate-900">AutoSync</h1>

            <p className="mt-2 text-center text-sm text-slate-500">Тавтай морилно уу</p>

            <p className="text-center text-sm text-slate-400">Өөрийн бүртгэлээр нэвтэрнэ үү</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="font-medium">
                И-мэйл
              </Label>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

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
                  className="h-12 rounded-xl border-slate-200 pl-11 transition-all focus-visible:ring-2 focus-visible:ring-primary"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="font-medium">
                Нууц үг
              </Label>

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
                  className="h-12 pl-4 rounded-xl border-slate-200 pr-12 transition-all focus-visible:ring-2 focus-visible:ring-primary"
                />

                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-primary"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(!!checked)}
                />

                <span className="text-sm text-slate-600">Намайг сана</span>
              </div>

              <button type="button" className="text-sm font-medium text-primary hover:underline">
                Нууц үг мартсан?
              </button>
            </div>

            {/* Error */}
            {formError && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-500">
                {formError}
              </div>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-xl bg-gradient-to-r from-primary to-orange-500 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Түр хүлээнэ үү...
                </>
              ) : (
                <>
                  Нэвтрэх
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 border-t pt-5 text-center">
            <p className="text-xs text-slate-400">© 2026 AutoSync ERP System</p>
          </div>
        </div>
      </div>
    </div>
  );
}
