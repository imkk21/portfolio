import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { gsap, useGSAP } from "../lib/smooth";
import { PROJECTS } from "../data";

const featured = PROJECTS.filter((p) => p.featured);
const rest = PROJECTS.filter((p) => !p.featured);

export default function Projects() {
  const root = useRef(null);

  useGSAP(() => {
    gsap.utils.toArray(".show, .mini").forEach((el) => {
      gsap.from(el, { y: 40, opacity: 0, duration: 0.95, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } });
    });
    gsap.from(".sec-head", { y: 28, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 78%" } });
  }, { scope: root });

  return (
    <section ref={root} id="work">
      <div className="glow" style={{ width: 460, height: 460, bottom: "6%", left: "-10%", background: "rgba(124,106,247,0.1)" }} />
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">Selected work</span>
          <h2>Things I&apos;ve designed, <em>built and deployed.</em></h2>
          <p>Screenshots are taken from the live deployments. {PROJECTS.length} projects in total, source on GitHub.</p>
        </div>

        <div className="showcase">
          {featured.map((p) => (
            <article key={p.name} className="show panel">
              <a className="show-media" href={p.live || p.github} target="_blank" rel="noopener noreferrer" data-cursor="Visit">
                <img src={p.shot} alt={`${p.name} screenshot`} loading="lazy" />
              </a>
              <div className="show-body">
                <span className="label">{p.tagline}</span>
                <h3>{p.name}</h3>
                <p className="desc">{p.description}</p>
                <div className="tags">{p.stack.map((t) => <span key={t} className="tag">{t}</span>)}</div>
                <div className="show-links">
                  {p.live && <a href={p.live} className="btn btn-accent" target="_blank" rel="noopener noreferrer">Visit site <ArrowUpRight size={15} /></a>}
                  {p.github && <a href={p.github} className="btn btn-line" target="_blank" rel="noopener noreferrer"><FaGithub size={15} /> Source</a>}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="grid-cards">
          {rest.map((p) => (
            <article key={p.name} className="mini panel">
              <div className="mini-media">
                {p.shot
                  ? <img src={p.shot} alt={`${p.name} screenshot`} loading="lazy" />
                  : <div className="mini-blank" style={{ "--hue": p.hue }}><span>{p.stack[0]}</span></div>}
              </div>
              <div className="mini-body">
                <span className="label">{p.tagline}</span>
                <h3>{p.name}</h3>
                <p className="desc">{p.description}</p>
                <div className="tags">{p.stack.slice(0, 3).map((t) => <span key={t} className="tag">{t}</span>)}</div>
                <div className="mini-links">
                  {p.live && <a href={p.live} className="link-u" target="_blank" rel="noopener noreferrer">Live <ArrowUpRight size={13} /></a>}
                  {p.github && <a href={p.github} className="link-u" target="_blank" rel="noopener noreferrer"><FaGithub size={13} /> Source</a>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
