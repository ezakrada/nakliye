import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { readDb } from "@/lib/db";

const SITE = {
  name: "Eşyam",
  tagline: "Eşyanız bizimle yolculuk eder.",
  domain: "nakliye.demolion.cloud",
};

const VALID_THEMES = ["lumen", "dark", "forest", "coral", "navy"] as const;

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description:
    "Sigortalı, kayıtlı ve profesyonel evden eve nakliyat. 41 ilde planlı sefer ağı, foto-envanter ile sabit fiyat, canlı takip, ekstra güvence.",
  metadataBase: new URL(`https://${SITE.domain}`),
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description:
      "Sigortalı, kayıtlı, profesyonel ekiple kapıdan kapıya. 14.000+ taşıma, %98 zamanında teslim.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport = {
  themeColor: "#fbfcfd",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  let theme: string = "lumen";
  try {
    const db = await readDb();
    const t = String(db.settings?.theme ?? "lumen");
    if ((VALID_THEMES as readonly string[]).includes(t)) theme = t;
  } catch {}

  return (
    <html
      lang="tr"
      data-theme={theme}
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
