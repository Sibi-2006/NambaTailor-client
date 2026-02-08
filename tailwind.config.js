/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
  extend: {
    colors: {
      primary: "#4B2E83",     // Royal Purple
      secondary: "#D4AF37",   // Gold
      accent: "#E6C85C",      // Soft Gold (hover, highlights)
      background: "#F8F6F2",  // Off-white
      surface: "#FFFFFF",    // Cards, sections
      textPrimary: "#1F1F1F", // Main text
      textMuted: "#6B6B6B",   // Sub text
    }
  }
}
,
  plugins: [],
};
