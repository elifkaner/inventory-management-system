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
          primary: '#4F46E5', // Indigo 600 - Daha dolgun ve canlı
          primaryHover: '#4338CA', // Indigo 700
          secondary: '#8B5CF6', // Violet 500 - Lila yerine daha canlı mor
          secondaryHover: '#7C3AED', // Violet 600
          accent: '#F97316', // Orange 500 - Canlı Turuncu
          accentHover: '#EA580C', // Orange 600
          surface: '#F1F5F9', // Slate 100 - Göz yormayan, biraz daha koyu/tok arka plan
          surfaceDark: '#E2E8F0', // Slate 200
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
