import { Award, Trophy } from "lucide-react";
import { EDUCATION, CERTIFICATIONS, ACHIEVEMENTS } from "../data";

export default function Education() {
  return (
    <section id="education" className="wrap">
      <div className="sec-head" data-reveal>
        <span className="sec-idx">05 — Background</span>
        <h2 className="sec-title">Edu<em>cation.</em></h2>
      </div>

      <div className="edu-grid">
        <div className="edu-col" data-reveal>
          <h3>Degrees</h3>
          {EDUCATION.map((e) => (
            <div key={e.short} className="row">
              <span className="k">{e.short}</span>
              <div><div className="t">{e.degree}</div><div className="s">{e.school}</div></div>
              <span className="r">{e.period}</span>
            </div>
          ))}
          <h3 style={{ marginTop: 48 }}>Certifications</h3>
          {CERTIFICATIONS.map((c) => (
            <div key={c.name} className="row">
              <Award size={22} />
              <div><div className="t">{c.name}</div><div className="s">{c.org}</div></div>
              <span />
            </div>
          ))}
        </div>

        <div className="edu-col" data-reveal>
          <h3>Achievements</h3>
          {ACHIEVEMENTS.map((a) => (
            <div key={a.name} className="row">
              <Trophy size={22} />
              <div><div className="t">{a.name}</div><div className="s">{a.note}</div></div>
              <span />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
