import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      style={{
        background: "transparent",
        border: "1px solid var(--border-color)",
        color: "var(--text-primary)",
        padding: "8px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "background 0.3s, color 0.3s",
      }}
      onMouseEnter={e => e.currentTarget.style.background = "var(--bg-secondary)"}
      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
      aria-label="Toggle Theme"
    >
      {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
