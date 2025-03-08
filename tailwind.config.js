/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:'class',
  content: [ "./src/**/*.{html,ts}" , ],
  theme: {
    extend: {},
    container:{center:true},
  },
  plugins: [ require('flowbite/plugin') ],
}

