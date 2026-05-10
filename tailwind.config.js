/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream:   '#FAFAF7',
        parchment: '#F5F0E8',
        brown: {
          50:  '#FAF6F0',
          100: '#F0E8D8',
          200: '#DFC9A8',
          300: '#C9A87C',
          400: '#B08850',
          500: '#8B6635',
          600: '#6E4E22',
          700: '#53381A',
          800: '#3A2710',
          900: '#231608',
        },
        ink:   '#1A1410',
        muted: '#6B5E52',
        faint: '#9C8E84',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans:    ['"DM Sans"', 'sans-serif'],
        mono:    ['"DM Mono"', 'monospace'],
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.7s ease forwards',
      },
    },
  },
  plugins: [],
}
