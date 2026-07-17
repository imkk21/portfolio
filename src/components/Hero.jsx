import { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, Code, Image as ImageIcon } from "lucide-react";
import { FaGithub as Github, FaLinkedin as Linkedin } from "react-icons/fa";
import { SiLeetcode as Leetcode } from "react-icons/si";
import { FiMail as Mail } from "react-icons/fi";
import pfp from "../assets/pfp_linkedin.png";

const MODE_DETAILS = {
  fullstack: {
    title: "Software Engineer",
    tagline: "Building Robust Systems",
    description: "A meticulous Software Engineer crafting robust APIs, scalable databases, and intuitive frontend experiences. Merging clean MVC structures with modern React workflows.",
    resume: "/resume/Kunal_Kumar_Resume _Fullstack.pdf",
    code: `const developer = {
  name: "Kunal Kumar",
  role: "Full-Stack Engineer",
  core: ["React", "Next.js", "Node.js", "Laravel"],
  databases: ["PostgreSQL", "MongoDB", "MySQL"],
  realtime: ["WebSockets", "Supabase"],
  tools: ["Docker", "Git", "Postman"],
  mindset: "Clean code & scalable architecture"
};`
  },
  aiml: {
    title: "AI / ML Engineer",
    tagline: "Engineering Intelligent Systems",
    description: "Designing agentic AI systems, custom RAG pipelines, and high-performance vector search engines. Bridging model research and production using FastAPI, Docker, and Gemini APIs.",
    resume: "/resume/Kunal_Kumar_Resume_AIML.pdf",
    code: `const aiEngineer = {
  name: "Kunal Kumar",
  role: "AI / ML Engineer",
  models: ["Gemini API", "LangChain"],
  search: ["Custom HNSW", "FAISS"],
  embeddings: ["Sentence Transformers"],
  backend: ["FastAPI", "Pydantic", "Docker"],
  goal: "Solving business challenges with agentic AI"
};`
  },
  security: {
    title: "Cyber Security Analyst",
    tagline: "Securing Digital Assets",
    description: "A detail-oriented security practitioner experienced in vulnerability lab assessment, SIEM log analysis, system hardening, and network protocol diagnostics using Wireshark & Nmap.",
    resume: "/resume/Kunal_Kumar_Resume_CyberSecurity.pdf",
    code: `const securityAnalyst = {
  name: "Kunal Kumar",
  role: "Cyber Security Analyst",
  analysis: ["Vulnerability Scans", "Incident Analysis"],
  siem: ["Elasticsearch", "Logstash", "Kibana (ELK)"],
  tools: ["Nmap", "Burp Suite", "Wireshark", "Metasploit"],
  ctfs: ["HackTheBox", "TryHackMe"],
  certs: ["CEH v12 Training"]
};`
  },
  data: {
    title: "DevOps & Data Analyst",
    tagline: "Automating Infrastructure & Insights",
    description: "Automating CI/CD pipelines, container orchestration, and multi-host log analysis alongside building interactive business dashboards using Power BI and Pandas.",
    resume: "/resume/Kunal_Kumar_Resume_DevOps.pdf",
    code: `const devopsData = {
  name: "Kunal Kumar",
  role: "DevOps & Data Analyst",
  cicd: ["GitHub Actions", "GitLab CI", "Webhooks"],
  monitoring: ["Grafana", "Prometheus", "ELK Stack"],
  dataBI: ["Power BI", "Tableau", "Pandas", "SQL"],
  starSchema: ["KPI tracking", "Data cleaning"],
  systems: ["Linux (RHEL/Ubuntu)", "Docker Compose"]
};`
  }
};

export default function Hero({ activeMode, setActiveMode }) {
  const [activeTab, setActiveTab] = useState("code"); // code or photo
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const details = MODE_DETAILS[activeMode] || MODE_DETAILS.fullstack;

  return (
    <section id="about" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", paddingTop: "100px", paddingBottom: "60px", borderBottom: "1px solid var(--border-color)" }}>
      
      {/* Background Watermark */}
      <div style={{ 
        position: "absolute", 
        top: "50%", 
        left: "50%", 
        transform: `translate(-50%, -50%) translateY(${offsetY * 0.2}px)`, 
        fontSize: "16vw", 
        fontFamily: "var(--font-display)", 
        fontWeight: 900, 
        color: "var(--watermark-color)", 
        whiteSpace: "nowrap", 
        zIndex: 0, 
        pointerEvents: "none",
        userSelect: "none"
      }}>
        {activeMode.toUpperCase()}
      </div>

      <div className="section-container" style={{ width: "100%", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "60px", zIndex: 2 }}>
        
        {/* Left Column - Intro and Persona Toggle */}
        <div style={{ flex: "1 1 550px" }}>
          
          {/* Mode Switcher Pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "30px" }}>
            {[
              { id: "fullstack", label: "Full-Stack" },
              { id: "aiml", label: "AI / ML" },
              { id: "security", label: "Security" },
              { id: "data", label: "DevOps & Data" }
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  padding: "8px 18px",
                  borderRadius: "20px",
                  border: activeMode === mode.id ? "1.5px solid var(--accent-mode)" : "1.5px solid var(--border-color)",
                  background: activeMode === mode.id ? "var(--accent-mode-glow)" : "var(--bg-secondary)",
                  color: activeMode === mode.id ? "var(--text-primary)" : "var(--text-secondary)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: activeMode === mode.id ? "0 0 15px var(--accent-mode-glow)" : "none"
                }}
              >
                {mode.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <Motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              key={`title-${activeMode}`}
            >
              <div className="line-accent"></div>
              <h1 style={{ fontSize: "clamp(3rem, 6vw, 4.8rem)", lineHeight: 1.1, marginBottom: "10px", color: "var(--text-primary)" }}>
                Kunal Kumar
              </h1>
              <h2 className="gradient-text" style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", fontWeight: 600, marginBottom: "25px" }}>
                {details.title}
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.8, maxWidth: "520px", marginBottom: "40px", fontWeight: 300 }}>
                {details.description}
              </p>
            </Motion.div>
          </AnimatePresence>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", alignItems: "center" }}>
            <a href="#projects" className="btn-primary">
              Explore Projects <ArrowRight size={16} />
            </a>
            
            <a href="/resume/Kunal_Kumar_Resume_Developer.pdf" download="Kunal_Kumar_Resume_Developer.pdf" className="btn-secondary" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <Download size={16} /> Download CV
            </a>

            <div style={{ display: "flex", gap: "12px", marginLeft: "10px" }}>
              {[
                { icon: <Github size={20} />, href: "https://github.com/imkk21" },
                { icon: <Linkedin size={20} />, href: "https://linkedin.com/in/kunal-kumar-a7176219b" },
                { icon: <Leetcode size={20} />, href: "https://leetcode.com/u/kunalkumar2111/" },
                { icon: <Mail size={20} />, href: "mailto:kunalkumar12350@gmail.com" }
              ].map((social, idx) => (
                <a key={idx} href={social.href} target="_blank" rel="noopener noreferrer" 
                   style={{ color: "var(--text-tertiary)", transition: "all 0.3s ease", padding: "8px", borderRadius: "50%", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "center" }}
                   onMouseEnter={e => { e.currentTarget.style.color = "var(--accent-mode)"; e.currentTarget.style.borderColor = "var(--accent-mode)"; }}
                   onMouseLeave={e => { e.currentTarget.style.color = "var(--text-tertiary)"; e.currentTarget.style.borderColor = "var(--border-color)"; }}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Tabbed Code Card & Photo container */}
        <div style={{ flex: "1 1 450px", display: "flex", justifyContent: "flex-end", width: "100%" }}>
          <div style={{ 
            width: "100%", 
            maxWidth: "500px", 
            borderRadius: "12px", 
            overflow: "hidden", 
            boxShadow: "var(--card-shadow)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            background: "#0c0d12",
            position: "relative"
          }}>
            {/* Card Header with Tabs */}
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              padding: "12px 20px", 
              borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
              background: "rgba(0, 0, 0, 0.35)"
            }}>
              <div style={{ display: "flex", gap: "6px" }}>
                <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ef4444", display: "inline-block" }}></span>
                <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#eab308", display: "inline-block" }}></span>
                <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#22c55e", display: "inline-block" }}></span>
              </div>
              
              {/* Tab Selector Buttons */}
              <div style={{ display: "flex", gap: "4px", background: "rgba(0, 0, 0, 0.2)", padding: "2px", borderRadius: "6px" }}>
                <button 
                  onClick={() => setActiveTab("code")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    color: activeTab === "code" ? "#f8fafc" : "#64748b",
                    background: activeTab === "code" ? "rgba(255,255,255,0.06)" : "transparent",
                    transition: "all 0.3s ease"
                  }}
                >
                  <Code size={12} style={{ color: activeTab === "code" ? "var(--accent-mode)" : "inherit" }} /> profile.json
                </button>
                <button 
                  onClick={() => setActiveTab("photo")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    color: activeTab === "photo" ? "#f8fafc" : "#64748b",
                    background: activeTab === "photo" ? "rgba(255,255,255,0.06)" : "transparent",
                    transition: "all 0.3s ease"
                  }}
                >
                  <ImageIcon size={12} style={{ color: activeTab === "photo" ? "var(--accent-mode)" : "inherit" }} /> Photo.png
                </button>
              </div>
            </div>

            {/* Card Content with Cross-fade transition */}
            <div style={{ minHeight: "330px", position: "relative" }}>
              <AnimatePresence mode="wait">
                {activeTab === "code" ? (
                  <Motion.div
                    key={`code-${activeMode}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    style={{ 
                      padding: "24px", 
                      fontFamily: "var(--font-mono)", 
                      fontSize: "0.82rem", 
                      color: "#94a3b8", 
                      lineHeight: "1.6",
                      whiteSpace: "pre-wrap",
                      textAlign: "left"
                    }}
                  >
                    {/* JSON highlighting simulation */}
                    <div style={{ color: "#7dd3fc" }}>const <span style={{ color: "#f472b6" }}>kunal</span> = &#123;</div>
                    <div style={{ paddingLeft: "16px" }}>
                      <span style={{ color: "#38bdf8" }}>name</span>: <span style={{ color: "#a7f3d0" }}>"Kunal Kumar"</span>,
                    </div>
                    <div style={{ paddingLeft: "16px" }}>
                      <span style={{ color: "#38bdf8" }}>role</span>: <span style={{ color: "#a7f3d0" }}>"{details.title}"</span>,
                    </div>
                    
                    {activeMode === "fullstack" && (
                      <>
                        <div style={{ paddingLeft: "16px" }}>
                          <span style={{ color: "#38bdf8" }}>coreStack</span>: [<span style={{ color: "#a7f3d0" }}>"React"</span>, <span style={{ color: "#a7f3d0" }}>"Next.js"</span>, <span style={{ color: "#a7f3d0" }}>"Node"</span>, <span style={{ color: "#a7f3d0" }}>"Laravel"</span>],
                        </div>
                        <div style={{ paddingLeft: "16px" }}>
                          <span style={{ color: "#38bdf8" }}>databases</span>: [<span style={{ color: "#a7f3d0" }}>"Postgres"</span>, <span style={{ color: "#a7f3d0" }}>"MongoDB"</span>, <span style={{ color: "#a7f3d0" }}>"MySQL"</span>],
                        </div>
                        <div style={{ paddingLeft: "16px" }}>
                          <span style={{ color: "#38bdf8" }}>realtime</span>: [<span style={{ color: "#a7f3d0" }}>"WebSockets"</span>, <span style={{ color: "#a7f3d0" }}>"Supabase"</span>],
                        </div>
                      </>
                    )}

                    {activeMode === "aiml" && (
                      <>
                        <div style={{ paddingLeft: "16px" }}>
                          <span style={{ color: "#38bdf8" }}>agenticAI</span>: [<span style={{ color: "#a7f3d0" }}>"Gemini API"</span>, <span style={{ color: "#a7f3d0" }}>"LangChain"</span>],
                        </div>
                        <div style={{ paddingLeft: "16px" }}>
                          <span style={{ color: "#38bdf8" }}>vectorSearch</span>: [<span style={{ color: "#a7f3d0" }}>"Custom HNSW"</span>, <span style={{ color: "#a7f3d0" }}>"FAISS"</span>],
                        </div>
                        <div style={{ paddingLeft: "16px" }}>
                          <span style={{ color: "#38bdf8" }}>embeddings</span>: [<span style={{ color: "#a7f3d0" }}>"Sentence Transformers"</span>],
                        </div>
                      </>
                    )}

                    {activeMode === "security" && (
                      <>
                        <div style={{ paddingLeft: "16px" }}>
                          <span style={{ color: "#38bdf8" }}>vulnerabilities</span>: [<span style={{ color: "#a7f3d0" }}>"Assessment"</span>, <span style={{ color: "#a7f3d0" }}>"PenTesting"</span>],
                        </div>
                        <div style={{ paddingLeft: "16px" }}>
                          <span style={{ color: "#38bdf8" }}>siemPipeline</span>: [<span style={{ color: "#a7f3d0" }}>"Elasticsearch"</span>, <span style={{ color: "#a7f3d0" }}>"Logstash"</span>, <span style={{ color: "#a7f3d0" }}>"Kibana"</span>],
                        </div>
                        <div style={{ paddingLeft: "16px" }}>
                          <span style={{ color: "#38bdf8" }}>toolsPractice</span>: [<span style={{ color: "#a7f3d0" }}>"Nmap"</span>, <span style={{ color: "#a7f3d0" }}>"BurpSuite"</span>, <span style={{ color: "#a7f3d0" }}>"Wireshark"</span>],
                        </div>
                      </>
                    )}

                    {activeMode === "data" && (
                      <>
                        <div style={{ paddingLeft: "16px" }}>
                          <span style={{ color: "#38bdf8" }}>ci_cd</span>: [<span style={{ color: "#a7f3d0" }}>"GitHub Actions"</span>, <span style={{ color: "#a7f3d0" }}>"GitLab"</span>],
                        </div>
                        <div style={{ paddingLeft: "16px" }}>
                          <span style={{ color: "#38bdf8" }}>monitoring</span>: [<span style={{ color: "#a7f3d0" }}>"ELK Stack"</span>, <span style={{ color: "#a7f3d0" }}>"Grafana"</span>, <span style={{ color: "#a7f3d0" }}>"Prometheus"</span>],
                        </div>
                        <div style={{ paddingLeft: "16px" }}>
                          <span style={{ color: "#38bdf8" }}>dataAnalytics</span>: [<span style={{ color: "#a7f3d0" }}>"Power BI"</span>, <span style={{ color: "#a7f3d0" }}>"Tableau"</span>, <span style={{ color: "#a7f3d0" }}>"Pandas"</span>],
                        </div>
                      </>
                    )}

                    <div style={{ paddingLeft: "16px" }}>
                      <span style={{ color: "#38bdf8" }}>location</span>: <span style={{ color: "#a7f3d0" }}>"Bengaluru, India"</span>
                    </div>
                    <div style={{ color: "#7dd3fc" }}>&#125;;</div>
                  </Motion.div>
                ) : (
                  <Motion.div
                    key="photo"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ position: "relative", width: "100%", height: "350px", overflow: "hidden" }}
                  >
                    <img src={pfp} alt="Kunal Kumar" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px", background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)", color: "#fff" }}>
                      <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem" }}>Kunal Kumar</p>
                      <p style={{ fontFamily: "var(--font-sans)", color: "var(--accent-mode)", fontSize: "0.75rem", letterSpacing: "1px", textTransform: "uppercase", transition: "color 0.4s" }}>{details.tagline}</p>
                    </div>
                  </Motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Glowing active mode border line at bottom */}
            <div style={{ height: "3px", width: "100%", background: "var(--accent-mode)", transition: "all 0.4s ease", boxShadow: "0 0 10px var(--accent-mode)" }}></div>
          </div>
        </div>

      </div>
    </section>
  );
}
