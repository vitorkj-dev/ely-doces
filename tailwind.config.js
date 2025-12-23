/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        display: ['Prata', 'serif'],
      },
      colors: {
        brand: {
          gold: '#D4AF37',   // Ouro Metálico
          black: '#1A1A1A',  // Preto Premium (não é #000 absoluto)
          cream: '#F9F5F0',  // Creme Suave
          accent: '#E63946', // Vermelho Paixão (para botões)
        }
      }
    },
  },
  plugins: [],
}