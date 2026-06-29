import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import type { FormEvent } from "react";

type LoginFormPanelProps = {
  formError: string;
  fieldErrors: Partial<Record<"email" | "password", string>>;
  loading: boolean;
  loginInput: {
    email: string;
    password: string;
  };
  rememberMe: boolean;
  showPassword: boolean;
  onInputChange: (value: { email: string; password: string }) => void;
  onRememberChange: (value: boolean) => void;
  onShowPasswordChange: (value: boolean) => void;
  onForgotPassword: () => void;
  onSubmit: (event: FormEvent) => void;
};

export function LoginFormPanel({
  formError,
  fieldErrors,
  loading,
  loginInput,
  rememberMe,
  showPassword,
  onInputChange,
  onRememberChange,
  onShowPasswordChange,
  onForgotPassword,
  onSubmit,
}: LoginFormPanelProps) {
  const emailErrorId = fieldErrors.email ? "email-error" : undefined;
  const passwordErrorId = fieldErrors.password ? "password-error" : undefined;

  return (
    <section className="bg-white px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
      <div className="mx-auto flex min-h-full max-w-[430px] flex-col justify-center">
        <div className="mb-7">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-sm">
            <ShieldCheck className="size-6" />
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            Secure access
          </p>
          <h2 className="mt-2 text-2xl font-bold leading-8 text-slate-950 sm:text-3xl">
            Ажилтны нэвтрэлт
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Зөвшөөрөгдсөн эрхээрээ орж ажлын самбараа нээнэ.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
              И-мэйл
            </Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                spellCheck={false}
                placeholder="name@company.mn"
                value={loginInput.email}
                onChange={(event) => onInputChange({ ...loginInput, email: event.target.value })}
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={emailErrorId}
                className={cn("h-11 pl-10", fieldErrors.email && "border-red-300")}
              />
            </div>
            {fieldErrors.email && (
              <p id="email-error" className="text-xs font-medium text-red-600">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-semibold text-slate-700">
              Нууц үг
            </Label>
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Нууц үгээ оруулна уу"
                value={loginInput.password}
                onChange={(event) => onInputChange({ ...loginInput, password: event.target.value })}
                aria-invalid={Boolean(fieldErrors.password)}
                aria-describedby={passwordErrorId}
                className={cn("h-11 px-10", fieldErrors.password && "border-red-300")}
              />
              <button
                type="button"
                aria-label={showPassword ? "Нууц үг нуух" : "Нууц үг харах"}
                onClick={() => onShowPasswordChange(!showPassword)}
                className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {fieldErrors.password && (
              <p id="password-error" className="text-xs font-medium text-red-600">
                {fieldErrors.password}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between gap-4">
            <label className="flex cursor-pointer items-center gap-2">
              <Checkbox
                checked={rememberMe}
                onCheckedChange={(checked) => onRememberChange(!!checked)}
              />
              <span className="select-none text-sm font-medium text-slate-600">Намайг сана</span>
            </label>

            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm font-semibold text-slate-700 transition hover:text-slate-950"
            >
              Нууц үг мартсан?
            </button>
          </div>

          {formError && (
            <div className="flex gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertCircle className="mt-0.5 size-4 shrink-0" />
              <p className="leading-5">{formError}</p>
            </div>
          )}

          <Button type="submit" disabled={loading} className="h-11 w-full text-sm font-semibold">
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

        <p className="mt-8 text-center text-xs text-slate-400">© 2026 AutoSync ERP</p>
      </div>
    </section>
  );
}
