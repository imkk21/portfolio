import { useRef } from "react";
import { gsap, useGSAP } from "../lib/smooth";
import { Words } from "../lib/text";
import { MANIFESTO, STATS, PROFILE } from "../data";
import portrait from "../assets/portrait.jpg";

export default function About() {
  const root = useRef(null);

  useGSAP(() => {
    // Words brighten one by one as the paragraph scrolls through the viewport.
    gsap.to(".about-text .wd", { opacity: 1, stagger: 0.04, ease: "none", scrollTrigger: { trigger: ".about-text", start: "top 75%", end: "bottom 45%", scrub: 0.5 } });

    // Portrait drifts slower than the page.
    gsap.fromTo(".about-photo img", { yPercent: -8 }, { yPercent: 8, ease: "none", scrollTrigger: { trigger: ".about-photo", start: "top bottom", end: "bottom top", scrub: true } });

    // Count-up numbers, once, on enter.
    gsap.utils.toArray(".stat").forEach((el) => {
      const num = el.querySelector(".num i");
      const { end, decimals = 0 } = el.dataset;
      const o = { v: 0 };
      gsap.to(o, { v: Number(end), duration: 1.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onUpdate: () => { num.textContent = o.v.toFixed(Number(decimals)); } });
    });
  }, { scope: root });

  return (
    <section ref={root} id="about" className="wrap">
      <div className="sec-head" data-reveal>
        <span className="sec-idx">01 — About</span>
      </div>

      <div className="about-grid">
        <p className="about-text"><Words text={MANIFESTO} /></p>
        <figure className="about-photo" data-reveal>
          <img src={portrait} alt={PROFILE.name} loading="lazy" />
          <figcaption>
            <span>{PROFILE.name}</span>
            <span className="label">{PROFILE.role} · {PROFILE.location}</span>
          </figcaption>
        </figure>
      </div>

      <div className="stats">
        {STATS.map((s) => (
          <div key={s.label} className="stat" data-end={s.end} data-decimals={s.decimals || 0} data-reveal>
            <div className="num">{s.prefix}<i>0</i>{s.suffix}</div>
            <p>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
