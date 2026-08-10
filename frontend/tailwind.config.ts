import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        brand: {
          primary: '#5C6BC0', // Koyu Mavi
          primaryHover: '#3F51B5',
          secondary: '#B39DDB', // Lila
          secondaryHover: '#9575CD',
          accent: '#F57C00', // Turuncu
          accentHover: '#EF6C00',
          surface: '#F4F5F9',
          surfaceDark: '#E8EAF1',
        },
        blue: {
          400: '#2589FE',
          500: '#0070F3',
          600: '#2F6FEB',
        },
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
