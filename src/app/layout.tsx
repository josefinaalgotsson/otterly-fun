import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Utterns simskola",
    template: "%s | Utterns simskola",
  },
  description:
    "En liten och personlig simskola i Kolmården. Simundervisning för barn i små grupper med trygghet och glädje.",
  openGraph: {
    title: "Utterns simskola",
    description:
      "En liten och personlig simskola i Kolmården — simundervisning i små grupper.",
    type: "website",
    locale: "sv_SE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
