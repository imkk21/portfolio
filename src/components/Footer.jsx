import { ArrowUp } from "lucide-react";
import { scrollTo } from "../lib/smooth";
import { PROFILE } from "../data";

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-col">
          <h4>Contact</h4>
          <a href={`mailto:${PROFILE.email}`} className="link-u">{PROFILE.email}</a>
          <a href={`tel:${PROFILE.phone.replace(/\s/g, "")}`} className="link-u">{PROFILE.phone}</a>
          <p>{PROFILE.location}</p>
        </div>
        <div className="footer-col">
          <h4>Elsewhere</h4>
          {PROFILE.socials.map((s) => <a key={s.label} href={s.href} className="link-u" target="_blank" rel="noopener noreferrer">{s.label}</a>)}
        </div>
        <div className="footer-col">
          <h4>Resume</h4>
          <a href={PROFILE.resume} download className="link-u">Download PDF</a>
        </div>
      </div>

      <div className="footer-name" aria-hidden="true">{PROFILE.name}</div>

      <div className="footer-bottom">
        <span>© {YEAR} {PROFILE.name}</span>
        <span>Designed &amp; built from scratch · React · GSAP · Three.js</span>
        <button className="to-top" onClick={() => scrollTo(0)}>Back to top <ArrowUp size={14} /></button>
      </div>
    </footer>
  );
}
