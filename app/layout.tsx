import type { Metadata, Viewport } from "next";
import { UserProvider } from "@/lib/UserContext";
import NotificationManager from "@/components/notifications/NotificationManager";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import "./globals.css";

export const metadata: Metadata = {
  title: "TheManifest | Kozmik Yolculuk",
  description: "Yapay zeka destekli spiritüel rehberiniz.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "TheManifest",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F0F12",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>

      </head>
      <body className="antialiased bg-manifest-background text-manifest-text">
        <ErrorBoundary>
          <UserProvider>
            <NotificationManager />
            {children}
          </UserProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
