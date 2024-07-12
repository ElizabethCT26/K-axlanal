/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#022F40",
        secondaryColor: "#40556D",
        accents: "#341CA7",
        prices: "#2374AB",
        cardBottom: "#F5F5F5",
        cardBg: "#D9D9D9",
        darkPrimary: "#001A24",
        darkSecondary: "#1B242E",
        darkAccents: "#126477",
        darkPrices: "#0D95F1",
        darkCardBottom: "#3E3E3E",
        darkCardBg: "#2E2E2E"
      },
      keyframes: {
        pulseLight: {
          '0%, 100%': { opacity: 1, backgroundColor: '#F5F5F5' }, // Color inicial
          '50%': { opacity: 1, backgroundColor: '#C1C1C1' }, // Color en el punto medio de la animación
        },
        pulseDarker: {
          '0%, 100%': { opacity: 1, backgroundColor: '#F5F5F5' }, // Color inicial
          '50%': { opacity: 1, backgroundColor: '#C1C1C1' }, // Color en el punto medio de la animación
        }
      },
      animation: {
        pulseLight: 'pulseLight 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        pulseDarker: 'pulseDarker 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}

