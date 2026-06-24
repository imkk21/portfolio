import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";

const PROJECTS = [
  {
    name: "Insightify",
    tagline: "AI Developer Digest",
    description: "An elegant solution utilizing Google Gemini AI to aggregate GitHub activity, weather, and tech news into a smart developer digest.",
    stack: ["React", "Node.js", "MongoDB", "Gemini AI"],
    links: { live: "https://insightifyweb.vercel.app", github: null },
    number: "01"
  },
  {
    name: "ShareItz",
    tagline: "Instant Text Sharing",
    description: "A frictionless, TypeScript-first platform for instant text sharing, globally deployed on Vercel with zero sign-up overhead.",
    stack: ["Next.js", "TypeScript", "Firebase"],
    links: { live: "https://shareitz.vercel.app", github: null },
    number: "02"
  },
  {
    name: "DevSync",
    tagline: "Real-time Collaboration",
    description: "A sophisticated real-time code collaboration environment powered by Supabase and the Judge0 execution engine.",
    stack: ["Supabase", "JavaScript", "Judge0"],
    links: { live: "https://devsyncide.vercel.app", github: null },
    number: "03"
  },
  {
    name: "DocFlow",
    tagline: "AI Document Extraction",
    description: "A high-performance pipeline leveraging Redis Pub/Sub to orchestrate AI-driven document extraction and review workflows.",
    stack: ["FastAPI", "PostgreSQL", "Redis", "Celery"],
    links: { live: null, github: "https://github.com/imkk21/docflow" },
    number: "04"
  }
];

export default function Projects() {
  return (
    <section id="projects" style={{ padding: "140px 0", background: "var(--bg-primary)", position: "relative", borderBottom: "1px solid var(--border-color)" }}>
      
      <div className="section-container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: "100px" }}
        >
          <div className="line-accent"></div>
          <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "var(--text-primary)" }}>
            Selected <span style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>Works.</span>
          </h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              style={{ borderTop: "1px solid var(--border-color)", borderBottom: idx === PROJECTS.length - 1 ? "1px solid var(--border-color)" : "none", padding: "60px 0", display: "flex", flexWrap: "wrap", gap: "40px", alignItems: "flex-start", transition: "background 0.4s ease" }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--bg-secondary)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              {/* Number */}
              <div style={{ flex: "0 0 60px", fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "var(--accent-gold)", fontWeight: 300, paddingTop: "8px" }}>
                {project.number}
              </div>

              {/* Title & Tagline */}
              <div style={{ flex: "1 1 300px" }}>
                <h3 style={{ fontSize: "2.5rem", color: "var(--text-primary)", marginBottom: "8px" }}>{project.name}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", letterSpacing: "2px", textTransform: "uppercase", color: "var(--text-tertiary)" }}>{project.tagline}</p>
              </div>

              {/* Description & Stack */}
              <div style={{ flex: "2 1 400px" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.8, marginBottom: "30px", fontWeight: 300 }}>
                  {project.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "30px" }}>
                  {project.stack.map(tech => (
                    <span key={tech} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "var(--text-tertiary)", letterSpacing: "1px", textTransform: "uppercase" }}>
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div style={{ display: "flex", gap: "20px" }}>
                  {project.links.github && (
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "var(--text-primary)", borderBottom: "1px solid var(--border-color)", paddingBottom: "4px", transition: "border-color 0.3s" }} onMouseEnter={e => e.currentTarget.style.borderColor="var(--accent-gold)"} onMouseLeave={e => e.currentTarget.style.borderColor="var(--border-color)"}>
                      <Github size={16} /> Repository
                    </a>
                  )}
                  {project.links.live && (
                    <a href={project.links.live} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "var(--text-primary)", borderBottom: "1px solid var(--border-color)", paddingBottom: "4px", transition: "border-color 0.3s" }} onMouseEnter={e => e.currentTarget.style.borderColor="var(--accent-gold)"} onMouseLeave={e => e.currentTarget.style.borderColor="var(--border-color)"}>
                      <ExternalLink size={16} /> Live Site
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
