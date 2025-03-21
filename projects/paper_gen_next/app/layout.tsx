import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import Providers from "@/app/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PaperGen.ai",
  description: "PaperGen.ai interview task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactElement;
}>) {
  return (
    // <ClerkProvider>
    <html lang="en" data-theme={"light"}>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
    // </ClerkProvider>
  );
}
