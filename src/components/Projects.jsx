import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { gsap, useGSAP } from "../lib/smooth";
import { PROJECTS } from "../data";

export default function Projects() {
  const root = useRef(null);
  const pin = useRef(null);
  const track = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    // Desktop: pin the section and scrub the track sideways. Mobile: plain vertical stack (CSS).
    mm.add("(min-width: 900px)", () => {
      const dist = () => track.current.scrollWidth - window.innerWidth;
      gsap.to(track.current, {
        x: () => -dist(), ease: "none",
        scrollTrigger: { trigger: pin.current, pin: true, scrub: 1, end: () => `+=${dist()}`, invalidateOnRefresh: true,
          onUpdate: (self) => gsap.set(".proj-bar i", { scaleX: self.progress }) },
      });
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <section ref={root} id="work" style={{ paddingBottom: 0 }}>
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <span className="sec-idx">03 — Work</span>
          <h2 className="sec-title">Selected <em>work.</em></h2>
          <p className="sec-sub">{PROJECTS.length} projects — full-stack products, backend pipelines and a few experiments. Scroll to explore.</p>
        </div>
      </div>

      <div ref={pin} className="proj-pin">
        <div ref={track} className="proj-track">
          {PROJECTS.map((p, i) => (
            <article key={p.name} className="proj" style={{ "--hue": p.hue }} data-cursor="Drag">
              <div className="proj-visual">
                <div className="grid" />
                <span className="idx">{String(i + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}</span>
                <span className="pill">{p.stack[0]}</span>
                <span className="big">{p.name.slice(0, 2)}</span>
              </div>
              <div className="proj-body">
                <div>
                  <span className="label">{p.tagline}</span>
                  <h3>{p.name}</h3>
                  <p className="desc">{p.description}</p>
                  <div className="tags">{p.stack.map((t) => <span key={t} className="tag">{t}</span>)}</div>
                </div>
                <div className="proj-links">
                  {p.live && <a href={p.live} className="link-u" target="_blank" rel="noopener noreferrer" data-cursor="Open">Live <ArrowUpRight size={14} /></a>}
                  {p.github && <a href={p.github} className="link-u" target="_blank" rel="noopener noreferrer" data-cursor="Code"><FaGithub size={14} /> Source</a>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="proj-bar"><i /></div>
    </section>
  );
}
