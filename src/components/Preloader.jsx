import { useRef } from "react";
import { gsap, useGSAP } from "../lib/smooth";
import { Chars } from "../lib/text";
import { PROFILE } from "../data";

export default function Preloader({ onDone }) {
  const root = useRef(null);

  useGSAP(() => {
    const counter = { v: 0 };
    const num = root.current.querySelector(".pre-count");
    gsap.timeline({ onComplete: onDone })
      .from(".pre-name .ch", { yPercent: 110, stagger: 0.03, duration: 0.8, ease: "power4.out" })
      .from(".pre-tag", { opacity: 0, y: 8, duration: 0.5 }, "-=0.4")
      .to(".pre-track i", { scaleX: 1, duration: 1.4, ease: "power2.inOut" }, 0.2)
      .to(counter, { v: 100, duration: 1.4, ease: "power2.inOut", onUpdate: () => { num.textContent = `${Math.round(counter.v)}%`; } }, 0.2)
      .to(".pre-inner", { opacity: 0, y: -16, duration: 0.45, ease: "power2.in" }, "+=0.2")
      .to(root.current, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "-=0.2");
  }, { scope: root });

  return (
    <div ref={root} className="pre">
      <div className="pre-inner">
        <div className="pre-name"><Chars text={PROFILE.name} /></div>
        <div className="pre-tag">{PROFILE.role} — {PROFILE.location}</div>
        <div className="pre-track"><i /></div>
        <div className="pre-count">0%</div>
      </div>
    </div>
  );
}
