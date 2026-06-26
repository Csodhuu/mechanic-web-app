import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Eye, EyeOff, Loader2, Mail, ShieldCheck } from "lucide-react";
import type { FormEvent } from "react";

type LoginFormPanelProps = {
  formError: string;
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
  onSubmit: (event: FormEvent) => void;
};

export function LoginFormPanel({
  formError,
  loading,
  loginInput,
  rememberMe,
  showPassword,
  onInputChange,
  onRememberChange,
  onShowPasswordChange,
  onSubmit,
}: LoginFormPanelProps) {
  return (
    <section className="p-6 sm:p-8">
      <div className="mx-auto max-w-md">
        <div className="mb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <ShieldCheck className="size-7" />
          </div>
          <h2 className="mt-4 text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
            Нэвтрэх
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            Ажилтны эрхээр системд нэвтэрнэ үү.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">И-мэйл</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={loginInput.email}
                onChange={(event) => onInputChange({ ...loginInput, email: event.target.value })}
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
                onChange={(event) => onInputChange({ ...loginInput, password: event.target.value })}
                className="pr-12"
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => onShowPasswordChange(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-900"
              >
                {showPassword ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <label className="flex items-center gap-2">
              <Checkbox checked={rememberMe} onCheckedChange={(checked) => onRememberChange(!!checked)} />
              <span className="text-sm text-slate-600">Намайг сана</span>
            </label>

            <button type="button" className="text-sm font-medium text-blue-700 hover:underline">
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
  );
}
