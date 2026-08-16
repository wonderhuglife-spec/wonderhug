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
          DEFAULT: '#5C6570',
          muted: '#8B939E',
        },
        line: '#E7E0D8',
        canvas: '#F3EEE8',
        paper: '#FBF7F2',
        error: '#B42318',
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
        lift: '0 18px 50px -28px rgba(47, 66, 117, 0.28)',
        nav: '0 8px 30px rgba(121, 64, 155, 0.08)',
      },
      fontSize: {
        display: ['clamp(2.5rem, 6vw, 4.6rem)', { lineHeight: '1.06', letterSpacing: '-0.03em' }],
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
