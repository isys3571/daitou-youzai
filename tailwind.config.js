/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,njk}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e2d4a',
        accent:  '#b85c2a',
        cream:   '#f7f5f2',
        body:    '#333333',
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
          lg:   '1120px',
          xl:   '1120px',
          '2xl':'1120px',
        },
      },
    }
  },
  plugins: [],
}
