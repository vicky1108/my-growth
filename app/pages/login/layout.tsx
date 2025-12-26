import type { Metadata } from "next";


export const dynamic = "force-static";


export const revalidate = 86400; 


export const fetchCache = "force-cache";

export const metadata: Metadata = {
  title: "Parent Login",
  description: "Login to your My Growth account to track and manage your child's achievements and milestones.",
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
    url: "https://mygrowth.app/pages/login",
    siteName: "My Growth",
    title: "Parent Login | My Growth",
    description: "Login to your My Growth account to track and manage your child's achievements.",
  },
  twitter: {
    card: "summary",
    title: "Parent Login | My Growth",
    description: "Login to your My Growth account to track and manage your child's achievements.",
  },
  alternates: {
    canonical: "/pages/login",
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

