import type { Metadata } from "next";
import MaterialRegistry from "../components/MaterialRegistry";
import "./globals.css";

export const metadata: Metadata = {
  title: "M3 Roasters | Modern Cafe",
  description: "Experience premium artisan coffee with modern aesthetics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Flex:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined" rel="stylesheet" />
      </head>
      <body>
        <MaterialRegistry />
        {children}
      </body>
    </html>
  );
}
