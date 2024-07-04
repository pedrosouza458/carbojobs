import { Header } from "@/components/header";
import "./globals.css";

import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import Analitycs from "@/components/analytics";

export const metadata: Metadata = {
  title: "Create Next App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Analitycs />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <main className="py-4">
            <Header />
          </main>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
