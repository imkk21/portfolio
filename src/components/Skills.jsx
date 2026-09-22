import { lazy, Suspense, useState } from "react";
import { SKILLS } from "../data";
import ICONS from "../lib/icons.json";
import { readableHex } from "../lib/theme";

const TechGlobe = lazy(() => import("./TechGlobe"));

// Skill label -> globe icon label, so hovering a chip can drive the globe.
const ALIAS = { "Spring Boot": "Spring Boot", "Spring Data JPA / Hibernate": "Hibernate", "JavaScript (ES6+)": "JavaScript", "Tailwind CSS": "Tailwind", "Shell Scripting": "Linux", "Python": "Python" };
const BY_LABEL = Object.fromEntries(ICONS.map((i) => [i.label, i]));
const iconFor = (skill) => BY_LABEL[ALIAS[skill] || skill] || null;

export default function Skills({ theme }) {
  const [focus, setFocus] = useState(null);
  // theme is in the key so chip colours re-resolve when the palette flips
  void theme;

  return (
    <section id="skills" className="tinted">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">Skills</span>
          <h2>The stack I reach for, <em>day to day.</em></h2>
          <p>Backend first, with enough cloud and frontend to ship the whole thing. Hover a skill to find it on the globe — or drag the globe around.</p>
        </div>

        <div className="skills-grid">
          <Suspense fallback={<div className="globe" />}>
            <TechGlobe focus={focus} theme={theme} />
          </Suspense>

          <div className="skill-groups">
            {SKILLS.map((g, i) => (
              <div key={g.title}>
                <div className="sg-head">
                  <h3>{g.title}</h3>
                  <span className="n">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="tags">
                  {g.items.map((s) => {
                    const icon = iconFor(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        className={`skill ${icon ? "live" : "plain"} ${focus && icon && focus === icon.label ? "on" : ""}`}
                        style={icon ? { "--c": readableHex(icon.hex) } : undefined}
                        onMouseEnter={() => icon && setFocus(icon.label)}
                        onMouseLeave={() => setFocus(null)}
                        onClick={() => icon && setFocus(focus === icon.label ? null : icon.label)}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
