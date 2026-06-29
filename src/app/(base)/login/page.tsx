"use client";

import { deleteCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

import { authClient } from "@/lib/authClient";
import { LoginBrandPanel } from "./_components/organisms/login-brand-panel";
import { LoginFormPanel } from "./_components/organisms/login-form-panel";

type LoginInput = {
  email: string;
  password: string;
};

type LoginFieldErrors = Partial<Record<keyof LoginInput, string>>;

const REMEMBERED_EMAIL_KEY = "mechanic-login-email";

function validateLoginInput(input: LoginInput): LoginFieldErrors {
  const errors: LoginFieldErrors = {};
  const email = input.email.trim();

  if (!email) {
    errors.email = "И-мэйл хаягаа оруулна уу.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "И-мэйл хаягийн формат буруу байна.";
  }

  if (!input.password) {
    errors.password = "Нууц үгээ оруулна уу.";
  }

  return errors;
}

export default function Login() {
  const router = useRouter();

  const [loginInput, setLoginInput] = useState<LoginInput>(() => ({
    email:
      typeof window === "undefined"
        ? ""
        : (window.localStorage.getItem(REMEMBERED_EMAIL_KEY) ?? ""),
    password: "",
  }));
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const updateLoginInput = (value: LoginInput) => {
    setLoginInput(value);
    setFormError("");
    setFieldErrors((current) => {
      const next = { ...current };
      if (value.email.trim()) delete next.email;
      if (value.password) delete next.password;
      return next;
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setFormError("");
    setFieldErrors({});

    const validationErrors = validateLoginInput(loginInput);
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const email = loginInput.email.trim().toLowerCase();

      await authClient.signIn.email(
        {
          email,
          password: loginInput.password,
        },
        {
          onSuccess: async (ctx) => {
            const authToken = ctx.response.headers.get("set-auth-token");

            if (!authToken) {
              toast.error("Нэвтрэх token олдсонгүй.");
              return;
            }

            setCookie("token", authToken, {
              sameSite: "lax",
              ...(rememberMe ? { maxAge: 60 * 60 * 24 * 30 } : {}),
            });

            if (rememberMe) {
              window.localStorage.setItem(REMEMBERED_EMAIL_KEY, email);
            } else {
              window.localStorage.removeItem(REMEMBERED_EMAIL_KEY);
            }

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
            const message = ctx.error.message || "И-мэйл эсвэл нууц үг буруу байна.";
            setFormError(message);
            toast.error(message);
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
    <div className="min-h-screen bg-slate-100 px-3 py-4 sm:px-6 sm:py-6">
      <div className="mx-auto flex min-h-[calc(100svh-2rem)] w-full max-w-6xl items-center justify-center sm:min-h-[calc(100svh-3rem)]">
        <div className="grid w-full max-w-[480px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_80px_-42px_rgba(15,23,42,0.7)] md:max-w-5xl md:grid-cols-[0.95fr_1.05fr] lg:max-w-6xl lg:grid-cols-[1.08fr_0.92fr]">
          <LoginBrandPanel />
          <LoginFormPanel
            formError={formError}
            fieldErrors={fieldErrors}
            loading={loading}
            loginInput={loginInput}
            rememberMe={rememberMe}
            showPassword={showPassword}
            onInputChange={updateLoginInput}
            onRememberChange={setRememberMe}
            onShowPasswordChange={setShowPassword}
            onForgotPassword={() => toast.info("Нууц үг сэргээх бол админтайгаа холбогдоно уу.")}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
