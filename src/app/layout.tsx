import { createMetadata } from "@/lib/metadata";
import { Inter, Orbitron, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { jsonLd } from "@/lib/metadata";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});


export const metadata = createMetadata({
  siteUrl: "https://s3nk.example.com",
  title: "S3NK Quadruped Inspection & Rescue Assist",
  description: "Deploy Anywhere. Navigate Everything. Save Lives.",
  appName: "S3NK",
  category: "Technology",
  keywords: ["robot", "quadruped", "rescue", "inspection", "S3NK", "3d"],
  twitterHandle: "@s3nkrobot",
});

<Script
  id="json-ld"
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd({
    siteUrl: "https://s3nk.example.com",
    title: "S3NK Quadruped Rescue Robot",
    description: "Deploy Anywhere. Navigate Everything. Save Lives.",
  })) }}
/>

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${orbitron.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
