import { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { profile } from "@/lib/content";

// Below-the-fold sections are code-split into their own chunks.
const Projects = lazy(() => import("@/components/Projects").then((m) => ({ default: m.Projects })));
const Services = lazy(() => import("@/components/Services").then((m) => ({ default: m.Services })));
const About = lazy(() => import("@/components/About").then((m) => ({ default: m.About })));
const Experience = lazy(() => import("@/components/Experience").then((m) => ({ default: m.Experience })));
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
      <Nav />
      <main id="main">
        <Hero />
        <Suspense fallback={<div className="min-h-screen" />}>
          <Projects />
          <Services />
          <About />
          <Experience />
          <Insights />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
