import type { Metadata } from "next";
import HomeClient from "./HomeClient";


export const revalidate = 300; 


export const dynamic = "force-static";


export const fetchCache = "force-cache";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to My Growth - Track and celebrate your child's milestones, accomplishments, and special moments. Start documenting your child's growth journey today.",
  keywords: ["child achievements", "milestones", "parenting", "growth tracking", "kids accomplishments", "child development"],
  authors: [{ name: "My Growth Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mygrowth.app",
    siteName: "My Growth",
    title: "Home | My Growth",
    description: "Welcome to My Growth - Track and celebrate your child's milestones and accomplishments.",
    images: [
      {
        url: "/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "My Growth - Track Your Child's Achievements",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Home | My Growth",
    description: "Welcome to My Growth - Track and celebrate your child's milestones and accomplishments.",
    images: ["/og-home.jpg"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <HomeClient />;
}
