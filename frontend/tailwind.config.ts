import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-purple': '#7C3AED',
        'brand-pink': '#EC4899',
        'brand-coral': '#F97316',
        'dark-bg': '#0F0F1E',
        'dark-card': '#1A1A2E',
        'dark-border': '#2D2D44',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #7C3AED 0%, #EC4899 50%, #F97316 100%)',
        'gradient-brand-reverse': 'linear-gradient(-135deg, #7C3AED 0%, #EC4899 50%, #F97316 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1A1A2E 0%, #2D2D44 100%)',
      },
      boxShadow: {
        'glow-purple': '0 0 30px rgba(124, 58, 237, 0.3)',
        'glow-pink': '0 0 30px rgba(236, 72, 153, 0.3)',
        'elevated': '0 10px 40px rgba(0, 0, 0, 0.3)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(124, 58, 237, 0.6)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
