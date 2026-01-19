/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // 'sans' agora é Poppins (Texto geral)
        sans: ['Poppins', 'sans-serif'],
        // 'display' agora é Unbounded (Títulos)
        display: ['Unbounded', 'sans-serif'],
      },
      colors: {
        brand: {
          gold: '#D4AF37',
          black: '#1A1A1A',
          cream: '#F9F5F0',
          pink: '#F2D4D7',
        }
      },
      boxShadow: {
        'top-lg': '0 -10px 25px -5px rgb(0 0 0 / 0.1), 0 -4px 10px -6px rgb(0 0 0 / 0.1)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}