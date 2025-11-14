/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors:{
        Orange:'#f35b2a',
        primary:'#ffd900'
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* Hide scrollbar for modern browsers */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none',  /* IE and Edge */
          'scrollbar-width': 'none',  /* Firefox */
        },
        '.scrollbar-default': {
          /* Revert scrollbar to default */
          '&::-webkit-scrollbar': {
            display: 'block',
          },
          '-ms-overflow-style': 'auto',  /* IE and Edge */
          'scrollbar-width': 'auto',  /* Firefox */
        },
      });
    },
  ],
}
