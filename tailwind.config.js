/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,njk}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2c3e50',
        accent:  '#1976d2',
        cream:   '#f7f8f9',
        dark:    '#1a2633',
        strong:  '#333333',
        body:    '#555555',
        muted:   '#888888',
        faint:   '#b3b3b3',
      },
      fontFamily: {
        display: ['"Shippori Mincho B1"', 'serif'],
        sans:    ['"Zen Kaku Gothic New"', 'sans-serif'],
        en:      ['Barlow', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '1.5rem',
        screens: {
          lg:   '1280px',
          xl:   '1280px',
          '2xl':'1280px',
        },
      },
    }
  },
  plugins: [],
}
