import { lazy, Suspense } from "react";
import { SKILLS, PROFILE } from "../data";

const TechGlobe = lazy(() => import("./TechGlobe"));

// Pointer position feeds the CSS spotlight (--mx/--my).
const spot = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

export default function Skills() {
  return (
    <section id="skills" className="wrap">
      <div className="sec-head" data-reveal>
        <span className="sec-idx">05 — Skills</span>
        <h2 className="sec-title">Tool<em>kit.</em></h2>
        <p className="sec-sub">Backend-first, with enough cloud, DevOps and frontend to ship the whole thing. Spin the globe.</p>
      </div>

      <div className="skills-split">
        <Suspense fallback={<div className="globe" />}><TechGlobe /></Suspense>

        <div className="bento">
          {SKILLS.map((g, i) => (
            <div key={g.title} className="cell" style={{ "--span": g.span }} onPointerMove={spot} data-reveal>
              <div className="cell-head">
                <h3>{g.title}</h3>
                <span className="label">0{i + 1}</span>
              </div>
              <div className="tags">{g.items.map((s) => <span key={s} className="tag">{s}</span>)}</div>
            </div>
          ))}
          <div className="cell now" style={{ "--span": 6 }} data-reveal>
            <span className="label">Currently</span>
            <p>Building Spring Boot analytics APIs on MySQL + ClickHouse at {PROFILE.company}.</p>
            <span className="live"><i /> Shipping in production</span>
          </div>
        </div>
      </div>
    </section>
  );
}
