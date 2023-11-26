/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'redient': 'rgba(236, 236, 236, .3)',
        'redient2': 'rgba(81, 88, 146, .3)',
        'primary': '#32375C',
        'dark': '#222222',
        'dark80': '#4E4E4E',
        'dark60': '#7A7A7A',
        'strok': '#D3D3D3',
      },
      fontFamily: {
        'inter': ['Inter'],
        
      }
    },
  },
  plugins: [],
}

