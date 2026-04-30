import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#506077",       // Primární ocelová modrá
          green: "#26d07c",      // Akcent zelená
          "light-blue": "#74d1ea",
          orange: "#f2a900",
          yellow: "#ffd700",
        },
        background: "#ffffff",
        foreground: "#1a1a1a",
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"],
        eurostile: ["Eurostile", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
