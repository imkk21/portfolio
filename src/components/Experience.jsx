import { useRef } from "react";
import { gsap, useGSAP } from "../lib/smooth";
import { EXPERIENCE } from "../data";

const Highlight = ({ text }) =>
  text.split(/(~?\d[\d.,]*(?:M|k|%|\+)?)/g).map((p, i) => (/^~?\d/.test(p) ? <strong key={i}>{p}</strong> : p));

export default function Experience() {
  const root = useRef(null);

  useGSAP(() => {
    gsap.utils.toArray(".job").forEach((el) => {
      gsap.from(el, { y: 36, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } });
    });
    gsap.from(".sec-head", { y: 28, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 78%" } });
  }, { scope: root });

  return (
    <section ref={root} id="experience">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">Experience</span>
          <h2>Three years of shipping, <em>from networks to APIs.</em></h2>
        </div>

        <div className="exp-list">
          {EXPERIENCE.map((job) => (
            <article key={job.company} className={`job panel ${job.current ? "current" : ""}`}>
              <div className="job-head">
                <h3>{job.role}</h3>
                <span className="at">{job.company}</span>
                <span className="label">{job.location}</span>
              </div>
              <span className="job-period">{job.period}</span>
              <ul>{job.bullets.map((b) => <li key={b}><Highlight text={b} /></li>)}</ul>
              <div className="tags">{job.tech.map((t) => <span key={t} className="tag">{t}</span>)}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
