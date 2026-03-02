import type { Metadata, Viewport } from "next";
import { UserProvider } from "@/lib/UserContext";
import NotificationManager from "@/components/notifications/NotificationManager";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import EnergyTheme from "@/components/layout/EnergyTheme";
import Link from "next/link";
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
      <body className="antialiased bg-manifest-background text-manifest-text min-h-screen flex flex-col">
        <ErrorBoundary>
          <UserProvider>
            <NotificationManager />
            <EnergyTheme />
            <main className="flex-grow">
              {children}
            </main>
            <footer className="bg-black/20 py-4 mt-auto">
              <div className="container mx-auto px-4 flex flex-wrap justify-center gap-6 text-sm text-white/60">
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Gizlilik Politikası
                </Link>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Kullanım Şartları
                </Link>
                <a href="mailto:businessthemanifest@gmail.com" className="hover:text-white transition-colors">
                  İletişim
                </a>
              </div>
            </footer>
          </UserProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
