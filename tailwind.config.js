/** @type {import('tailwindcss').Config} */

export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#8B4513",
          50: "#F5E6D3",
          100: "#EBCCA6",
          200: "#D6A373",
          300: "#C17A40",
          400: "#A65D2E",
          500: "#8B4513",
          600: "#6F370F",
          700: "#52290B",
          800: "#361B07",
          900: "#1A0D04",
        },
        secondary: {
          DEFAULT: "#F5F5DC",
          50: "#FEFEFE",
          100: "#FCFCF9",
          200: "#F9F9F1",
          300: "#F7F7E9",
          400: "#F6F6E1",
          500: "#F5F5DC",
          600: "#E8E8C3",
          700: "#DBDBAA",
          800: "#CECE91",
          900: "#C1C178",
        },
        accent: {
          DEFAULT: "#DAA520",
          50: "#F7F0D9",
          100: "#F0E1B3",
          200: "#E8D28C",
          300: "#E0C366",
          400: "#D9B440",
          500: "#DAA520",
          600: "#B8891A",
          700: "#966D14",
          800: "#74510E",
          900: "#523508",
        },
        text: {
          primary: "#2C1810",
          secondary: "#5D4E37",
          muted: "#8B7355",
        },
        background: {
          primary: "#FEFCF8",
          secondary: "#F8F6F0",
          muted: "#F0EDE5",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
