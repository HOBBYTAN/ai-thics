import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import AnimationProvider from "@/components/animation-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI-thics | Responsible AI Certification & Trust Scoring Platform",
  description: "AI-thics evaluates and certifies generative AI systems for ethics, security, and explainability. Build trustworthy AI services with measurable scores and transparent assessments.",
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: "AI-thics | The First Benchmark for Ethical AI",
    description: "Convert ethical AI into measurable trust. AI-thics helps you assess and certify generative AI models with clarity.",
    images: [
      {
        url: "/images/og-image/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI-thics - Responsible AI Certification",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-thics | The First Benchmark for Ethical AI",
    description: "Convert ethical AI into measurable trust. AI-thics helps you assess and certify generative AI models with clarity.",
    images: ["/images/og-image/og-image.png"],
  },
  alternates: {
    languages: {
      'en-US': '/',
      'ko-KR': '/ko',
    }
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta property="og:image" content="https://aithics.net/images/og-image/og-image.png" />
        <meta name="twitter:image" content="https://aithics.net/images/og-image/og-image.png" />
      </head>
      <body className={inter.className}>
        <AnimationProvider>
          <Header />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
        </AnimationProvider>
      </body>
    </html>
  );
}
