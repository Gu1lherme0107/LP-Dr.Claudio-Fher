/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#00f0c4',
        'primary-dark': '#00d4a8',
        dark: {
          bg: '#121418',
          surface: '#1a1d24',
          text: '#e2e8f0',
          'text-secondary': '#94a3b8'
        }
      },
      keyframes: {
        'notification-slide-in': {
          '0%': {
            transform: 'translateX(100%)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1'
          }
        },
        'notification-slide-out': {
          '0%': {
            transform: 'translateX(0)',
            opacity: '1'
          },
          '100%': {
            transform: 'translateX(100%)',
            opacity: '0'
          }
        }
      },
      animation: {
        'notification-slide-in': 'notification-slide-in 0.5s ease-out forwards',
        'notification-slide-out': 'notification-slide-out 0.5s ease-in forwards'
      }
    },
  },
  plugins: [],
};
