/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7E1891',  // Our primary color
          800: '#6b21a8',
          900: '#581c87'
        },
        background: {
          light: '#f9fafb',
          DEFAULT: '#FFFFFF',
          dark: '#0D0C0D'
        },
        card: {
          light: '#ffffff',
          DEFAULT: '#F8F8F8',
          dark: '#181818'
        },
        text: {
          DEFAULT: '#000000',
          secondary: '#4b5563',
          dark: '#ffffff',
          darkSecondary: '#aaaaac'
        },
        border: {
          light: '#e5e7eb',
          dark: '#2d2d2d'
        },
        accent: {
          purple: '#8B349A',
          blue: '#3b82f6',
          green: '#10b981',
          red: '#ef4444',
          yellow: '#f59e0b'
        },
        muted: {
          DEFAULT: '#dadbdd',
          dark: '#434343'
        },
        label: {
          DEFAULT: '#919293',
          dark: '#aaaaac'
        }
      },
      boxShadow: {
        'soft': '0 2px 15px 0 rgba(0, 0, 0, 0.05)',
        'soft-dark': '0 2px 15px 0 rgba(0, 0, 0, 0.2)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'card-dark': '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px -1px rgba(0, 0, 0, 0.3)'
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem'
      }
    }
  },
  plugins: []
}
