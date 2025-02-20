import type { Metadata } from "next";
import "./globals.css";
import TopLoader from "@/components/TopLoader";
import { Toaster } from "@/components/ui/sonner";
import localFont from "next/font/local";

const roboto = localFont({
  src: [
    {
      path: "./../public/fonts/Roboto-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./../public/fonts/Roboto-Medium.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "./../public/fonts/Roboto-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Home | Ife Alumni",
  description: "Great Ife Alumni Association Inc. USA - Atlanta Branch",
  // viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} ${roboto.variable}`}>
        <TopLoader />
        <main>{children}</main>
        <Toaster position="top-right" richColors expand={true} />
      </body>
    </html>
  );
}
