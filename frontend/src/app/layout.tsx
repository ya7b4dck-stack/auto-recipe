import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | AutoRecipe',
    default: 'AutoRecipe - 非エンジニアのためのAI開発レシピ',
  },
  description: 'プログラミング不要。CursorやClaude CodeなどのAIエージェントを使って、非エンジニアでも業務ツールをサクッと作れるコピペ専用レシピ集。',
  openGraph: {
    title: 'AutoRecipe - 非エンジニアのためのAI開発レシピ',
    description: 'プログラミング不要。AIエージェントを使って業務ツールをサクッと作れるコピペ専用レシピ集。',
    url: 'https://auto-recipe.example.com',
    siteName: 'AutoRecipe',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AutoRecipe - 非エンジニアのためのAI開発レシピ',
    description: 'プログラミング不要。AIエージェントを使って業務ツールをサクッと作れるコピペ専用レシピ集。',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
