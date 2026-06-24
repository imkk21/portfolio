import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { FaGithub as Github, FaLinkedin as Linkedin } from "react-icons/fa";
import pfp from "../assets/pfp_linkedin.png";

export default function Hero() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="about" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", paddingTop: "80px", borderBottom: "1px solid var(--border-color)" }}>
      
      {/* Background Typography Watermark */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: `translate(-50%, -50%) translateY(${offsetY * 0.3}px)`, fontSize: "20vw", fontFamily: "'Outfit', sans-serif", fontWeight: 800, color: "var(--glass-bg)", whiteSpace: "nowrap", zIndex: 0, pointerEvents: "none" }}>
        ENGINEER
      </div>

      <div className="section-container" style={{ width: "100%", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "60px", zIndex: 2 }}>
        
        {/* Left Content */}
        <div style={{ flex: "1 1 500px" }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ marginBottom: "20px" }}
          >
            <div className="line-accent"></div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", letterSpacing: "3px", textTransform: "uppercase", color: "var(--accent-gold)", marginLeft: "12px" }}>Est. 2024</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            style={{ fontSize: "clamp(3.5rem, 7vw, 6rem)", lineHeight: 1.05, marginBottom: "30px", color: "var(--text-primary)" }}
          >
            Kunal<br />
            <span style={{ fontStyle: "italic", color: "var(--text-secondary)" }}>Kumar.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            style={{ fontFamily: "'Inter', sans-serif", color: "var(--text-tertiary)", fontSize: "clamp(1rem, 1.2vw, 1.1rem)", lineHeight: 1.8, maxWidth: "480px", marginBottom: "50px", fontWeight: 300 }}
          >
            A meticulous Full Stack Engineer crafting bespoke digital experiences. Merging highly scalable architecture with uncompromising, elegant design.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            style={{ display: "flex", gap: "24px", alignItems: "center" }}
          >
            <a href="#projects" style={{ display: "flex", alignItems: "center", gap: "12px", background: "var(--text-primary)", color: "var(--bg-primary)", padding: "16px 36px", fontSize: "0.9rem", letterSpacing: "1px", textTransform: "uppercase", transition: "all 0.3s ease", border: "1px solid var(--text-primary)" }}
               onMouseEnter={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-primary)"; }}
               onMouseLeave={e => { e.currentTarget.style.background = "var(--text-primary)"; e.currentTarget.style.color = "var(--bg-primary)"; }}>
              View Collection <ArrowRight size={16} />
            </a>
            
            <div style={{ display: "flex", gap: "16px" }}>
              {[
                { icon: <Github size={20} />, href: "https://github.com/imkk21" },
                { icon: <Linkedin size={20} />, href: "https://linkedin.com/in/kunal-kumar-a7176219b" },
                { icon: <Mail size={20} />, href: "mailto:kunalkumar12350@gmail.com" }
              ].map((social, idx) => (
                <a key={idx} href={social.href} target="_blank" rel="noopener noreferrer" 
                   style={{ color: "var(--text-secondary)", transition: "color 0.3s ease", padding: "8px" }}
                   onMouseEnter={e => e.currentTarget.style.color = "var(--accent-gold)"}
                   onMouseLeave={e => e.currentTarget.style.color = "var(--text-secondary)"}>
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Content - Profile Picture */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1.5, delay: 0.4 }}
          style={{ flex: "1 1 400px", display: "flex", justifyContent: "flex-end" }}
        >
          <div style={{ position: "relative", padding: "16px", border: "1px solid var(--border-color)", background: "var(--bg-secondary)" }}>
            <div style={{ overflow: "hidden", position: "relative" }}>
              <img src={pfp} alt="Kunal Kumar" className="img-luxury" style={{ width: "100%", maxWidth: "420px", display: "block", aspectRatio: "3/4", objectFit: "cover" }} />
              
              <div style={{ position: "absolute", bottom: 0, left: 0, padding: "24px", width: "100%", background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", color: "#fff", fontSize: "0.75rem", letterSpacing: "2px", textTransform: "uppercase" }}>Director of Engineering</p>
                <p style={{ fontFamily: "'Outfit', sans-serif", color: "var(--accent-gold)", fontSize: "1.2rem", fontWeight: 700 }}>Kunal Kumar</p>
              </div>
            </div>
            
            {/* Decorative corner borders */}
            <div style={{ position: "absolute", top: "-4px", left: "-4px", width: "20px", height: "20px", borderTop: "2px solid var(--accent-gold)", borderLeft: "2px solid var(--accent-gold)" }}></div>
            <div style={{ position: "absolute", bottom: "-4px", right: "-4px", width: "20px", height: "20px", borderBottom: "2px solid var(--accent-gold)", borderRight: "2px solid var(--accent-gold)" }}></div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
