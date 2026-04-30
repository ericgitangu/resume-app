import type { MetadataRoute } from "next";

// Single-page resume site — index page is the canonical entry. The download
// endpoints are intentionally excluded (returning binaries, not HTML for
// crawlers to index). Updated lastModified on every build.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = "https://resume.ericgitangu.com";
  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
