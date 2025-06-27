import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#FF6600",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        orange: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#FF6600",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(255, 102, 0, 0.4)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(255, 102, 0, 0.8), 0 0 60px rgba(255, 102, 0, 0.4)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-25px)" },
        },
        "rotate-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        bounce: {
          "0%, 100%": {
            transform: "translateY(-25%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "none",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "slide-in": {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        shimmer: {
          "0%": {
            backgroundPosition: "-200px 0",
          },
          "100%": {
            backgroundPosition: "calc(200px + 100%) 0",
          },
        },
        "data-flow": {
          "0%": {
            left: "-100%",
          },
          "100%": {
            left: "100%",
          },
        },
        "counter-up": {
          "0%": {
            transform: "translateY(20px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        float: "float 8s ease-in-out infinite",
        "rotate-slow": "rotate-slow 30s linear infinite",
        "gradient-shift": "gradient-shift 4s ease-in-out infinite",
        bounce: "bounce 1s infinite",
        "fade-in": "fade-in 0.8s ease-out",
        "slide-in": "slide-in 0.5s ease-out",
        shimmer: "shimmer 2s infinite",
        "data-flow": "data-flow 3s infinite",
        "counter-up": "counter-up 0.6s ease-out",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "neural-pattern":
          "radial-gradient(circle at 20% 50%, rgba(255, 102, 0, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 102, 0, 0.1) 0%, transparent 50%)",
        "hero-gradient": "radial-gradient(ellipse at top, rgba(255, 102, 0, 0.1) 0%, black 50%)",
        "card-gradient": "linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "glow-orange": "0 0 30px rgba(255, 102, 0, 0.5)",
        "glow-green": "0 0 30px rgba(16, 185, 129, 0.5)",
        "glow-blue": "0 0 30px rgba(59, 130, 246, 0.5)",
        premium: "0 0 0 1px rgba(255, 102, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.3), 0 16px 32px rgba(0, 0, 0, 0.2)",
        "card-hover": "0 25px 50px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 102, 0, 0.2)",
        "button-hover": "0 15px 30px rgba(255, 102, 0, 0.4)",
      },
      fontSize: {
        "2xs": "0.625rem",
        "3xl": "2rem",
        "4xl": "2.5rem",
        "5xl": "3rem",
        "6xl": "4rem",
        "7xl": "5rem",
        "8xl": "6rem",
        "9xl": "8rem",
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },
      zIndex: {
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
