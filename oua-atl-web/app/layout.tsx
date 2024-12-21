import type { Metadata } from "next";
import { roboto } from "@/app/ui/fonts";
import "./globals.css";
import TopLoader from "@/components/TopLoader";
import { Toaster } from "@/components/ui/sonner"


export const metadata: Metadata = {
  title: "Home | Ife Alumni",
  description: "Great Ife Alumni Association Inc. USA - Atlanta Branch",
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
        <>
          {children}
        </>
        <Toaster  position="top-right" richColors expand={true} />
      </body>
    </html>
  );
}
