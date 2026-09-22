import { useRef } from "react";
import { gsap, useGSAP } from "../lib/smooth";
import { Words } from "../lib/text";
import { MANIFESTO, STATS, PROFILE } from "../data";
import portrait from "../assets/portrait.jpg";

export default function About() {
  const root = useRef(null);

  useGSAP(() => {
    gsap.to(".about-text .wd", { opacity: 1, stagger: 0.035, ease: "none", scrollTrigger: { trigger: ".about-text", start: "top 78%", end: "bottom 52%", scrub: 0.4 } });
    gsap.fromTo(".about-photo img", { yPercent: -5 }, { yPercent: 5, ease: "none", scrollTrigger: { trigger: ".about-photo", start: "top bottom", end: "bottom top", scrub: true } });

    gsap.utils.toArray(".stat").forEach((el) => {
      const num = el.querySelector(".num i");
      const { end, decimals = 0 } = el.dataset;
      const o = { v: 0 };
      gsap.to(o, { v: Number(end), duration: 1.6, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true },
        onUpdate: () => { num.textContent = o.v.toFixed(Number(decimals)); } });
    });

    gsap.utils.toArray("[data-reveal]").forEach((el) => {
      gsap.from(el, { y: 32, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" } });
    });
  }, { scope: root });

  return (
    <section ref={root} id="about">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <span className="eyebrow">About</span>
        </div>

        <div className="about-grid">
          <p className="about-text"><Words text={MANIFESTO} /></p>
          <figure className="about-photo" data-reveal>
            <div className="shot"><img src={portrait} alt={PROFILE.name} loading="lazy" /></div>
            <figcaption>
              <span className="nm">{PROFILE.name}</span>
              <span className="label">{PROFILE.role} · {PROFILE.company}</span>
            </figcaption>
          </figure>
        </div>

        <div className="stats">
          {STATS.map((s) => (
            <div key={s.label} className="stat panel" data-end={s.end} data-decimals={s.decimals || 0} data-reveal>
              <div className="num">{s.prefix}<i>0</i><em>{s.suffix}</em></div>
              <p>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
