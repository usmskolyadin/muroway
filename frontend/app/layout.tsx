import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";

export const metadata: Metadata = {
  title: "Muroway",
};

const montserrat = Montserrat({ 
  subsets: ["latin", "cyrillic"],
  variable: '--font-montserrat',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable}`}>
      <body
        className={``}
      >
        {children}
      </body>
    </html>
  );
}
