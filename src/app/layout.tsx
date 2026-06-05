import type { Metadata } from "next";
import { Space_Grotesk, Fraunces } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pooks — A Historic Bed & Breakfast",
  description:
    "Where history rests. A historic inn blending luxury modern amenities with timeless charm — spa, wine tasting, and pet-friendly accommodations.",
  keywords: [
    "bed and breakfast",
    "historic inn",
    "luxury spa",
    "wine tasting",
    "pet friendly",
    "historic hotel",
    "luxury retreat",
  ],
  authors: [{ name: "Pooks Bed & Breakfast" }],
  openGraph: {
    type: "website",
    title: "Pooks — A Historic Bed & Breakfast",
    description:
      "Where history rests. A historic inn blending luxury modern amenities with timeless charm.",
    siteName: "Pooks",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pooks — A Historic Bed & Breakfast",
    description:
      "Where history rests. A historic inn blending luxury modern amenities with timeless charm.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${fraunces.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <SmoothScroll>
          <ScrollProgress />
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
