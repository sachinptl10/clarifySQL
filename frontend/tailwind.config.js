/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ground: '#EFE9DD',
        'ground-2': '#E5DED0',
        ink: '#141C2B',
        'ink-2': '#4A5364',
        muted: '#767E8C',
        'ink-blue': '#2C4A8F',
        hairline: 'rgba(20,28,43,.16)',
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        mono: ['Courier Prime', 'Courier New', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.02em',
        loosemono: '0.08em',
      },
    },
  },
  plugins: [],
}
