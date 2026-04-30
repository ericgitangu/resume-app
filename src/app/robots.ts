import type { MetadataRoute } from "next";

// Next.js App Router conventional robots.txt generation.
// Generated at build time → served at /robots.txt.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // Be explicit-friendly with the major crawlers — some honour
      // user-agent-specific blocks even if "*" allows; this prevents
      // accidental drift later.
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
    ],
    sitemap: "https://resume.ericgitangu.com/sitemap.xml",
    host: "https://resume.ericgitangu.com",
  };
}
