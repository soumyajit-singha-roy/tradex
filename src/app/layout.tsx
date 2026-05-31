import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TradeX",
  description: "AFSL TradeX is a premium institutional trading platform and client dashboard for proprietary trading. Access real-time P&L analytics, trading accounts, ledger management, and comprehensive reports.",
  keywords: "AFSL, TradeX, trading, dashboard, proprietary trading, analytics, fintech",
  authors: [{ name: "AFSL" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased font-[family-name:var(--font-inter)]">
        {children}
      </body>
    </html>
  );
}
