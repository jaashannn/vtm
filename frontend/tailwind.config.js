// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       animation: {
//         'fade-in': 'fadeIn 1s ease-in-out',
//         'scale-up': 'scaleUp 1s ease-in-out',
//         'slide-in': 'slideIn 0.6s ease-out',
//       },
//       keyframes: {
//         fadeIn: {
//           '0%': { opacity: 0, transform: 'translateY(-20px)' },
//           '100%': { opacity: 1, transform: 'translateY(0)' },
//         },
//         scaleUp: {
//           '0%': { transform: 'scale(0.8)' },
//           '100%': { transform: 'scale(1)' },
//         },
//         slideIn: {
//           'from': { transform: 'translateX(100%)', opacity: '0' },
//           'to': { transform: 'translateX(0)', opacity: '1' },
//         }
//       },
//     },
//   },
//   plugins: [],
// }
/**
 * 
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class', // Add this line
  theme: {
    extend: {},
  },
  plugins: [],
}