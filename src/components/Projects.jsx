import { motion as Motion } from "framer-motion";
import { ExternalLink, Award, Code } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";

const ALL_PROJECTS = [
  {
    name: "Insightify",
    tagline: "AI Developer Intelligence Platform",
    description: "Engineered a full-stack developer productivity dashboard integrating GitHub Analytics API, real-time weather data, and global tech news into a unified interface, reducing context-switching for developers.",
    stack: ["React", "Node.js", "MongoDB Atlas", "Firebase Auth", "Gemini AI", "Spotify SDK"],
    category: "fullstack",
    related: ["aiml"],
    links: { live: "https://insightifyweb.vercel.app", github: "https://github.com/imkk21/Insightify" },
    number: "01"
  },
  {
    name: "DevSync",
    tagline: "Real-Time Collaborative Cloud IDE",
    description: "Engineered a real-time collaborative code editor using Supabase live data features. Integrated Judge0 API to enable secure, sandboxed multi-language code execution (10+ languages), delivering sub-2-second compile feedback.",
    stack: ["Supabase", "JavaScript", "Judge0 API", "Docker", "HTML5/CSS3"],
    category: "fullstack",
    related: ["data"],
    links: { live: "https://devsyncide.vercel.app", github: "https://github.com/imkk21/DevSync" },
    number: "02"
  },
  {
    name: "Autonomous AI Code Review Agent",
    tagline: "LLM-Powered CI/CD Review Engine",
    description: "Built a multi-signal code review engine fusing static analysis rules (SQL injection, hardcoded secrets) with Gemini LLM structured output, returning validated JSON with severity, explanation, and drop-in code fixes.",
    stack: ["Python", "FastAPI", "Gemini API", "Pydantic", "Docker", "Git Diff Parsing"],
    category: "aiml",
    related: ["security", "data"],
    links: { live: "https://code-review-agent-six.vercel.app/", github: "https://github.com/imkk21/AI-Code-Reviewer" },
    number: "03"
  },
  {
    name: "Custom HNSW Vector Search Engine",
    tagline: "High-Performance ANN Search from Scratch",
    description: "Implemented a Hierarchical Navigable Small World (HNSW) ANN search engine from scratch in Python/NumPy with custom L2/Cosine distance metrics. Integrated all-MiniLM-L6-v2 and benchmarked QPS against FAISS.",
    stack: ["Python", "NumPy", "Sentence Transformers", "FastAPI", "FAISS", "Docker"],
    category: "aiml",
    related: ["data"],
    links: { live: "https://huggingface.co/spaces/imkk21/custom-vector-search", github: "https://github.com/imkk21/hnsw-vector-search" },
    number: "04"
  },
  {
    name: "Vulnerability Assessment & PenTesting",
    tagline: "Isolated Security Testing Lab",
    description: "Set up an isolated home lab with vulnerable hosts (Metasploitable, DVWA). Performed network/service enumeration and vulnerability scanning, mapping findings to OWASP Top 10 with CVSS severity ratings.",
    stack: ["Kali Linux", "Nmap", "Burp Suite", "OWASP ZAP", "Metasploit"],
    category: "security",
    related: [],
    links: { live: "https://app.hackthebox.com/public/users/433574", github: null },
    number: "05"
  },
  {
    name: "Steam Games Market Analytics",
    tagline: "Tableau Data Visualization",
    description: "Analyzed a dataset of 125K+ Steam games to uncover pricing, player engagement, and genre-popularity trends. Built Tableau dashboard visualizing price-vs-rating and peak players.",
    stack: ["Tableau", "Data Analysis", "Data Visualization"],
    category: "data",
    related: [],
    links: { live: null, github: "https://github.com/imkk21/Steam-Games-Market-Analytics" },
    number: "06"
  },
  {
    name: "DocFlow",
    tagline: "AI Document Extraction Pipeline",
    description: "A high-performance backend pipeline utilizing Redis Pub/Sub and Celery task queues to orchestrate asynchronous AI-driven document content extraction and analysis.",
    stack: ["FastAPI", "PostgreSQL", "Redis", "Celery", "Docker"],
    category: "data",
    related: ["fullstack"],
    links: { live: null, github: "https://github.com/imkk21/docflow" },
    number: "07"
  },
  {
    name: "ShareItz",
    tagline: "Instant Text Sharing",
    description: "A frictionless, TypeScript-first platform for instant copy-paste text sharing, globally deployed with zero sign-up overhead, utilizing Firebase real-time data sync.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase"],
    category: "fullstack",
    related: [],
    links: { live: "https://shareitz.vercel.app", github: "https://github.com/imkk21/shareitz" },
    number: "08"
  },
  {
    name: "CityShop",
    tagline: "Local Marketplace Mobile App",
    description: "Developed a local marketplace application for shopkeepers & shoppers to coordinate shopping details, with PostgreSQL/Supabase backing for low-latency syncing.",
    stack: ["React Native", "PostgreSQL", "Supabase", "JavaScript"],
    category: "fullstack",
    related: [],
    links: { live: null, github: "https://github.com/imkk21/cityshop" },
    number: "09"
  }
];

export default function Projects({ activeMode }) {
  // Sort projects so that active focus mode projects are listed first
  const sortedProjects = [...ALL_PROJECTS].sort((a, b) => {
    const aIsPrimary = a.category === activeMode;
    const bIsPrimary = b.category === activeMode;
    const aIsRelated = a.related.includes(activeMode);
    const bIsRelated = b.related.includes(activeMode);

    if (aIsPrimary && !bIsPrimary) return -1;
    if (!aIsPrimary && bIsPrimary) return 1;
    if (aIsRelated && !bIsRelated) return -1;
    if (!aIsRelated && bIsRelated) return 1;
    return 0;
  });

  return (
    <section id="projects" style={{ padding: "120px 0", background: "var(--bg-secondary)", position: "relative", borderBottom: "1px solid var(--border-color)" }}>
      
      <div className="section-container">
        <Motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: "80px" }}
        >
          <div className="line-accent"></div>
          <h2 style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", color: "var(--text-primary)", fontWeight: 800 }}>
            Featured <span style={{ color: "var(--accent-mode)", fontStyle: "italic", transition: "color 0.4s ease" }}>Projects.</span>
          </h2>
          <p style={{ marginTop: "15px", color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: "600px" }}>
            Below is a dynamic archive of my projects. Based on your focus mode selection above, relevant engineering works are highlighted and sorted to the top.
          </p>
        </Motion.div>

        {/* Dynamic Project Grid/List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {sortedProjects.map((project) => {
            const isPrimaryFocus = project.category === activeMode;
            const isRelatedFocus = project.related.includes(activeMode);
            const isHighlighted = isPrimaryFocus || isRelatedFocus;

            return (
              <Motion.div
                layout
                key={project.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                style={{ 
                  borderTop: "1px solid var(--border-color)", 
                  padding: "50px 20px", 
                  display: "flex", 
                  flexWrap: "wrap", 
                  gap: "40px", 
                  alignItems: "flex-start", 
                  background: isPrimaryFocus ? "var(--accent-mode-glow)" : "transparent",
                  transition: "background 0.5s ease",
                  position: "relative"
                }}
              >
                {/* Number */}
                <div style={{ 
                  flex: "0 0 60px", 
                  fontFamily: "var(--font-mono)", 
                  fontSize: "0.9rem", 
                  color: isHighlighted ? "var(--accent-mode)" : "var(--text-tertiary)", 
                  fontWeight: 600, 
                  transition: "color 0.4s ease"
                }}>
                  {project.number}
                </div>

                {/* Title, Tagline and Focus Badges */}
                <div style={{ flex: "1 1 300px" }}>
                  <h3 style={{ fontSize: "2rem", color: "var(--text-primary)", marginBottom: "8px", display: "flex", alignItems: "center", gap: "10px" }}>
                    {project.name}
                    {isPrimaryFocus && (
                      <span style={{ 
                        fontSize: "0.6rem", 
                        fontWeight: 600, 
                        letterSpacing: "1px", 
                        textTransform: "uppercase", 
                        color: "var(--accent-mode)",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid var(--accent-mode)",
                        padding: "2px 8px", 
                        borderRadius: "4px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px"
                      }}>
                        <Award size={10} /> Mode Pick
                      </span>
                    )}
                    {isRelatedFocus && !isPrimaryFocus && (
                      <span style={{ 
                        fontSize: "0.6rem", 
                        fontWeight: 600, 
                        letterSpacing: "1px", 
                        textTransform: "uppercase", 
                        color: "var(--text-secondary)",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid var(--border-light)",
                        padding: "2px 8px", 
                        borderRadius: "4px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px"
                      }}>
                        <Code size={10} /> Related
                      </span>
                    )}
                  </h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--text-tertiary)", fontWeight: 500 }}>
                    {project.tagline}
                  </p>
                </div>

                {/* Description, Stack and Links */}
                <div style={{ flex: "2 1 450px" }}>
                  <p style={{ fontFamily: "var(--font-sans)", color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "20px", fontWeight: 300 }}>
                    {project.description}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "24px" }}>
                    {project.stack.map(tech => (
                      <span 
                        key={tech} 
                        style={{ 
                          fontFamily: "var(--font-mono)", 
                          fontSize: "0.72rem", 
                          color: isHighlighted ? "var(--text-primary)" : "var(--text-tertiary)", 
                          background: "rgba(255, 255, 255, 0.02)",
                          border: "1px solid var(--border-color)",
                          padding: "4px 10px",
                          borderRadius: "4px",
                          transition: "all 0.3s ease"
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div style={{ display: "flex", gap: "20px" }}>
                    {project.links.github && (
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--text-primary)", borderBottom: "1px solid var(--border-color)", paddingBottom: "4px" }} onMouseEnter={e => e.currentTarget.style.borderColor="var(--accent-mode)"} onMouseLeave={e => e.currentTarget.style.borderColor="var(--border-color)"}>
                        <Github size={16} /> Source Code
                      </a>
                    )}
                    {project.links.live && (
                      <a href={project.links.live} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--text-primary)", borderBottom: "1px solid var(--border-color)", paddingBottom: "4px" }} onMouseEnter={e => e.currentTarget.style.borderColor="var(--accent-mode)"} onMouseLeave={e => e.currentTarget.style.borderColor="var(--border-color)"}>
                        <ExternalLink size={16} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </Motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
