"use client";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { ThemeProvider } from "@/components/theme-provider";
import WithAuthClient from "@/components/with-auth/with-auth";
import { ReactNode, Suspense } from "react";

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
        <div className="min-h-[100svh] w-full">
          <div className="mx-auto max-w-full">
            <WithAuthClient>
              <Suspense>{children}</Suspense>
            </WithAuthClient>
          </div>
        </div>
        <BottomNav />
      </div>
    </ThemeProvider>
  );
}
