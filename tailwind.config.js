/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#000000",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#ffffff",
          foreground: "#000000",
        },
        muted: {
          DEFAULT: "#f4f4f5", // zinc-100
          foreground: "#71717a", // zinc-500
        },
        accent: {
          DEFAULT: "#f4f4f5",
          foreground: "#18181b", // zinc-900
        },
        border: "#e4e4e7", // zinc-200
      },
      fontFamily: {
        sans: ["var(--font-vazirmatn)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
