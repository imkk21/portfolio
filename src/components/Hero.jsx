import { lazy, Suspense, useRef } from "react";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { gsap, useGSAP, scrollTo } from "../lib/smooth";
import { Chars } from "../lib/text";
import { PROFILE, ROTATOR } from "../data";
const CubeField = lazy(() => import("./CubeField"));
import Magnetic from "./Magnetic";

export default function Hero({ ready }) {
  const root = useRef(null);

  useGSAP(() => {
    if (!ready) return;
    gsap.timeline()
      .from(".hero-title .ch", { yPercent: 120, rotate: 3, stagger: 0.04, duration: 1.2, ease: "power4.out" })
      .from(".hero-eyebrow, .hero-sub > *, .hero-bottom > *", { y: 30, opacity: 0, stagger: 0.08, duration: 0.9, ease: "power3.out" }, "-=0.7")
      .from(".hero-3d", { opacity: 0, x: 60, duration: 1.6, ease: "power2.out" }, "-=1.2");

    const rot = gsap.timeline({ repeat: -1, delay: 1.4 });
    gsap.utils.toArray(".rot-word").forEach((w) => {
      rot.fromTo(w, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: "power3.out" })
         .to(w, { yPercent: -100, opacity: 0, duration: 0.5, ease: "power3.in" }, "+=2");
    });

    gsap.to(".hero-content", { yPercent: 18, opacity: 0.2, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
    gsap.to(".hero-3d", { yPercent: -10, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
  }, { dependencies: [ready], scope: root });

  return (
    <section ref={root} id="top" className="hero">
      <div className="hero-3d"><Suspense fallback={null}><CubeField /></Suspense></div>

      <div className="hero-content">
        <div className="hero-eyebrow">
          <span className="pulse" />
          <span className="label" style={{ color: "var(--fg)" }}>{PROFILE.role} @ {PROFILE.company} — Open to opportunities</span>
        </div>

        <h1 className="hero-title">
          <span className="mask"><Chars text={PROFILE.first} /></span>
          <span className="mask"><Chars text={PROFILE.last} /></span>
        </h1>

        <div className="hero-sub">
          <div>
            <p className="hero-line">
              <span>I build</span>
              <span className="rot">{ROTATOR.map((w) => <span key={w} className="rot-word">{w}</span>)}</span>
            </p>
            <p className="hero-desc">Spring Boot analytics APIs on MySQL and ClickHouse for a mobile attribution platform. Query performance, API security, third-party integrations — the parts that have to work.</p>
            <div className="hero-cta">
              <Magnetic><a href="#work" className="btn btn-solid" onClick={(e) => { e.preventDefault(); scrollTo("#work"); }}>Selected work <ArrowUpRight size={16} /></a></Magnetic>
              <Magnetic><a href={PROFILE.resume} download className="btn btn-line"><Download size={16} /> Resume</a></Magnetic>
            </div>
          </div>
          <div className="hero-side">
            <span className="stack">Java · Spring Boot · MySQL · ClickHouse · AWS</span>
            <span className="label">{PROFILE.location}</span>
            <div className="socials">
              {PROFILE.socials.map((s) => <a key={s.label} href={s.href} className="link-u" target="_blank" rel="noopener noreferrer">{s.label}</a>)}
            </div>
          </div>
        </div>

        <div className="hero-bottom">
          <span className="scroll-hint label"><ArrowDown size={14} /> Scroll</span>
          <span className="label">MCA · VIT · 2026</span>
        </div>
      </div>
    </section>
  );
}
