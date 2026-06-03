import "./globals.css";
import type { Metadata } from "next";
import type { Viewport } from "next";
import { ReactNode, Suspense } from "react";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  applicationName: "Mechanic ERP",
  title: "Mechanic ERP",
  description: "Mechanic service workflow dashboard",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Mechanic ERP",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/onlylogo.png",
    apple: "/onlylogo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f8fafc",
  colorScheme: "light",
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
