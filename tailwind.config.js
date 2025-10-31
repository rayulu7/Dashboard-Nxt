/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Poppins',  'sans-serif'],
      },
      colors: {
        'dark-blue': '#111C44',
        'card-bg': '#1B254B',
        'purple-accent': '#7551FF',
        'light-blue': '#3BA1FF',
        
        'light-bg': '#F7F9FC',
        'light-card': '#FFFFFF',
        'light-text': '#1A202C',
        'light-secondary': '#718096',
        'light-border': '#E2E8F0',
      },
    },
  },
  plugins: [],
}

