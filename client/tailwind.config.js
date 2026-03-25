/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Manrope"', 'sans-serif'],
      },
      colors: {
        surface: 'rgb(var(--surface) / <alpha-value>)',
        elevated: 'rgb(var(--elevated) / <alpha-value>)',
        outline: 'rgb(var(--outline) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        secondary: 'rgb(var(--secondary) / <alpha-value>)',
        highlight: 'rgb(var(--highlight) / <alpha-value>)',
      },
      boxShadow: {
        halo: '0 20px 80px rgba(14, 165, 233, 0.18)',
        premium: '0 24px 80px rgba(15, 23, 42, 0.22)',
        insetGlow: 'inset 0 1px 0 rgba(255,255,255,0.22)',
      },
      backgroundImage: {
        'mesh-gradient':
          'radial-gradient(circle at 20% 20%, rgba(14,165,233,0.22), transparent 32%), radial-gradient(circle at 80% 10%, rgba(245,158,11,0.16), transparent 28%), radial-gradient(circle at 70% 70%, rgba(16,185,129,0.16), transparent 32%), linear-gradient(135deg, rgba(15,23,42,0.94), rgba(2,6,23,0.98))',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -16px, 0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.45', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.08)' },
        },
        sweep: {
          '0%': { transform: 'translateX(-140%) rotate(12deg)' },
          '100%': { transform: 'translateX(140%) rotate(12deg)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(20px, -28px, 0)' },
        },
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        pulseSoft: 'pulseSoft 10s ease-in-out infinite',
        sweep: 'sweep 1.4s ease-out forwards',
        drift: 'drift 14s ease-in-out infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

