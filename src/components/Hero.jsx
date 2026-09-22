import { lazy, Suspense, useRef } from "react";
import { ArrowRight, Download, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { gsap, useGSAP, scrollTo } from "../lib/smooth";
import { Chars } from "../lib/text";
import { PROFILE, ROTATOR } from "../data";

const CubeField = lazy(() => import("./CubeField"));

const ICONS = { GitHub: <FaGithub size={16} />, LinkedIn: <FaLinkedin size={16} />, LeetCode: <SiLeetcode size={16} /> };

export default function Hero({ ready }) {
  const root = useRef(null);

  useGSAP(() => {
    if (!ready) return;
    gsap.timeline({ defaults: { ease: "power3.out" } })
      .from(".hero-badge", { y: 18, opacity: 0, duration: 0.7 })
      .from(".hero h1 .ch", { yPercent: 108, stagger: 0.022, duration: 0.9, ease: "power4.out" }, "-=0.45")
      .from(".hero-role, .hero-desc, .hero-cta, .hero-socials, .hero-meta", { y: 22, opacity: 0, stagger: 0.07, duration: 0.7 }, "-=0.5")
      .from(".hero-3d", { opacity: 0, scale: 0.94, duration: 1.4, ease: "power2.out" }, "-=1.1");

    const rot = gsap.timeline({ repeat: -1, delay: 1.2 });
    gsap.utils.toArray(".rot-word").forEach((w) => {
      rot.fromTo(w, { yPercent: 105, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.55, ease: "power3.out" })
         .to(w, { yPercent: -105, opacity: 0, duration: 0.45, ease: "power3.in" }, "+=2.1");
    });

    gsap.to(".hero-inner", { yPercent: 10, opacity: 0.25, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
  }, { dependencies: [ready], scope: root });

  return (
    <section ref={root} id="top" className="hero">
      <div className="glow" style={{ width: 560, height: 560, top: "-14%", right: "-6%", background: "rgba(124,106,247,0.16)" }} />
      <div className="wrap hero-inner">
        <div className="hero-grid">
          <div>
            <span className="hero-badge"><span className="pulse" /> Available for backend &amp; full-stack roles</span>
            <h1>
              <span className="mask"><Chars text="Kunal Kumar" /></span>
              <span className="mask dim"><Chars text="builds the backend." /></span>
            </h1>
            <p className="hero-role">
              <span>I build</span>
              <span className="rot">{ROTATOR.map((w) => <span key={w} className="rot-word">{w}</span>)}</span>
            </p>
            <p className="hero-desc">
              Spring Boot analytics APIs on MySQL and ClickHouse for a mobile attribution platform at {PROFILE.company} — query performance, API security and the integrations that have to work.
            </p>
            <div className="hero-cta">
              <a href="#work" className="btn btn-solid" onClick={(e) => { e.preventDefault(); scrollTo("#work"); }}>View my work <ArrowRight size={15} /></a>
              <a href={PROFILE.resume} download className="btn btn-line"><Download size={15} /> Download resume</a>
            </div>
            <div className="hero-socials">
              {PROFILE.socials.map((s) => (
                <a key={s.label} href={s.href} className="icon-btn" aria-label={s.label} target="_blank" rel="noopener noreferrer">{ICONS[s.label]}</a>
              ))}
              <a href={`mailto:${PROFILE.email}`} className="icon-btn" aria-label="Email"><Mail size={16} /></a>
            </div>
            <div className="hero-meta">
              <div><span className="label">Based in</span><span className="v">{PROFILE.location}</span></div>
              <div><span className="label">Focus</span><span className="v">Java · Spring Boot · ClickHouse</span></div>
              <div><span className="label">Education</span><span className="v">MCA, VIT · 2026</span></div>
            </div>
          </div>

          <div className="hero-3d"><Suspense fallback={null}><CubeField /></Suspense></div>
        </div>
      </div>
    </section>
  );
}
