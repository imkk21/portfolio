import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = ["About", "Skills", "Projects", "Contact"];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          padding: "20px 0",
          transition: "all 0.5s ease",
          background: scrolled ? "var(--bg-primary)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border-color)" : "1px solid transparent",
        }}
      >
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "var(--text-primary)" }}>K.</span>
          </div>

          {/* Desktop Links */}
          <div style={{ display: "flex", gap: "40px", alignItems: "center" }} className="desktop-nav">
            <style>{`@media (max-width: 768px) { .desktop-nav { display: none !important; } }`}</style>
            {links.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "var(--text-secondary)", transition: "color 0.3s" }}
                onMouseEnter={e => e.target.style.color = "var(--accent-gold)"}
                onMouseLeave={e => e.target.style.color = "var(--text-secondary)"}
              >
                {link}
              </a>
            ))}
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>

          {/* Mobile Menu Toggle */}
          <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", letterSpacing: "2px", textTransform: "uppercase", background: "none", border: "none", color: "var(--text-primary)", cursor: "pointer", display: "none" }}>
            <style>{`@media (max-width: 768px) { .mobile-toggle { display: block !important; } }`}</style>
            {menuOpen ? "CLOSE" : "MENU"}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ position: "fixed", top: 80, left: 0, right: 0, background: "var(--bg-primary)", borderBottom: "1px solid var(--border-color)", padding: "40px", zIndex: 998, display: "flex", flexDirection: "column", gap: "30px", alignItems: "center" }}
          >
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            {links.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)} style={{ fontFamily: "'Outfit', sans-serif", fontSize: "2rem", fontWeight: 700, color: "var(--text-primary)" }}>
                {link}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
