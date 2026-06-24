import { FaGithub as Github, FaLinkedin as Linkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg-primary)", padding: "60px 0", borderTop: "1px solid var(--border-color)", marginTop: "auto" }}>
      <div className="section-container" style={{ padding: "0 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "40px" }}>
        
        <div>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "var(--text-primary)", display: "block", marginBottom: "8px" }}>K.</span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "var(--text-tertiary)", letterSpacing: "1px" }}>
            © {new Date().getFullYear()} KUNAL KUMAR.
          </span>
        </div>

        <div style={{ display: "flex", gap: "30px" }}>
          {[
            { label: "GITHUB", href: "https://github.com/imkk21", icon: <Github size={16} /> },
            { label: "LINKEDIN", href: "https://linkedin.com/in/kunal-kumar-a7176219b", icon: <Linkedin size={16} /> }
          ].map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "'Inter', sans-serif", color: "var(--text-tertiary)", fontSize: "0.75rem", letterSpacing: "2px", transition: "color 0.3s ease" }}
               onMouseEnter={e => e.currentTarget.style.color = "var(--accent-gold)"}
               onMouseLeave={e => e.currentTarget.style.color = "var(--text-tertiary)"}>
              {social.icon} {social.label}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}
