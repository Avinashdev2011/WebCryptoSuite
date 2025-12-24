/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{html,js}"
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace']
      },
      colors: {
        cyber: {
          dark: '#050505',
          panel: '#11111b',
          border: '#2a2a35',
          cyan: '#00f0ff',
          green: '#0aff0a',
          red: '#ff2a2a',
          purple: '#bd00ff',
          orange: '#ff9d00',
          pink: '#ff0099',
          gray: '#8899ac'
        }
      }
    },
  },
  plugins: [],
}