import type { Metadata } from "next";
import { UserProvider } from "@/lib/UserContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Manifestia | Kozmik Yolculuk",
  description: "Yapay zeka destekli spiritüel rehberiniz.",
  manifest: "/manifest.json",
  themeColor: "#0F0F12",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0", // Mobilde zoom'u engelle (Native hissi için)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      <body className="antialiased bg-manifest-background text-manifest-text">
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
