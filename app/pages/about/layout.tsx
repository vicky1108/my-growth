import type { Metadata } from "next";


export const revalidate = 3600; 


export const dynamic = "force-static";


export const fetchCache = "force-cache";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Kids Achievements - our mission to help parents celebrate and document their children's milestones, accomplishments, and special moments.",
  keywords: ["about", "mission", "kids achievements", "parenting platform", "child development", "milestone tracking"],
  authors: [{ name: "My Growth Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mygrowth.app/pages/about",
    siteName: "My Growth",
    title: "About Us | My Growth",
    description: "Learn about Kids Achievements - our mission to help parents celebrate and document their children's milestones.",
    images: [
      {
        url: "/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "About My Growth",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | My Growth",
    description: "Learn about Kids Achievements - our mission to help parents celebrate and document their children's milestones.",
    images: ["/og-about.jpg"],
  },
  alternates: {
    canonical: "/pages/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

