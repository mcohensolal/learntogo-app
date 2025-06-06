import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'space-grotesk': ['Space Grotesk', 'Satoshi', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        'inter': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        'dark-bg': '#0E0E10',
        'dark-bg-secondary': '#101113',
        'dark-bg-tertiary': '#1C1C1E',
        'neon-blue': '#5A8EFF',
        'neon-green': '#00FFC2',
        'glass': 'rgba(255, 255, 255, 0.05)',
        'glass-border': 'rgba(255, 255, 255, 0.1)',
        'text-primary': '#FFFFFF',
        'text-secondary': 'rgba(255, 255, 255, 0.6)',
        'text-tertiary': 'rgba(255, 255, 255, 0.4)',
      },
      height: {
        '128': '32rem',
      },
      backdropBlur: {
        'xs': '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-dark': 'linear-gradient(135deg, #0E0E10 0%, #101113 50%, #1C1C1E 100%)',
        'gradient-neon': 'linear-gradient(135deg, #5A8EFF 0%, #00FFC2 100%)',
        'gradient-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulse: "pulse 2s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        'fade-in': "fadeIn 0.8s ease-out",
        'slide-up': "slideUp 0.8s ease-out",
        'slide-in-left': "slideInLeft 0.8s ease-out",
        'slide-in-right': "slideInRight 0.8s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(90, 142, 255, 0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(90, 142, 255, 0.6)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(90, 142, 255, 0.3)',
        'glow-green': '0 0 20px rgba(0, 255, 194, 0.3)',
        'glass': '0 8px 32px rgba(31, 38, 135, 0.37)',
        'neon': '0 0 10px rgba(90, 142, 255, 0.5), 0 0 20px rgba(90, 142, 255, 0.3), 0 0 30px rgba(90, 142, 255, 0.1)',
      },
    },
  },
  plugins: [],
};

export default config;
