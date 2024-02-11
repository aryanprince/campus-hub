import React from "react";
import { GeistSans } from "geist/font/sans";

import { ThemeProvider } from "~/components/theme-provider";

import "~/styles/globals.css";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata = {
  title: "Finance Portal",
  description: "Finance Portal Microservice, built by Aryan.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.className}`}>
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
