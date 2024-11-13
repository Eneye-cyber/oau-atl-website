import type { Metadata } from "next";
import { roboto } from "@/app/ui/fonts";
import "./globals.css";


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
      <body className={`${roboto.variable} font-roboto`}>
        {children}
      </body>
    </html>
  );
}
