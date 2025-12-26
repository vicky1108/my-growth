import type { Metadata } from "next";


export const dynamic = "force-static";


export const revalidate = 86400; 


export const fetchCache = "force-cache";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a new My Growth account to start tracking your child's achievements, milestones, and special moments.",
  keywords: ["signup", "register", "create account", "child tracking", "parenting app"],
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
    url: "https://mygrowth.app/pages/signup",
    siteName: "My Growth",
    title: "Create Account | My Growth",
    description: "Create a new My Growth account to start tracking your child's achievements and milestones.",
  },
  twitter: {
    card: "summary",
    title: "Create Account | My Growth",
    description: "Create a new My Growth account to start tracking your child's achievements and milestones.",
  },
  alternates: {
    canonical: "/pages/signup",
  },
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

