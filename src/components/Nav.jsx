import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, lenis, scrollTo } from "../lib/smooth";
import { Chars } from "../lib/text";
import { PROFILE } from "../data";

const LINKS = [
  { label: "About", to: "#about" },
  { label: "Experience", to: "#experience" },
  { label: "API", to: "#api" },
  { label: "Work", to: "#work" },
  { label: "Skills", to: "#skills" },
  { label: "Contact", to: "#contact" },
];

const fmtTime = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });

export default function Nav() {
  const [open, setOpen] = useState(false);
  const menu = useRef(null);
  const clock = useRef(null);
  const tl = useRef(null);

  useEffect(() => {
    const tick = () => { clock.current.textContent = `BLR ${fmtTime.format(new Date())}`; };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useGSAP(() => {
    tl.current = gsap.timeline({ paused: true })
      .to(menu.current, { clipPath: "inset(0 0 0% 0)", duration: 0.9, ease: "expo.inOut" })
      .from(".menu-links .ch", { yPercent: 110, stagger: 0.012, duration: 0.8, ease: "power4.out" }, "-=0.45")
      .from(".menu-links small, .menu-foot", { opacity: 0, y: 12, duration: 0.5, stagger: 0.05 }, "-=0.5");
  }, { scope: menu });

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next) { lenis.stop(); tl.current.timeScale(1).play(); } else { lenis.start(); tl.current.timeScale(1.6).reverse(); }
  };

  const go = (e, to) => {
    e.preventDefault();
    if (open) toggle();
    setTimeout(() => scrollTo(to), open ? 500 : 0);
  };

  return (
    <>
      <nav className="nav">
        <a href="#top" className="nav-logo" onClick={(e) => go(e, 0)}>KK<i>.</i></a>
        <span ref={clock} className="nav-time" />
        <button className={`nav-btn ${open ? "open" : ""}`} onClick={toggle} aria-expanded={open} aria-label="Menu">
          <span>{open ? "Close" : "Menu"}</span>
          <span className="bar"><i /><i /></span>
        </button>
      </nav>

      <div ref={menu} className="menu" aria-hidden={!open}>
        <div className="menu-links">
          {LINKS.map((l, i) => (
            <a key={l.label} href={l.to} onClick={(e) => go(e, l.to)}>
              <small>0{i + 1}</small>
              <span className="mask"><Chars text={l.label} /></span>
            </a>
          ))}
        </div>
        <div className="menu-foot">
          <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
          <div className="socials">
            {PROFILE.socials.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>)}
          </div>
        </div>
      </div>
    </>
  );
}
