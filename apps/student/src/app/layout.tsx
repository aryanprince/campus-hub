import { ThemeProvider } from "~/components/theme-provider";
import { TRPCReactProvider } from "~/trpc/react";

import "~/styles/globals.css";

import React from "react";
import { GeistSans } from "geist/font/sans";

import { Toaster } from "@campus-hub/ui/components/ui/sonner";

export const metadata = {
  title: "Student Portal",
  description: "Student Portal Microservice, built by Aryan.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className}`}>
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster richColors />
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
