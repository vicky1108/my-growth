import type { Metadata } from "next";


export const dynamic = "force-dynamic";


export const fetchCache = "force-no-store";


export const revalidate = 0;



export async function generateMetadata(): Promise<Metadata> {
  const baseMetadata: Metadata = {
    title: "Achievements",
    description: "View and manage your child's achievements, milestones, and special moments. Track their growth journey with interactive charts and detailed records.",
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://mygrowth.app/pages/achievements",
      siteName: "My Growth",
      title: "Achievements | My Growth",
      description: "View and manage your child's achievements, milestones, and special moments.",
    },
    twitter: {
      card: "summary",
      title: "Achievements | My Growth",
      description: "View and manage your child's achievements, milestones, and special moments.",
    },
    alternates: {
      canonical: "/pages/achievements",
    },
  };

  return baseMetadata;
}

export default function AchievementsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

