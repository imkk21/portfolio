import { useRef } from "react";
import { gsap, useGSAP } from "../lib/smooth";
import { EXPERIENCE } from "../data";

// Bold the metrics so they read at a glance.
const Highlight = ({ text }) =>
  text.split(/(~?\d[\d.,]*(?:M|k|%|\+)?)/g).map((p, i) => (/^~?\d/.test(p) ? <strong key={i}>{p}</strong> : p));

export default function Experience() {
  const root = useRef(null);

  useGSAP(() => {
    gsap.to(".exp-line i", { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".exp-list", start: "top 60%", end: "bottom 60%", scrub: true } });
    gsap.utils.toArray(".job").forEach((el) => {
      gsap.from(el.children, { y: 40, opacity: 0, stagger: 0.1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } });
    });
  }, { scope: root });

  return (
    <section ref={root} id="experience" className="wrap">
      <div className="exp-grid">
        <div className="exp-left">
          <span className="sec-idx" data-reveal>02 — Experience</span>
          <h2 className="sec-title" data-reveal>Where<br />I've <em>built.</em></h2>
          <p className="sec-sub" style={{ gridColumn: 1 }} data-reveal>From configuring Linux servers to shipping production Spring Boot APIs on ClickHouse.</p>
          <div className="exp-line"><i /></div>
        </div>

        <div className="exp-list">
          {EXPERIENCE.map((job) => (
            <article key={job.company} className={`job ${job.current ? "current" : ""}`}>
              <div className="job-period">{job.period}</div>
              <div>
                <h3>{job.role}</h3>
                <div className="job-co"><b>{job.company}</b> · {job.location}</div>
                <ul>{job.bullets.map((b) => <li key={b}><Highlight text={b} /></li>)}</ul>
                <div className="tags">{job.tech.map((t) => <span key={t} className="tag">{t}</span>)}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
