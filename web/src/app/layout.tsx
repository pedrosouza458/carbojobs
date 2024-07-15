import { Header } from "@/components/header";
import "./globals.css";

import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import GoogleAnalitycs from "@/components/analytics";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Banner } from "@/components/cookies-consent-banner";
export const metadata: Metadata = {
  title: "CarboJobs",
  description: "Plataforma para prestadores de serviços da região carbonífera do RS",
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://carbojobs.com',
    siteName: 'CarboJobs',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
    
        <SpeedInsights />
        <VercelAnalytics />
        <GoogleAnalitycs />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <main className="py-4">
            <Header />
          </main>
          <Banner/>
          {children}
     
        </ThemeProvider>
      </body>
    </html>
  );
}
