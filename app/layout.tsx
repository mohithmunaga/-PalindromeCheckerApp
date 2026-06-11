import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AutoLogout } from "@/components/auth/auto-logout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pulses Wholesale System",
  description: "Management system for Pulses Wholesale Business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
        <AutoLogout />
      </body>
    </html>
  );
}
