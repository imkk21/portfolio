import { motion as Motion } from "framer-motion";

const SKILL_GROUPS = [
  {
    id: "fullstack",
    title: "Full-Stack Development",
    accent: "var(--accent-blue)",
    skills: ["React.js", "Next.js", "Node.js", "Laravel (PHP)", "TypeScript", "JavaScript (ES6+)", "Angular", "HTML5 & CSS3", "Tailwind CSS"]
  },
  {
    id: "aiml",
    title: "AI / Machine Learning",
    accent: "var(--accent-purple)",
    skills: ["Gemini API", "LangChain", "RAG Pipelines", "Agentic AI", "HNSW / ANN", "Sentence Transformers", "FAISS", "Python", "NumPy"]
  },
  {
    id: "security",
    title: "Cyber Security & Networks",
    accent: "var(--accent-green)",
    skills: ["Vulnerability Assessment", "SIEM Log Analysis", "ELK Stack (SIEM)", "Wireshark", "Nmap & Burp Suite", "Kali Linux", "CCNA Networking", "System Hardening"]
  },
  {
    id: "data",
    title: "DevOps & Infrastructure",
    accent: "var(--accent-cyan)",
    skills: ["Docker & Compose", "GitHub Actions", "CI/CD Pipelines", "AWS", "Google Cloud (GCP)", "Linux Administration", "Git Version Control", "Postman API Test"]
  }
];

export default function Skills({ activeMode }) {
  return (
    <section id="skills" style={{ position: "relative", padding: "120px 0", background: "var(--bg-primary)", overflow: "hidden", borderBottom: "1px solid var(--border-color)" }}>
      
      <div className="section-container">
        <Motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "40px", marginBottom: "60px" }}
        >
          <div>
            <div className="line-accent"></div>
            <h2 style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", color: "var(--text-primary)", fontWeight: 800 }}>
              Technical <span style={{ color: "var(--accent-mode)", fontStyle: "italic", transition: "color 0.4s ease" }}>Acumen.</span>
            </h2>
          </div>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "var(--text-secondary)", maxWidth: "420px", lineHeight: 1.7, fontWeight: 300 }}>
            A comprehensive mapping of my engineering capabilities. The highlighted section represents my active focus mode.
          </p>
        </Motion.div>

        {/* Skills Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          {SKILL_GROUPS.map((group) => {
            const isActive = activeMode === group.id;
            return (
              <Motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-panel"
                style={{ 
                  padding: "32px", 
                  borderRadius: "12px", 
                  border: isActive ? `1.5px solid ${group.accent}` : "1.5px solid var(--glass-border)",
                  background: isActive ? "rgba(255, 255, 255, 0.03)" : "var(--glass-bg)",
                  boxShadow: isActive ? `0 10px 30px -10px ${group.accent}33` : "var(--card-shadow)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative"
                }}
              >
                {/* Active Mode Focus Badge */}
                {isActive && (
                  <span style={{ 
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    color: group.accent,
                    background: `${group.accent}1f`,
                    padding: "4px 10px",
                    borderRadius: "4px",
                    border: `1px solid ${group.accent}44`
                  }}>
                    Active Focus
                  </span>
                )}

                <h3 style={{ 
                  fontSize: "1.25rem", 
                  color: isActive ? "var(--text-primary)" : "var(--text-secondary)", 
                  marginBottom: "24px", 
                  display: "flex", 
                  alignItems: "center",
                  gap: "10px"
                }}>
                  <span style={{ 
                    width: "8px", 
                    height: "8px", 
                    borderRadius: "50%", 
                    background: group.accent, 
                    display: "inline-block",
                    boxShadow: isActive ? `0 0 8px ${group.accent}` : "none"
                  }}></span>
                  {group.title}
                </h3>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {group.skills.map((skill) => (
                    <span 
                      key={skill} 
                      style={{ 
                        fontFamily: "var(--font-sans)", 
                        fontSize: "0.8rem", 
                        color: isActive ? "var(--text-primary)" : "var(--text-secondary)", 
                        background: isActive ? `${group.accent}0a` : "rgba(255, 255, 255, 0.02)",
                        border: isActive ? `1px solid ${group.accent}33` : "1px solid var(--border-color)",
                        padding: "6px 12px", 
                        borderRadius: "6px",
                        transition: "all 0.3s ease"
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Motion.div>
            );
          })}
        </div>
      </div>

      {/* Infinite Scrolling Marquee */}
      <div style={{ width: "100%", overflow: "hidden", padding: "40px 0", background: "rgba(255,255,255,0.01)", borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)", marginTop: "80px" }}>
        <div className="marquee-container">
          <div className="marquee-content">
            {[...Array(2)].map((_, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "60px", paddingRight: "60px" }}>
                {["REACT", "NODE.JS", "TYPESCRIPT", "MONGODB", "NEXT.JS", "POSTGRESQL", "DOCKER", "PYTHON", "AWS", "FASTAPI", "SUPABASE", "LARAVEL"].map((tech, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: "60px" }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", fontWeight: 800, color: "rgba(255, 255, 255, 0.08)" }}>{tech}</span>
                    <span style={{ color: "var(--accent-mode)", fontSize: "1rem", transition: "color 0.4s ease" }}>✦</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
