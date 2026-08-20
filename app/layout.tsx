import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Teo | Front-End Developer",
  description: "Teodor Hristov's front-end development portfolio.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>{children}</body>
    </html>
  );
}
