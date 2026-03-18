/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,njk}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2c3e50',
        accent:  '#0ea5e9',
        cream:   '#f5f5f5',
        body:    '#555555',
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
