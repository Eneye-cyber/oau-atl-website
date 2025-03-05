import type { Metadata } from "next";
import "./globals.css";
import TopLoader from "@/components/TopLoader";
import { Toaster } from "@/components/ui/sonner";
import localFont from "next/font/local";
import { AuthProvider } from "@/lib/contexts/AuthProvider";

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
  title: "ATL OAU | Official Alumni Website",
  description: "Great Ife Alumni Association Inc. USA - Atlanta Branch Official Website.",
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
        <AuthProvider>
          <main>{children}</main>
        </AuthProvider>
        <Toaster position="top-right" richColors expand={true} />
      </body>
    </html>
  );
}
