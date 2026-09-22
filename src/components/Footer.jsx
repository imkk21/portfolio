import { ArrowUp } from "lucide-react";
import { scrollTo } from "../lib/smooth";
import { PROFILE } from "../data";

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-col">
            <div className="footer-brand">{PROFILE.name}</div>
            <p style={{ maxWidth: 300 }}>{PROFILE.role} in {PROFILE.location}. Currently building analytics APIs at {PROFILE.company}.</p>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
            <a href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}>{PROFILE.phone}</a>
          </div>
          <div className="footer-col">
            <h4>Elsewhere</h4>
            {PROFILE.socials.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>)}
            <a href={PROFILE.resume} download>Resume (PDF)</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {YEAR} {PROFILE.name}</span>
          <button className="to-top" onClick={() => scrollTo(0)}>Back to top <ArrowUp size={13} /></button>
        </div>
      </div>
    </footer>
  );
}
