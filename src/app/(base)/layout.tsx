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
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 transition-colors duration-300 w-full">
        <div className="flex h-screen overflow-hidden w-full">
          <div className="flex-1 overflow-auto w-full">
            <div className="mx-auto max-w-full space-y-8 p-4 pb-32 xl:pb-4">
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
