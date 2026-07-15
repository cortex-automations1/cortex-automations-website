import type { Metadata } from "next";

const BASE_URL = "https://cortexautomations.ai";

export function createMetadata({
  title,
  description,
  path = "",
  ogImage,
  ogImageSize,
}: {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  ogImageSize?: { width: number; height: number };
}): Metadata {
  // Bare title — the root layout's title template ("%s | Cortex Automations")
  // applies the brand suffix once. Returning the suffixed string here caused
  // every sub-page to render as "X | Cortex Automations | Cortex Automations".
  const url = `${BASE_URL}${path}`;
  const image = ogImage || `${BASE_URL}/og`;
  const brandedTitle = `${title} | Cortex Automations`;

  // Only declare dimensions we actually know. The default /og route renders
  // 1200x630; caller-supplied images (portfolio screenshots) vary, and wrong
  // declared dimensions make scrapers mis-crop link previews.
  const imageSize = ogImage ? ogImageSize : { width: 1200, height: 630 };

  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: { canonical: url },
    openGraph: {
      title: brandedTitle,
      description,
      url,
      siteName: "Cortex Automations",
      locale: "en_US",
      images: [{ url: image, alt: brandedTitle, ...imageSize }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: brandedTitle,
      description,
      images: [image],
    },
  };
}
