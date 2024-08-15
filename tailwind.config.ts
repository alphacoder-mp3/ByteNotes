import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  safelist: [
    'bg-white',
    'bg-zinc-700',
    'bg-slate-700',
    'bg-neutral-700',
    'bg-gray-700',
    'bg-stone-700',
    'bg-yellow-700',
    'bg-orange-700',
    'bg-violet-700',
    'bg-blue-700',
    'bg-sky-700',
    'bg-indigo-700',
    'bg-fuchsia-700',
    'bg-pink-700',
    'bg-rose-700',
    'bg-purple-700',
    'bg-cyan-700',
    'bg-teal-700',
    'bg-emerald-700',
    'bg-lime-700',
    'bg-green-700',
    'bg-amber-700',
    'bg-zinc-200',
    'bg-slate-200',
    'bg-neutral-200',
    'bg-gray-200',
    'bg-stone-200',
    'bg-yellow-200',
    'bg-orange-200',
    'bg-violet-200',
    'bg-blue-200',
    'bg-sky-200',
    'bg-indigo-200',
    'bg-fuchsia-200',
    'bg-pink-200',
    'bg-rose-200',
    'bg-purple-200',
    'bg-cyan-200',
    'bg-teal-200',
    'bg-emerald-200',
    'bg-lime-200',
    'bg-green-200',
    'bg-amber-200',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
