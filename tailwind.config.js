/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "google-sans": ['"Google Sans"', "sans-serif"],
        "google-sans-regular": ['"Google Sans Regular"', "sans-serif"],
      },
      screens: {
        sm: "640px", // Small screens and up
        md: "768px", // Medium screens and up
        lg: "1024px", // Large screens and up
        xl: "1280px", // Extra large screens and up
      },
      keyframes: {
        'reveal-animation': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        'border-fill': {
          '0%': {
            strokeDashoffset: '0',
            strokeDasharray: '0 100',
          },
          '100%': {
            strokeDashoffset: '100',
            strokeDasharray: '100 0',
          },
        },
        'zoom': {
          '0%': { scale: '100%' },
          '50%': { scale: '85%' },
          '100%': { scale: '100%' },
        }
      },
      animation: {
        'reveal-animation': 'reveal-animation 2s forwards ease-in-out',
        'border-fill': 'border-fill 2s linear forwards',
        'zoom': 'zoom 2s linear forwards infinite'
      },
    },
  },
  plugins: [],
};