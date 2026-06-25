"use client";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { ThemeProvider } from "@/components/theme-provider";
import WithAuthClient from "@/components/with-auth/with-auth";
import { ReactNode, Suspense } from "react";
import { Toaster } from "sonner";

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return <AppWithMe>{children}</AppWithMe>;
}

function AppWithMe({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-[100dvh] w-full bg-slate-50 text-slate-950 transition-colors duration-300">
        <div className="flex h-[100dvh] min-h-[100svh] w-full overflow-hidden">
          <div className="w-full flex-1 overflow-auto">
            <div className="mx-auto max-w-full">
              <WithAuthClient>
                <Suspense>{children}</Suspense>
                <Toaster richColors position="top-center" />
              </WithAuthClient>
            </div>
          </div>
        </div>
        <BottomNav />
      </div>
    </ThemeProvider>
  );
}
