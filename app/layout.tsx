import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { Header } from "@/components/Header";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import "./globals.css";

const jetbrains = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vitor Britto",
  description: "Um blog sobre tecnologia e carreira. 🚀",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${jetbrains.className} bg-zinc-950 text-zinc-100 pt-12`}
      >
        <Header />
        {children}
        <About />
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
