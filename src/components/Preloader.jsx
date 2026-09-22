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
      .to(counter, { v: 100, duration: 1.8, ease: "power2.inOut", onUpdate: () => { num.textContent = String(Math.round(counter.v)).padStart(3, "0"); } })
      .from(".pre-name .ch", { yPercent: 110, stagger: 0.04, duration: 0.9, ease: "power4.out" }, 0.2)
      .from(".pre-tag", { opacity: 0, y: 10, duration: 0.6 }, 0.8)
      .to(".pre-inner", { yPercent: -40, opacity: 0, duration: 0.6, ease: "power2.in" }, "+=0.25")
      .to(root.current, { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, "-=0.35");
  }, { scope: root });

  return (
    <div ref={root} className="pre">
      <div className="pre-inner">
        <div className="pre-name"><Chars text={PROFILE.name} /></div>
        <div className="pre-count">000</div>
        <div className="pre-tag">{PROFILE.role} — {PROFILE.location}</div>
      </div>
    </div>
  );
}
