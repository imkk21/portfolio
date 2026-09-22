import { useRef } from "react";
import { gsap, useGSAP } from "../lib/smooth";

// Pulls the child toward the pointer while hovered, springs back on leave.
export default function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef(null);

  useGSAP(() => {
    if (!matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    const x = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
    const move = (e) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - r.left - r.width / 2) * strength);
      y((e.clientY - r.top - r.height / 2) * strength);
    };
    const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); };
  }, { scope: ref });

  return <div ref={ref} style={{ display: "inline-block" }}>{children}</div>;
}
