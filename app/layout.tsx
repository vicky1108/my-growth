import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";


const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://mygrowth.app"),
  title: {
    default: "My Growth - Track Your Child's Achievements",
    template: "%s | My Growth",
  },
  description: "Track and celebrate your child's milestones, accomplishments, and special moments. A dedicated platform for parents to document their children's growth journey.",
  keywords: ["child achievements", "milestones", "parenting", "growth tracking", "kids accomplishments", "child development", "parenting app"],
  authors: [{ name: "My Growth Team" }],
  creator: "My Growth Team",
  publisher: "My Growth",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mygrowth.app",
    siteName: "My Growth",
    title: "My Growth - Track Your Child's Achievements",
    description: "Track and celebrate your child's milestones and accomplishments",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "My Growth - Track Your Child's Achievements",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Growth - Track Your Child's Achievements",
    description: "Track and celebrate your child's milestones and accomplishments",
    images: ["/og-image.jpg"],
    creator: "@mygrowth",
  },
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
  verification: {
  },
};

const organizationData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "My Growth",
  url: "https://mygrowth.app",
  description: "Track and celebrate your child's milestones, accomplishments, and special moments.",
};

const websiteData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "My Growth",
  url: "https://mygrowth.app",
  description: "Track and celebrate your child's milestones, accomplishments, and special moments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
        />
        <Header />
        <main style={{ minHeight: "calc(100vh - 80px - 100px)" }}>
          {children}
        </main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
