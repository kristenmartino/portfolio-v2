import type { Metadata } from "next";
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/content/site";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: site.metadata.title,
  description: site.metadata.description,
  metadataBase: new URL(`https://${site.domain}`),
  openGraph: {
    title: site.metadata.title,
    description: site.metadata.description,
    url: `https://${site.domain}`,
    siteName: "Kristen Martino",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.metadata.title,
    description: site.metadata.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`h-full antialiased ${plexSans.variable} ${plexMono.variable} ${archivo.variable}`}
    >
      <body className="relative min-h-full flex flex-col font-sans bg-[var(--color-soot)] text-[var(--color-bone)]">
        <SmoothScroll />
        <a
          href="#main"
          data-no-smooth
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--color-signal-blue)] focus:text-[var(--color-bone)] focus:text-sm"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
