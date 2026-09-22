import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { gsap, useGSAP } from "../lib/smooth";
import { PROJECTS } from "../data";

const featured = PROJECTS.filter((p) => p.featured);
const rest = PROJECTS.filter((p) => !p.featured);

// Browser-chrome frame around a real screenshot of the deployed site.
function Frame({ p, className = "" }) {
  return (
    <div className={`frame ${className}`}>
      <div className="frame-bar">
        <span className="dots"><i /><i /><i /></span>
        <span className="frame-url">{p.live ? p.live.replace(/^https?:\/\//, "").replace(/\/$/, "") : "github.com/imkk21"}</span>
      </div>
      {p.shot ? (
        <img src={p.shot} alt={`${p.name} screenshot`} loading="lazy" />
      ) : (
        <div className="frame-blank" style={{ "--hue": p.hue }}><span>{p.name.slice(0, 2)}</span></div>
      )}
    </div>
  );
}

export default function Projects() {
  const root = useRef(null);
  const pin = useRef(null);
  const track = useRef(null);
  const [open, setOpen] = useState(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Featured rows: the screenshot drifts as its row scrolls past.
    gsap.utils.toArray(".show-shot").forEach((el) => {
      gsap.fromTo(el, { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
    });

    // Desktop: pin the archive and scrub it sideways.
    mm.add("(min-width: 900px)", () => {
      const dist = () => track.current.scrollWidth - window.innerWidth + 80;
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
          <span className="sec-idx">04 — Work</span>
          <h2 className="sec-title">Selected <em>work.</em></h2>
          <p className="sec-sub">Live products, shot from the deployed sites. {PROJECTS.length} in total — the rest are in the archive below.</p>
        </div>

        {/* Featured showcase */}
        <div className="showcase">
          {featured.map((p, i) => (
            <article key={p.name} className="show" data-reveal>
              <a className="show-media" href={p.live || p.github} target="_blank" rel="noopener noreferrer" data-cursor="Visit">
                <div className="show-shot"><Frame p={p} /></div>
              </a>
              <div className="show-info">
                <span className="label">{String(i + 1).padStart(2, "0")} — {p.tagline}</span>
                <h3>{p.name}</h3>
                <p className="desc">{p.description}</p>
                <div className="tags">{p.stack.map((t) => <span key={t} className="tag">{t}</span>)}</div>
                <div className="show-links">
                  {p.live && <a href={p.live} className="btn btn-solid" target="_blank" rel="noopener noreferrer">Visit live <ArrowUpRight size={15} /></a>}
                  {p.github && <a href={p.github} className="btn btn-line" target="_blank" rel="noopener noreferrer"><FaGithub size={15} /> Source</a>}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="archive-head" data-reveal>
          <span className="label">The archive</span>
          <span className="label">{rest.length} more · scroll sideways</span>
        </div>
      </div>

      <div ref={pin} className="proj-pin">
        <div ref={track} className="proj-track">
          {rest.map((p, i) => (
            <article key={p.name} className={`proj ${open === p.name ? "open" : ""}`} style={{ "--hue": p.hue }} onClick={() => setOpen(open === p.name ? null : p.name)} data-cursor={open === p.name ? "Close" : "Peek"}>
              <Frame p={p} className="proj-frame" />
              <div className="proj-body">
                <div>
                  <span className="label">{String(i + 3).padStart(2, "0")} — {p.tagline}</span>
                  <h3>{p.name}</h3>
                  <p className="desc">{p.description}</p>
                  <div className="tags">{p.stack.map((t) => <span key={t} className="tag">{t}</span>)}</div>
                </div>
                <div className="proj-links" onClick={(e) => e.stopPropagation()}>
                  {p.live && <a href={p.live} className="link-u" target="_blank" rel="noopener noreferrer">Live <ArrowUpRight size={14} /></a>}
                  {p.github && <a href={p.github} className="link-u" target="_blank" rel="noopener noreferrer"><FaGithub size={14} /> Source</a>}
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
