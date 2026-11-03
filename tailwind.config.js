/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F7F5F0',
        paper: '#FCFBF8',
        ink: {
          DEFAULT: '#191817',
          soft: '#4A4541',
          muted: '#7A726C',
        },
        burgundy: {
          DEFAULT: '#743D47',
          deep: '#5A2E37',
          wash: '#F1E3E5',
        },
        saffron: {
          DEFAULT: '#E7B83F',
          deep: '#B8891E',
          wash: '#FAF0D2',
        },
        terracotta: {
          DEFAULT: '#D8754F',
          deep: '#A9552F',
          wash: '#F8E4DB',
        },
        violet: {
          DEFAULT: '#8873A2',
          deep: '#67527D',
          wash: '#ECE7F2',
        },
        botanical: {
          DEFAULT: '#637A57',
          deep: '#475B3E',
          wash: '#E6ECE0',
        },
      },
      fontFamily: {
        display: ['Alexandria', 'sans-serif'],
        body: ['"IBM Plex Sans Arabic"', 'sans-serif'],
        letter: ['Amiri', 'serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'sway': {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'sway-wide': {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
        'hair': {
          '0%, 100%': { transform: 'skewX(0deg)' },
          '50%': { transform: 'skewX(-1.2deg)' },
        },
        'petal-drift': {
          '0%': { transform: 'translate3d(0, -10vh, 0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.85' },
          '100%': { transform: 'translate3d(var(--drift, 40px), 110vh, 0) rotate(540deg)', opacity: '0' },
        },
        'bloom': {
          '0%': { transform: 'scale(0.2) rotate(-25deg)', opacity: '0' },
          '60%': { opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        'burst': {
          '0%': { transform: 'translate(0,0) scale(0.4) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translate(var(--tx), var(--ty)) scale(1) rotate(200deg)', opacity: '0' },
        },
        'breathe': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        },
        'bar': {
          '0%, 100%': { transform: 'scaleY(0.3)' },
          '50%': { transform: 'scaleY(1)' },
        },
        'shimmer': {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '1' },
        },
        'caret': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 1.1s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 1.4s ease both',
        'sway': 'sway 7s ease-in-out infinite',
        'sway-wide': 'sway-wide 9s ease-in-out infinite',
        'hair': 'hair 8s ease-in-out infinite',
        'petal-drift': 'petal-drift 18s linear infinite',
        'bloom': 'bloom 1.2s cubic-bezier(0.22, 1, 0.36, 1) both',
        'burst': 'burst 1.4s ease-out forwards',
        'breathe': 'breathe 6s ease-in-out infinite',
        'bar': 'bar 1s ease-in-out infinite',
        'shimmer': 'shimmer 3.2s ease-in-out infinite',
        'caret': 'caret 1s steps(1) infinite',
      },
    },
  },
  plugins: [],
};
