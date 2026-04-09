import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/ui/theme-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Cortex Automations | Custom Software Development",
    template: "%s | Cortex Automations",
  },
  description:
    "We build custom software for businesses — SaaS platforms, websites, mobile apps, and AI automations. Based in the US, working everywhere.",
  metadataBase: new URL("https://cortexautomations.ai"),
  openGraph: {
    type: "website",
    siteName: "Cortex Automations",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.jpg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Cortex Automations",
  url: "https://cortexautomations.ai",
  logo: "https://cortexautomations.ai/images/logo-icon.png",
  description:
    "We build custom software for businesses — SaaS platforms, websites, mobile apps, and AI automations.",
  email: "hello@cortexautomations.ai",
  sameAs: [
    "https://github.com/cortex-automations1",
    "https://linkedin.com/company/cortex-automations",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-surface-0 font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
