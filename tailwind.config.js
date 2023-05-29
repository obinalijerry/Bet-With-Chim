/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      fontFamily:{
        'title':['Lato', 'sans-serif'],
        'body':['Sansita', 'sans-serif']
      },
      colors:{
        'pri':'#081F4D'
      }
    },
  },
  plugins: [require("daisyui")]
};




