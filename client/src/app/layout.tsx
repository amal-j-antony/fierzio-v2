import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Fierzio.gg — The Definitive Arena for Competitive Esports",
  description:
    "Discover and dominate tournaments across Valorant, CS2, Apex Legends, and Rocket League. Or launch professional multi-tier championship brackets with automated check-ins, reusable templates, and multi-staff access control in under 3 minutes.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${geist.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-on-surface">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
