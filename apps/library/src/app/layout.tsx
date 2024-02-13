import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import React from "react";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata = {
  title: "Library Portal",
  description: "Library Portal Microservice, built by Aryan.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className}`}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
