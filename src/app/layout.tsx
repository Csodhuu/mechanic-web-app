import "./globals.css";
import type { Metadata } from "next";
import { ReactNode, Suspense } from "react";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "ERP-Admin",
  description: "Your app description",
};

export default function Root({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <head />
      <body>
        <Suspense>{children}</Suspense>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
