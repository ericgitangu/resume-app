import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://resume.ericgitangu.com"),
  title: "Eric Gitangu | Software Engineer Architect",
  description:
    "Full-stack Software Engineer Architect with 10+ years of backend-focused expertise. Expert in Python, Node.js, Java, PostgreSQL, MongoDB, Redis, Kafka, AWS, Kubernetes. Specializing in microservices, event-driven architectures, billing systems, and Web3/blockchain. Based in Nairobi, Kenya.",
  keywords: [
    "Eric Gitangu",
    "Software Engineer Architect",
    "Full Stack Developer",
    "Backend Engineer",
    "Python Developer",
    "Node.js Developer",
    "Java Developer",
    "React Developer",
    "TypeScript",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Kafka",
    "AWS",
    "Kubernetes",
    "Docker",
    "Microservices",
    "Event-Driven Architecture",
    "System Design",
    "API Design",
    "Web3",
    "Blockchain",
    "Solidity",
    "Smart Contracts",
    "Billing Systems",
    "Payment Integration",
    "Fintech",
    "Telecom",
    "Nairobi",
    "Kenya",
    "Africa",
  ],
  authors: [{ name: "Eric Gitangu", url: "https://developer.ericgitangu.com" }],
  creator: "Eric Gitangu",
  publisher: "Eric Gitangu",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://resume.ericgitangu.com",
    siteName: "Eric Gitangu - Software Engineer Architect",
    title: "Eric Gitangu | Software Engineer Architect",
    description:
      "Full-stack Software Engineer Architect with 10+ years of backend-focused expertise in Python, Node.js, Java, cloud-native architectures, and Web3. Based in Nairobi, Kenya.",
    images: [
      {
        url: "/favicon.png",
        width: 256,
        height: 256,
        alt: "Eric Gitangu - Software Engineer Architect",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Eric Gitangu | Software Engineer Architect",
    description:
      "Full-stack Software Engineer Architect with 10+ years of backend-focused expertise. Based in Nairobi, Kenya.",
    images: ["/favicon.png"],
    creator: "@ericgitangu",
  },
  alternates: {
    canonical: "https://resume.ericgitangu.com",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#6366f1" />
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
