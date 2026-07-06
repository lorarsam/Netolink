/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#cf5549',
          dark: '#b94234',
          soft: '#f3d7d2',
        },
        cream: {
          DEFAULT: '#f7ead8',
          soft: '#fbf4ea',
          card: '#fffdf9',
          field: '#f5ead7',
        },
        ink: {
          DEFAULT: '#2d2524',
          soft: '#514644',
          muted: '#7d706b',
        },
        line: '#ead8c8',
        teal: '#0f8b8d',
        mint: '#dff6ec',
        blush: '#fdebea',
      },
      boxShadow: {
        card: '0 18px 45px rgba(111, 72, 45, 0.12)',
        soft: '0 10px 30px rgba(111, 72, 45, 0.10)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
