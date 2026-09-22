import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, lenis } from "./lib/smooth";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [ready, setReady] = useState(false);
  const main = useRef(null);

  useGSAP(() => {
    if (!ready) { lenis.stop(); return; }
    lenis.start();
    // Generic scroll reveal for anything tagged data-reveal.
    gsap.utils.toArray("[data-reveal]").forEach((el) => {
      gsap.from(el, { y: 50, opacity: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } });
    });
    gsap.to(".progress", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }, { dependencies: [ready] });

  return (
    <>
      {!ready && <Preloader onDone={() => setReady(true)} />}
      <div className="progress" aria-hidden="true" />
      <Cursor />
      <Nav />
      <main ref={main}>
        <Hero ready={ready} />
        <Marquee />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
