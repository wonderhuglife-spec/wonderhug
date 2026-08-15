/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        purple: {
          DEFAULT: '#79409B',
          dark: '#5C2F78',
        },
        teal: {
          DEFAULT: '#309292',
          dark: '#246E6E',
          soft: '#F0FDFA',
        },
        navy: '#2F4275',
        ink: '#1F2937',
        slate: {
          DEFAULT: '#64748B',
          muted: '#94A3B8',
        },
        line: '#E5E7EB',
        canvas: '#F8FAFA',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        page: '72rem',
        editorial: '42rem',
      },
      boxShadow: {
        lift: '0 18px 50px -28px rgba(47, 66, 117, 0.35)',
      },
      fontSize: {
        display: ['clamp(2.25rem, 5vw, 3.75rem)', { lineHeight: '1.12', letterSpacing: '-0.03em' }],
      },
    },
  },
  plugins: [],
}
