import { useEffect, useState } from "react";

const KEY = "theme";
const read = () => {
  try { return localStorage.getItem(KEY) || "light"; } catch { return "light"; }
};

// Single source of truth for the palette; components re-read CSS vars when this flips.
export function useTheme() {
  const [theme, setTheme] = useState(read);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem(KEY, theme); } catch { /* private mode */ }
  }, [theme]);

  return [theme, () => setTheme((t) => (t === "dark" ? "light" : "dark"))];
}

export const cssVar = (name, fallback) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

// Relative luminance of a #rrggbb colour.
const lum = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255;
};

// A brand colour that would vanish against the current background, nudged back into view.
export function readableHex(hex) {
  const dark = document.documentElement.getAttribute("data-theme") === "dark";
  const l = lum(hex);
  if (!dark && l > 0.82) return "#101013";
  if (dark && l < 0.12) return "#f2f2f4";
  return hex;
}
