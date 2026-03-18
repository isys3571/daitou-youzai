/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,njk}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1d4ed8',
        accent:  '#3b82f6',
        cream:   '#f0f4ff',
        body:    '#374151',
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
