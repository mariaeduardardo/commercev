/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Azul Exato da Logomarca Oficial Commerce Visual
          main: '#0241ff',      // Azul oficial da identidade visual
          deep: '#0036d6',      // Azul royal profundo
          darkest: '#002187',   // Azul safira corporativo
          light: '#245fff',
          sky: '#5786ff',
          cyan: '#99b8ff',
          surface: 'rgba(255, 255, 255, 0.10)',
          card: 'rgba(255, 255, 255, 0.08)',
          cardHover: 'rgba(255, 255, 255, 0.14)',
          border: 'rgba(255, 255, 255, 0.22)',
          borderGlow: 'rgba(255, 255, 255, 0.50)',
          whatsapp: '#25d366',
          whatsappHover: '#20bd5a',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'sans-serif'],
        display: ['Fredoka', 'Montserrat', 'system-ui', 'sans-serif'],
        condensed: ['"Roboto Condensed"', '"Arial Narrow"', 'Montserrat', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-white': '0 0 35px -5px rgba(255, 255, 255, 0.35)',
        'glow-royal': '0 10px 40px -10px rgba(0, 64, 255, 0.6)',
        'glow-whatsapp': '0 0 25px -3px rgba(37, 211, 102, 0.5)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'hero-rise': 'hero-rise 700ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'hero-panel': 'hero-panel 900ms cubic-bezier(0.16, 1, 0.3, 1) 120ms both',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'hero-rise': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'hero-panel': {
          '0%': { opacity: '0', transform: 'translate3d(24px, 18px, 0) scale(0.97)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0) scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
