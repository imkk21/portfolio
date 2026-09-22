import { useRef } from "react";
import { Award, Trophy } from "lucide-react";
import { gsap, useGSAP } from "../lib/smooth";
import { EDUCATION, CERTIFICATIONS, ACHIEVEMENTS } from "../data";

export default function Education() {
  const root = useRef(null);

  useGSAP(() => {
    gsap.from(".edu-block", { y: 30, opacity: 0, stagger: 0.1, duration: 0.85, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 78%" } });
  }, { scope: root });

  return (
    <section ref={root} id="education">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">Background</span>
          <h2>Education &amp; <em>recognition.</em></h2>
        </div>

        <div className="edu-grid">
          <div>
            <div className="edu-block">
              <span className="label">Degrees</span>
              {EDUCATION.map((e) => (
                <div key={e.short} className="row">
                  <span className="k">{e.short}</span>
                  <div><div className="t">{e.degree}</div><div className="s">{e.school}</div></div>
                  <span className="r">{e.period}</span>
                </div>
              ))}
            </div>
            <div className="edu-block">
              <span className="label">Certifications</span>
              {CERTIFICATIONS.map((c) => (
                <div key={c.name} className="row">
                  <span className="k"><Award size={17} /></span>
                  <div><div className="t">{c.name}</div><div className="s">{c.org}</div></div>
                  <span />
                </div>
              ))}
            </div>
          </div>

          <div className="edu-block">
            <span className="label">Achievements</span>
            {ACHIEVEMENTS.map((a) => (
              <div key={a.name} className="row">
                <span className="k"><Trophy size={17} /></span>
                <div><div className="t">{a.name}</div><div className="s">{a.note}</div></div>
                <span />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
