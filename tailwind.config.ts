import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
    darkMode: "class",
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
        extend: {
                fontFamily: {
                        fredoka: ['var(--font-fredoka)', 'sans-serif'],
                        opensans: ['var(--font-opensans)', 'sans-serif'],
                        sans: ['var(--font-opensans)', 'sans-serif'],
                        heading: ['var(--font-fredoka)', 'sans-serif'],
                },
                colors: {
                        background: 'hsl(var(--background))',
                        foreground: 'hsl(var(--foreground))',
                        card: {
                                DEFAULT: 'hsl(var(--card))',
                                foreground: 'hsl(var(--card-foreground))'
                        },
                        popover: {
                                DEFAULT: 'hsl(var(--popover))',
                                foreground: 'hsl(var(--popover-foreground))'
                        },
                        primary: {
                                DEFAULT: 'hsl(var(--primary))',
                                foreground: 'hsl(var(--primary-foreground))'
                        },
                        secondary: {
                                DEFAULT: 'hsl(var(--secondary))',
                                foreground: 'hsl(var(--secondary-foreground))'
                        },
                        muted: {
                                DEFAULT: 'hsl(var(--muted))',
                                foreground: 'hsl(var(--muted-foreground))'
                        },
                        accent: {
                                DEFAULT: 'hsl(var(--accent))',
                                foreground: 'hsl(var(--accent-foreground))'
                        },
                        destructive: {
                                DEFAULT: 'hsl(var(--destructive))',
                                foreground: 'hsl(var(--destructive-foreground))'
                        },
                        border: 'hsl(var(--border))',
                        input: 'hsl(var(--input))',
                        ring: 'hsl(var(--ring))',
                        chart: {
                                '1': 'hsl(var(--chart-1))',
                                '2': 'hsl(var(--chart-2))',
                                '3': 'hsl(var(--chart-3))',
                                '4': 'hsl(var(--chart-4))',
                                '5': 'hsl(var(--chart-5))'
                        },
                        // Crochetti custom colors
                        terracotta: {
                                DEFAULT: '#E07A5F',
                                light: '#E89B87',
                                dark: '#C46147',
                        },
                        sage: {
                                DEFAULT: '#81B29A',
                                light: '#A3CDB8',
                                dark: '#5F9A7A',
                        },
                        mustard: {
                                DEFAULT: '#F4D35E',
                                light: '#F7DF8C',
                                dark: '#E0BA3B',
                        },
                        cream: {
                                DEFAULT: '#FDFCF0',
                                dark: '#F5F3E1',
                        },
                        brown: {
                                DEFAULT: '#3D2914',
                                light: '#5C4330',
                                dark: '#261A0C',
                        },
                        teal: {
                                DEFAULT: '#81B29A',
                        },
                        coral: {
                                DEFAULT: '#E07A5F',
                        },
                        lavender: {
                                DEFAULT: '#B8A9C9',
                        },
                        peach: {
                                DEFAULT: '#F2CC8F',
                        }
                },
                borderRadius: {
                        lg: 'var(--radius)',
                        md: 'calc(var(--radius) - 2px)',
                        sm: 'calc(var(--radius) - 4px)'
                },
                animation: {
                        'float': 'float 6s ease-in-out infinite',
                        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
                },
                keyframes: {
                        float: {
                                '0%, 100%': { transform: 'translateY(0)' },
                                '50%': { transform: 'translateY(-10px)' },
                        },
                        'pulse-soft': {
                                '0%, 100%': { opacity: '1' },
                                '50%': { opacity: '0.8' },
                        }
                }
        }
  },
  plugins: [tailwindcssAnimate],
};
export default config;
