import { useEffect, useRef } from "react";
import { gsap } from "../lib/smooth";

// Dot follows instantly, ring lags. Elements with data-cursor="View" show a labelled ring.
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches) return;
    document.body.classList.add("has-cursor");
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.4, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.4, ease: "power3" });
    const move = (e) => { gsap.set([dot.current, ring.current], { opacity: 1 }); gsap.set(dot.current, { x: e.clientX, y: e.clientY }); rx(e.clientX); ry(e.clientY); };
    const over = (e) => {
      const labelled = e.target.closest("[data-cursor]");
      const link = e.target.closest("a, button, input, textarea, .proj");
      ring.current.textContent = labelled ? labelled.dataset.cursor : "";
      ring.current.classList.toggle("is-label", !!labelled);
      ring.current.classList.toggle("is-link", !labelled && !!link);
    };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over);
    return () => { document.body.classList.remove("has-cursor"); window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
  }, []);

  return (
    <>
      <div ref={dot} className="cur-dot" />
      <div ref={ring} className="cur-ring" />
    </>
  );
}
