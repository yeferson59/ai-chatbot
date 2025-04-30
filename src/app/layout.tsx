import type React from "react";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { dark } from "@clerk/themes";
import { esES } from "@clerk/localizations";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chat con IA",
  description: "Chat con inteligencia artificial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#2563eb",
          colorBackground: "#1e1b4b",
          colorText: "#ffffff",
          colorTextOnPrimaryBackground: "#ffffff",
          colorTextSecondary: "#a5b4fc",
          colorInputBackground: "#312e81",
          colorInputText: "#ffffff",
          borderRadius: "0.625rem",
        },
      }}
      localization={esES}
    >
      <html lang="es" className="dark">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        >
          <Header />
          <main className="pt-16">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
