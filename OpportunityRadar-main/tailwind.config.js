/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        radar: {
          bg: '#F7F7F4',
          surface: '#FFFFFF',
          text: '#202B3C',
          muted: '#7C8490',
          accent: '#416FAD',
          'accent-bg': '#E6EEF8',
          deadline: '#E9A66B',
          'deadline-bg': '#FDF4EB',
          'success-bg': '#DCE9DD',
          'success-text': '#54765A',
          'research-bg': '#E9E2F1',
          'research-text': '#644783',
          border: '#E9EAE7',
          'border-subtle': '#F0F1EE',
          navy: '#131B28'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['"DM Sans"', 'system-ui', 'sans-serif'],
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
      },
      borderRadius: {
        'radar': '10px',
        'radar-lg': '14px',
        'radar-sm': '8px',
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(32, 43, 60, 0.04), 0 1px 2px rgba(32, 43, 60, 0.02)',
        'elevated': '0 4px 20px -2px rgba(32, 43, 60, 0.06), 0 2px 6px -1px rgba(32, 43, 60, 0.03)',
        'modal': '0 20px 40px -10px rgba(32, 43, 60, 0.12), 0 8px 16px -4px rgba(32, 43, 60, 0.04)',
      }
    },
  },
  plugins: [],
}

