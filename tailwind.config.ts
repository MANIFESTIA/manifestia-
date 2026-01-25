import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        manifest: {
          // Dark aesthetic
          background: "#050A18", // Deep dark blue/black
          surface: "#0F1629",     // Card background
          surfaceHighlight: "#1E293B",
          
          // Accents
          primary: "#FFD700",     // Gold (Star Dust)
          primaryDim: "#B8860B",
          secondary: "#9D4EDD",   // Purple (Ethereal)
          secondaryDim: "#5A189A",
          accent: "#22D3EE",      // Cyan (Energy)
          
          // Text
          text: "#F1F5F9",
          muted: "#94A3B8",
          gold: "#D4AF37",
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          'from': { readonly: '0px 0px 5px rgba(255, 215, 0, 0.2)' },
          'to': { boxShadow: '0px 0px 20px rgba(255, 215, 0, 0.6)' },
        }
      },
      backgroundImage: {
        'mystical-gradient': 'linear-gradient(to bottom, #050A18, #0F1629)',
        'star-pattern': "url('/stars.svg')", // Placeholder
      }
    },
  },
  plugins: [],
};
export default config;
