import { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { PointerLight } from "@/components/PointerLight";
import { profile } from "@/lib/content";

// Below-the-fold sections are code-split into their own chunks.
const Stack = lazy(() => import("@/components/Stack").then((m) => ({ default: m.Stack })));
const SystemDiagram = lazy(() => import("@/components/SystemDiagram").then((m) => ({ default: m.SystemDiagram })));
const Projects = lazy(() => import("@/components/Projects").then((m) => ({ default: m.Projects })));
const Experience = lazy(() => import("@/components/Experience").then((m) => ({ default: m.Experience })));
const Journey = lazy(() => import("@/components/Journey").then((m) => ({ default: m.Journey })));
const Philosophy = lazy(() => import("@/components/Philosophy").then((m) => ({ default: m.Philosophy })));
const Insights = lazy(() => import("@/components/Insights").then((m) => ({ default: m.Insights })));
const Contact = lazy(() => import("@/components/Contact").then((m) => ({ default: m.Contact })));

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    document.title = `${profile.name}, Fullstack Developer`;
  }, []);

  // Support links like /#insights coming back from an article page.
  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView(), 120);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <>
      <PointerLight />
      <Nav />
      <main id="main" className="relative z-10">
        <Hero />
        <About />
        <Suspense fallback={<div className="min-h-screen" />}>
          <Stack />
          <SystemDiagram />
          <Projects />
          <Experience />
          <Journey />
          <Philosophy />
          <Insights />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
