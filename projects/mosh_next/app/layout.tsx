import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "@/app/NavBar";

import React, { Suspense } from "react";
import Loading from "@/app/loading";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme={"winter"}>
      <body className={inter.className}>
        <NavBar />
        <Suspense fallback={<Loading />}>
          <main className={"p-5"}>{children}</main>
        </Suspense>
      </body>
    </html>
  );
}
