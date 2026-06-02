"use client";
import { deleteCookie, setCookie } from "cookies-next";
import { ArrowRight, Eye, EyeOff, Loader2, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/authClient";

export default function Login() {
  const router = useRouter();

  const [loginInput, setLoginInput] = useState<{
    email: string | null;
    password: string | null;
  }>({ email: null, password: null });

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
            }, 150);
            setTimeout(() => {
              deleteCookie("__Secure-better-auth.session_token");
            }, 1000);
          },
          onError: (ctx) => {
            toast.error(
              ctx.error.message ||
                "Нэвтрэхэд алдаа гарлаа. Та мэдээллээ шалгана уу.",
            );
          },
        },
      );
    } catch (error) {
      console.error("System Error:", error);
      toast.error("Системийн алдаа. Та дахин оролдоно уу.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full p-5 h-screen  flex flex-col justify-center">
      <form onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-primary">
            И-мэйл
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-primary" />
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              className=" pl-10 "
              value={loginInput.email || ""}
              onChange={(e) =>
                setLoginInput({ ...loginInput, email: e.target.value })
              }
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-primary">
            Нууц үг
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              className="pr-10 "
              value={loginInput.password || ""}
              onChange={(e) =>
                setLoginInput({ ...loginInput, password: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-primary "
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        {formError && (
          <p className="text-center text-sm text-red-500">{formError}</p>
        )}

        <Button
          type="submit"
          className="flex w-full items-center justify-center bg-primary text-white transition-all duration-200 "
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Түр хүлээнэ үү ...
            </>
          ) : (
            <>
              Нэвтрэх
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
