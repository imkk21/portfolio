import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, lenis, scrollTo } from "../lib/smooth";
import { PROFILE } from "../data";

const LINKS = [
  { label: "About", to: "#about" },
  { label: "Experience", to: "#experience" },
  { label: "Work", to: "#work" },
  { label: "Skills", to: "#skills" },
  { label: "Education", to: "#education" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menu = useRef(null);
  const tl = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(() => {
    tl.current = gsap.timeline({ paused: true })
      .to(menu.current, { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "power4.inOut" })
      .from(".m-link", { y: 26, opacity: 0, stagger: 0.05, duration: 0.5, ease: "power3.out" }, "-=0.35")
      .from(".menu-foot", { opacity: 0, duration: 0.4 }, "-=0.3");
  }, { scope: menu });

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next) { lenis.stop(); tl.current.timeScale(1).play(); }
    else { lenis.start(); tl.current.timeScale(1.7).reverse(); }
  };

  const go = (e, to) => {
    e.preventDefault();
    if (open) toggle();
    setTimeout(() => scrollTo(to), open ? 420 : 0);
  };

  return (
    <>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-in">
          <a href="#top" className="nav-logo" onClick={(e) => go(e, 0)}>
            <span className="mark">KK</span> {PROFILE.name}
          </a>
          <div className="nav-links">
            {LINKS.map((l) => <a key={l.label} href={l.to} onClick={(e) => go(e, l.to)}>{l.label}</a>)}
          </div>
          <div className="nav-right">
            <a href="#contact" className="nav-cta" onClick={(e) => go(e, "#contact")}>Get in touch</a>
            <button className={`nav-burger ${open ? "open" : ""}`} onClick={toggle} aria-label="Menu" aria-expanded={open}><i /><i /></button>
          </div>
        </div>
      </nav>

      <div ref={menu} className="menu" aria-hidden={!open}>
        {[...LINKS, { label: "Contact", to: "#contact" }].map((l, i) => (
          <a key={l.label} href={l.to} className="m-link" onClick={(e) => go(e, l.to)}>
            <span className="n">{String(i + 1).padStart(2, "0")}</span>{l.label}
          </a>
        ))}
        <div className="menu-foot">
          <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
          {PROFILE.socials.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>)}
        </div>
      </div>
    </>
  );
}
