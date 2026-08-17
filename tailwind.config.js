/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#f7f5ef",
        "paper-deep": "#efebe1",
        ink: "#101b17",
        muted: "#6e726c",
        brand: {
          green: "#073f32",
          "green-2": "#0d5341",
          gold: "#b59b62",
          red: "#a5231d",
        },
        line: "#cbc8bd",
        "line-dark": "#99978f",
        cream: "#fffdf8",
      },
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "serif"],
        sans: ["Arial", "Helvetica", "sans-serif"],
      },
      maxWidth: {
        shell: "1280px",
      },
      keyframes: {
        "ticker-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "ticker-scroll": "ticker-scroll 28s linear infinite",
      },
    },
  },
  plugins: [],
};
