/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: 'rgb(var(--color-brand) / <alpha-value>)',
          dark: 'rgb(var(--color-brand-dark) / <alpha-value>)',
          soft: 'rgb(var(--color-brand-soft) / <alpha-value>)',
        },
        cream: {
          DEFAULT: 'rgb(var(--color-cream) / <alpha-value>)',
          soft: 'rgb(var(--color-cream-soft) / <alpha-value>)',
          card: 'rgb(var(--color-cream-card) / <alpha-value>)',
          field: 'rgb(var(--color-cream-field) / <alpha-value>)',
        },
        ink: {
          DEFAULT: 'rgb(var(--color-ink) / <alpha-value>)',
          soft: 'rgb(var(--color-ink-soft) / <alpha-value>)',
          muted: 'rgb(var(--color-ink-muted) / <alpha-value>)',
        },
        action: {
          DEFAULT: 'rgb(var(--color-action) / <alpha-value>)',
          active: 'rgb(var(--color-action-active) / <alpha-value>)',
          activeText: 'rgb(var(--color-action-active-text) / <alpha-value>)',
          hover: 'rgb(var(--color-action-hover) / <alpha-value>)',
          text: 'rgb(var(--color-action-text) / <alpha-value>)',
        },
        button: {
          focus: 'rgb(var(--color-button-focus) / <alpha-value>)',
          ghostText: 'rgb(var(--color-button-ghost-text) / <alpha-value>)',
          ghostHover: 'rgb(var(--color-button-ghost-hover) / <alpha-value>)',
          primary: 'rgb(var(--color-button-primary) / <alpha-value>)',
          primaryHover: 'rgb(var(--color-button-primary-hover) / <alpha-value>)',
          primaryText: 'rgb(var(--color-button-primary-text) / <alpha-value>)',
          secondary: 'rgb(var(--color-button-secondary) / <alpha-value>)',
          secondaryBorder: 'rgb(var(--color-button-secondary-border) / <alpha-value>)',
          secondaryHover: 'rgb(var(--color-button-secondary-hover) / <alpha-value>)',
          secondaryText: 'rgb(var(--color-button-secondary-text) / <alpha-value>)',
        },
        navAction: {
          active: 'rgb(var(--color-nav-action-active) / <alpha-value>)',
          activeText: 'rgb(var(--color-nav-action-active-text) / <alpha-value>)',
          hover: 'rgb(var(--color-nav-action-hover) / <alpha-value>)',
          hoverText: 'rgb(var(--color-nav-action-hover-text) / <alpha-value>)',
          text: 'rgb(var(--color-nav-action-text) / <alpha-value>)',
        },
        onBrand: 'rgb(var(--color-on-brand) / <alpha-value>)',
        surface: {
          DEFAULT: 'rgb(var(--color-surface) / <alpha-value>)',
          active: 'rgb(var(--color-surface-active) / <alpha-value>)',
          field: 'rgb(var(--color-surface-field) / <alpha-value>)',
          hover: 'rgb(var(--color-surface-hover) / <alpha-value>)',
          soft: 'rgb(var(--color-surface-soft) / <alpha-value>)',
        },
        textTheme: {
          DEFAULT: 'rgb(var(--color-text) / <alpha-value>)',
          muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
          soft: 'rgb(var(--color-text-soft) / <alpha-value>)',
        },
        line: 'rgb(var(--color-line) / <alpha-value>)',
        teal: 'rgb(var(--color-teal) / <alpha-value>)',
        mint: 'rgb(var(--color-mint) / <alpha-value>)',
        blush: 'rgb(var(--color-blush) / <alpha-value>)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        soft: 'var(--shadow-soft)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
