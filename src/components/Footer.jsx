import { FaGithub as Github, FaLinkedin as Linkedin } from "react-icons/fa";
import { SiLeetcode as Leetcode } from "react-icons/si";
import { Shield, Terminal } from "lucide-react";

export default function Footer({ activeMode }) {
  const getModeAccent = () => {
    switch (activeMode) {
      case "fullstack": return "var(--accent-blue)";
      case "aiml": return "var(--accent-purple)";
      case "security": return "var(--accent-green)";
      case "data": return "var(--accent-cyan)";
      default: return "var(--accent-blue)";
    }
  };

  const accentColor = getModeAccent();

  return (
    <footer style={{ background: "var(--bg-primary)", padding: "60px 0", borderTop: "1px solid var(--border-color)", marginTop: "auto" }}>
      <div className="section-container" style={{ padding: "0 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "40px" }}>
        
        <div>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.4rem", color: "var(--text-primary)", display: "block", marginBottom: "8px", letterSpacing: "1px" }}>
            KUNAL KUMAR
          </span>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--text-tertiary)", letterSpacing: "1px" }}>
            © {new Date().getFullYear()} • Engineered from scratch with React & Framer Motion.
          </span>
        </div>

        <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
          {[
            { label: "GITHUB", href: "https://github.com/imkk21", icon: <Github size={15} /> },
            { label: "LINKEDIN", href: "https://linkedin.com/in/kunal-kumar-a7176219b", icon: <Linkedin size={15} /> },
            { label: "LEETCODE", href: "https://leetcode.com/u/imkk21/", icon: <Leetcode size={15} /> },
            { label: "TRYHACKME", href: "https://tryhackme.com", icon: <Terminal size={15} /> },
            { label: "HACKTHEBOX", href: "https://hackthebox.com", icon: <Shield size={15} /> }
          ].map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" 
               style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-sans)", color: "var(--text-tertiary)", fontSize: "0.72rem", letterSpacing: "1.5px", transition: "color 0.3s ease" }}
               onMouseEnter={e => e.currentTarget.style.color = accentColor}
               onMouseLeave={e => e.currentTarget.style.color = "var(--text-tertiary)"}>
              {social.icon} {social.label}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}
