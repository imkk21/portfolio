import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" style={{ padding: "140px 0", background: "var(--bg-secondary)", position: "relative" }}>
      
      <div className="section-container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "80px" }}>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ flex: "1 1 400px" }}
        >
          <div className="line-accent"></div>
          <h2 style={{ fontSize: "clamp(3rem, 6vw, 5rem)", color: "var(--text-primary)", marginBottom: "40px" }}>
            Start a <br /><span style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>Dialogue.</span>
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", color: "var(--text-tertiary)", fontSize: "1rem", lineHeight: 1.8, maxWidth: "400px", fontWeight: 300 }}>
            Currently accepting new opportunities. Whether it's a prospective partnership, a technical consultation, or a full-scale project architecture, my inbox is open.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", gap: "40px" }}
        >
          <div>
            <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", letterSpacing: "2px", textTransform: "uppercase", color: "var(--accent-gold)", marginBottom: "16px" }}>Inquiries</h4>
            <a href="mailto:kunalkumar12350@gmail.com" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--text-primary)", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px", transition: "border-color 0.3s ease", display: "inline-block" }}
               onMouseEnter={e => e.currentTarget.style.borderColor = "var(--accent-gold)"}
               onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border-color)"}>
              kunalkumar12350@gmail.com
            </a>
          </div>
          
          <div>
            <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", letterSpacing: "2px", textTransform: "uppercase", color: "var(--accent-gold)", marginBottom: "16px" }}>Direct Line</h4>
            <a href="tel:+918619045960" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--text-primary)", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px", transition: "border-color 0.3s ease", display: "inline-block" }}
               onMouseEnter={e => e.currentTarget.style.borderColor = "var(--accent-gold)"}
               onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border-color)"}>
              +91 8619045960
            </a>
          </div>

          <div>
            <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", letterSpacing: "2px", textTransform: "uppercase", color: "var(--accent-gold)", marginBottom: "16px" }}>Operating From</h4>
            <p style={{ fontSize: "1.5rem", color: "var(--text-secondary)", fontStyle: "italic" }}>
              India
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
