/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1677ff',
        secondary: '#52c41a',
        warning: '#faad14',
        danger: '#ff4d4f',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
