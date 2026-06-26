"use client";

import { deleteCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

import { authClient } from "@/lib/authClient";
import { LoginBrandPanel } from "./_components/organisms/login-brand-panel";
import { LoginFormPanel } from "./_components/organisms/login-form-panel";

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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
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
          <LoginBrandPanel />
          <LoginFormPanel
            formError={formError}
            loading={loading}
            loginInput={loginInput}
            rememberMe={rememberMe}
            showPassword={showPassword}
            onInputChange={setLoginInput}
            onRememberChange={setRememberMe}
            onShowPasswordChange={setShowPassword}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
