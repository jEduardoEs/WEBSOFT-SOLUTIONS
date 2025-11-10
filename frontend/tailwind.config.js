/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0F4C81',
        secondary: '#F2994A',
        accent: '#16C79A',
        surface: '#F7FAFC',
        body: '#1A202C',
        muted: '#718096'
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui'],
        serif: ['Roboto Slab', 'ui-serif', 'Georgia']
      },
      boxShadow: {
        card: '0 10px 25px -15px rgba(15, 76, 129, 0.45)'
      }
    }
  },
  plugins: [],
};
