import { motion } from "framer-motion";

const SKILL_CATEGORIES = [
  {
    title: "Engineering",
    skills: ["React", "Next.js", "TypeScript", "Node.js", "Python", "Java", "Laravel", "REST APIs"]
  },
  {
    title: "Infrastructure",
    skills: ["Docker", "Linux", "Celery", "Vercel", "Git", "AWS", "CI/CD"]
  },
  {
    title: "Architecture",
    skills: ["MongoDB", "PostgreSQL", "Firebase", "Supabase", "Redis", "Microservices"]
  }
];

export default function Skills() {
  return (
    <section id="skills" style={{ position: "relative", padding: "140px 0", background: "var(--bg-primary)", overflow: "hidden", borderBottom: "1px solid var(--border-color)" }}>
      
      <div className="section-container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "40px", marginBottom: "80px" }}
        >
          <div>
            <div className="line-accent"></div>
            <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "var(--text-primary)" }}>
              Technical <span style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>Acumen.</span>
            </h2>
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "var(--text-tertiary)", maxWidth: "300px", lineHeight: 1.6 }}>
            A curated selection of the technologies, languages, and frameworks I use to engineer premium digital solutions.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "0" }}>
          {SKILL_CATEGORIES.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              style={{ padding: "40px", border: "1px solid var(--border-color)", borderLeft: idx !== 0 ? "none" : "1px solid var(--border-color)", background: "var(--bg-secondary)", transition: "background 0.3s ease" }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--bg-tertiary)"}
              onMouseLeave={e => e.currentTarget.style.background = "var(--bg-secondary)"}
            >
              <h3 style={{ fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "30px", borderBottom: "1px solid var(--border-light)", paddingBottom: "16px" }}>{category.title}</h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {category.skills.map((skill) => (
                  <li key={skill} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "var(--text-secondary)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>{skill}</span>
                    <span style={{ fontSize: "0.6rem", color: "var(--accent-gold)", letterSpacing: "1px" }}>+</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Infinite Marquee */}
      <div style={{ width: "100%", overflow: "hidden", padding: "60px 0", background: "var(--bg-secondary)", borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)", marginTop: "100px" }}>
        <div className="marquee-container">
          <div className="marquee-content">
            {[...Array(2)].map((_, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "60px", paddingRight: "60px" }}>
                {["REACT", "NODE.JS", "TYPESCRIPT", "MONGODB", "NEXT.JS", "POSTGRESQL", "DOCKER", "PYTHON", "AWS", "GRAPHQL"].map((tech, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: "60px" }}>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "3rem", fontWeight: 800, color: "var(--text-secondary)" }}>{tech}</span>
                    <span style={{ color: "var(--accent-gold)", fontSize: "1.2rem" }}>✦</span>
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
