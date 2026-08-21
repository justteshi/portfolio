import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Teo | Front-End Developer",
  description: "Teodor Hristov's front-end development portfolio.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Teo | Front-End Developer",
    description: "Teodor Hristov's front-end development portfolio.",
    images: [{ url: "/personal_logo.png", width: 1536, height: 1024, alt: "Teodor Hristov personal logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Teo | Front-End Developer",
    description: "Teodor Hristov's front-end development portfolio.",
    images: ["/personal_logo.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>{children}</body>
    </html>
  );
}
