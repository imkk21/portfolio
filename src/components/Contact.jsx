import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function Contact({ activeMode }) {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formState.name,
          email: formState.email,
          message: formState.message,
          subject: `Portfolio Inquiry from ${formState.name}`,
          from_name: "Developer Portfolio Form"
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSent(true);
        setFormState({ name: "", email: "", message: "" });
        // Reset sent status after 5s
        setTimeout(() => setIsSent(false), 5000);
      } else {
        alert(`Error: ${result.message || "Failed to send message. Please verify your access key."}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit form. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <section id="contact" style={{ padding: "120px 0", background: "var(--bg-primary)", position: "relative" }}>
      
      <div className="section-container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "60px" }}>
        
        {/* Left Column - Contact Form */}
        <div style={{ flex: "1 1 500px" }}>
          <div className="line-accent"></div>
          <h2 style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", color: "var(--text-primary)", fontWeight: 800, marginBottom: "20px" }}>
            Start a <br /><span style={{ color: "var(--accent-mode)", fontStyle: "italic", transition: "color 0.4s ease" }}>Dialogue.</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "40px", maxWidth: "450px", fontWeight: 300 }}>
            Currently open to full-time roles, collaborative projects, and technical advisories. Drop a message below and let's build something remarkable.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "500px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label htmlFor="name" style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-secondary)", fontWeight: 600 }}>Your Name</label>
              <input 
                id="name"
                type="text" 
                required
                value={formState.name}
                onChange={e => setFormState({ ...formState, name: e.target.value })}
                style={{ 
                  padding: "14px 18px", 
                  background: "rgba(255, 255, 255, 0.02)", 
                  border: "1px solid var(--border-light)", 
                  borderRadius: "6px", 
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-sans)",
                  outline: "none",
                  transition: "all 0.3s ease"
                }}
                onFocus={e => { e.target.style.borderColor = accentColor; e.target.style.boxShadow = `0 0 10px ${accentColor}33`; }}
                onBlur={e => { e.target.style.borderColor = "var(--border-light)"; e.target.style.boxShadow = "none"; }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label htmlFor="email" style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-secondary)", fontWeight: 600 }}>Email Address</label>
              <input 
                id="email"
                type="email" 
                required
                value={formState.email}
                onChange={e => setFormState({ ...formState, email: e.target.value })}
                style={{ 
                  padding: "14px 18px", 
                  background: "rgba(255, 255, 255, 0.02)", 
                  border: "1px solid var(--border-light)", 
                  borderRadius: "6px", 
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-sans)",
                  outline: "none",
                  transition: "all 0.3s ease"
                }}
                onFocus={e => { e.target.style.borderColor = accentColor; e.target.style.boxShadow = `0 0 10px ${accentColor}33`; }}
                onBlur={e => { e.target.style.borderColor = "var(--border-light)"; e.target.style.boxShadow = "none"; }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label htmlFor="message" style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-secondary)", fontWeight: 600 }}>Message</label>
              <textarea 
                id="message"
                rows="5"
                required
                value={formState.message}
                onChange={e => setFormState({ ...formState, message: e.target.value })}
                style={{ 
                  padding: "14px 18px", 
                  background: "rgba(255, 255, 255, 0.02)", 
                  border: "1px solid var(--border-light)", 
                  borderRadius: "6px", 
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-sans)",
                  outline: "none",
                  resize: "none",
                  transition: "all 0.3s ease"
                }}
                onFocus={e => { e.target.style.borderColor = accentColor; e.target.style.boxShadow = `0 0 10px ${accentColor}33`; }}
                onBlur={e => { e.target.style.borderColor = "var(--border-light)"; e.target.style.boxShadow = "none"; }}
              />
            </div>

            <button 
              type="submit" 
              className="btn-primary" 
              disabled={isSubmitting || isSent}
              style={{ 
                alignSelf: "flex-start", 
                justifyContent: "center",
                minWidth: "160px",
                background: isSent ? "var(--accent-green)" : accentColor,
                borderColor: isSent ? "var(--accent-green)" : accentColor,
                cursor: isSubmitting || isSent ? "not-allowed" : "pointer"
              }}
            >
              {isSubmitting ? (
                <span>Sending...</span>
              ) : isSent ? (
                <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}><CheckCircle size={16} /> Sent!</span>
              ) : (
                <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>Send Message <Send size={16} /></span>
              )}
            </button>
          </form>
        </div>

        {/* Right Column - Info Cards */}
        <div style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", gap: "40px", justifyContent: "center" }}>
          <div>
            <h4 style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", letterSpacing: "2px", textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: "12px" }}>Inquiries</h4>
            <a href="mailto:kunalkumar12350@gmail.com" style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", color: "var(--text-primary)", borderBottom: "1px solid var(--border-color)", paddingBottom: "6px", display: "inline-block" }}
               onMouseEnter={e => e.currentTarget.style.borderColor = "var(--accent-mode)"}
               onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border-color)"}>
              kunalkumar12350@gmail.com
            </a>
          </div>
          
          <div>
            <h4 style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", letterSpacing: "2px", textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: "12px" }}>Direct Connection</h4>
            <a href="tel:+918619045960" style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", color: "var(--text-primary)", borderBottom: "1px solid var(--border-color)", paddingBottom: "6px", display: "inline-block" }}
               onMouseEnter={e => e.currentTarget.style.borderColor = "var(--accent-mode)"}
               onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border-color)"}>
              +91 8619045960
            </a>
          </div>

          <div>
            <h4 style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", letterSpacing: "2px", textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: "12px" }}>Based In</h4>
            <p style={{ fontSize: "1.4rem", color: "var(--text-secondary)", fontWeight: 300 }}>
              Bengaluru, Karnataka, India
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
