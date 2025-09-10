/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary-teal': '#007F79',
        'primary-white': '#FFFFFF',
        'deep-teal': '#164356',
        
        // Teal Family
        'teal-light': '#B3FAED',
        'teal-dark': '#00B8AE',
        
        // Marigold Family
        'marigold-light': '#FFE7AA',
        'marigold': '#FFC52E',
        
        // Blue Family
        'blue-light': '#A4C0FF',
        'blue-custom': '#6492F9',
        
        // Poppy Family
        'poppy-light': '#FFDCBB',
        'poppy': '#FFA24C',
      }
    },
  },
  plugins: [],
};
