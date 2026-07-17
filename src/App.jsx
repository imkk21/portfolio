import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });
  const [activeMode, setActiveMode] = useState("fullstack"); // modes: fullstack, aiml, security, data

  // Sync theme with HTML attribute
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Update root container class based on active mode
  useEffect(() => {
    const root = document.documentElement;
    // Remove previous mode classes
    root.classList.remove("mode-fullstack", "mode-aiml", "mode-security", "mode-data");
    // Add current active mode class
    root.classList.add(`mode-${activeMode}`);
  }, [activeMode]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <>
      <CustomCursor />
      <Navbar theme={theme} toggleTheme={toggleTheme} activeMode={activeMode} />
      <main>
        <Hero activeMode={activeMode} setActiveMode={setActiveMode} />
        <Skills activeMode={activeMode} />
        <Projects activeMode={activeMode} />
        <Contact activeMode={activeMode} />
      </main>
      <Footer activeMode={activeMode} />
    </>
  );
}
