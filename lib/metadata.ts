import type { Metadata } from "next";

const BASE_URL = "https://cortexautomations.ai";

export function createMetadata({
  title,
  description,
  path = "",
  ogImage,
}: {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
}): Metadata {
  const fullTitle =
    title === "Cortex Automations"
      ? title
      : `${title} | Cortex Automations`;
  const url = `${BASE_URL}${path}`;
  const image = ogImage || `${BASE_URL}/images/og-image.jpg`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "Cortex Automations",
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
