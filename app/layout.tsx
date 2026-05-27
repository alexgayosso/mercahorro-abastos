// ============================================================
// app/layout.tsx — Root Layout
// ============================================================
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import EcosystemHeader from "@/components/EcosystemHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mercahorro Abastos | Infraestructura Comercial del Norte de México",
  description:
    "Mercahorro es la plataforma de infraestructura de abasto moderno líder en el norte de México. 300+ comerciantes, 5 mercados, más de 52,000 m² desarrollados.",
  keywords: [
    "mercado de abastos",
    "Torreón",
    "Gómez Palacio",
    "Monterrey",
    "locales comerciales",
    "mayoreo",
    "infraestructura comercial",
  ],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Mercahorro Abastos",
    description: "La nueva era del abasto. Precios directos. Infraestructura de primer mundo.",
    type: "website",
    locale: "es_MX",
    siteName: "Mercahorro Abastos",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <EcosystemHeader />
        {children}
      </body>
    </html>
  );
}
