import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Cortex Automations | Engineering Scalable Digital Infrastructure",
    template: "%s | Cortex Automations",
  },
  description:
    "Full-stack development agency specializing in SaaS platforms, mobile apps, web design, and AI automation. We build software that scales.",
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
    "Full-stack development agency specializing in SaaS platforms, mobile apps, web design, and AI automation.",
  email: "hello@cortexautomations.ai",
  address: {
    "@type": "PostalAddress",
    addressRegion: "FL",
    addressCountry: "US",
  },
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
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-surface-0 font-sans text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
