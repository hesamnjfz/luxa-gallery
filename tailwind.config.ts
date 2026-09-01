import type { Config } from "tailwindcss";

/**
 * LuxeDrive design tokens — soft white + gray luxury palette.
 * No gold. Spacing: 8px base grid (even Tailwind keys).
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#F6F6F5",
        surface: "#FFFFFF",
        mist: "#ECECEB",
        line: "#E0E0DE",
        soft: "#5C5C5A",
        muted: "#3F3F3D",
        ink: "#111111",
        deep: "#0A0A0A",
      },
      fontFamily: {
        display: [
          "var(--font-playfair)",
          "Playfair Display",
          "Georgia",
          "serif",
        ],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        persian: [
          "var(--font-vazirmatn)",
          "var(--font-inter)",
          "Inter",
          "sans-serif",
        ],
      },
      fontSize: {
        label: [
          "0.6875rem",
          { lineHeight: "1.2", letterSpacing: "0.15em" },
        ],
        xs: ["0.75rem", { lineHeight: "1.5" }],
        sm: ["0.875rem", { lineHeight: "1.6" }],
        base: ["1rem", { lineHeight: "1.7" }],
        lg: ["1.125rem", { lineHeight: "1.7" }],
        xl: ["1.5rem", { lineHeight: "1.4" }],
        "2xl": ["2rem", { lineHeight: "1.25" }],
        "3xl": ["2.5rem", { lineHeight: "1.15" }],
        "4xl": ["3rem", { lineHeight: "1.1" }],
        "5xl": [
          "3.5rem",
          { lineHeight: "1.05", letterSpacing: "-0.02em" },
        ],
        "6xl": [
          "4.5rem",
          { lineHeight: "1.04", letterSpacing: "-0.025em" },
        ],
        "7xl": [
          "6rem",
          { lineHeight: "1.02", letterSpacing: "-0.03em" },
        ],
        "display-sm": [
          "3.5rem",
          { lineHeight: "1.05", letterSpacing: "-0.02em" },
        ],
        "display-md": [
          "4.5rem",
          { lineHeight: "1.04", letterSpacing: "-0.025em" },
        ],
        "display-lg": [
          "6rem",
          { lineHeight: "1.02", letterSpacing: "-0.03em" },
        ],
      },
      letterSpacing: {
        label: "0.15em",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
        section: "8rem",
        "section-lg": "10rem",
      },
      maxWidth: {
        container: "90rem",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        hover: "250ms",
        reveal: "650ms",
      },
    },
  },
};

export default config;
