import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0052CC',
          light: '#EBF3FF',
          dark: '#0A1628',
        },
        success: {
          DEFAULT: '#2E7D32',
          light: '#E8F5E9',
        },
        warning: {
          DEFAULT: '#F57C00',
          light: '#FFF8E7',
        },
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E0E0E0',
          700: '#424242',
        },
      },
    },
  },
  plugins: [],
}

export default config
