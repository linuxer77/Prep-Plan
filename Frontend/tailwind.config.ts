import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Bahnschrift",
          "DIN Alternate",
          "Arial Narrow",
          "Segoe UI",
          "sans-serif",
        ],
        display: [
          "Bahnschrift",
          "DIN Alternate",
          "Arial Narrow",
          "Segoe UI",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
