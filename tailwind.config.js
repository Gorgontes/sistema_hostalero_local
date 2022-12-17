/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: ['./src/index.html', './src/**/*.{vue,js,ts ,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'oscuro': '#121e26',
        'primario': '#43718f',
        'morado': '#85408B',
        'verde': '#33AC74',
        'rojo': '#B11810',
        'naranja': '#F49215',
        'background_main': '#F3F3F3',

        'rojo_suave': '#E94444',
        'amarillo_suave': '#FFCF23',
      }
    },
  },
  variants: {
    extend: {},
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui']
    },
  },
  plugins: [],
  safelist: ['border-morado', 'bg-morado']
}
