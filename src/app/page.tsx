"use client";

import dynamic from "next/dynamic";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Gallery } from "@/components/Gallery";
import { Marquee } from "@/components/Marquee";
import { Story } from "@/components/Story";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Preloader = dynamic(
  () => import("@/components/Preloader").then((m) => m.Preloader),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <Preloader />
      <Nav />
      <main className="flex flex-col">
        <Hero />
        <Marquee />
        <Features />
        <Gallery />
        <Story />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
