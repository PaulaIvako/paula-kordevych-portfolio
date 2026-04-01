/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#faf9f3',
          dark: '#1a1a1a'
        },
        surface: {
          DEFAULT: 'rgba(255, 255, 255, 0.35)',
          strong: 'rgba(255, 255, 255, 0.55)',
          dark: 'rgba(45, 45, 45, 0.7)',
          'strong-dark': 'rgba(55, 55, 55, 0.85)'
        },
        text: {
          DEFAULT: '#20160f',
          muted: '#5a5048',
          dark: '#ffffff'
        },
        'muted-dark': '#e0e0e0',

        accent: {
          blue: '#5373f3',
          pink: '#e577b9',
          glow: '#f3b3d8'
        },
        project: {
          yellow: '#f5e6a8',
          green: '#c8d4a8',
          purple: '#c4b8d8'
        },
        nav: {
          DEFAULT: 'rgba(230, 229, 216, 0.7)',
          dark: 'rgba(30, 30, 30, 0.8)'
        },
        line: {
          DEFAULT: 'rgba(0, 0, 0, 0.06)',
          dark: 'rgba(255, 255, 255, 0.15)'
        }
      },
      fontFamily: {
        aboreto: ['Aboreto', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        montserrat: ['Montserrat', 'sans-serif']
      },
      fontSize: {
        'hero': ['clamp(88px, 10vw, 120px)', { lineHeight: '0.9', letterSpacing: '0.02em' }],
        'h2': ['clamp(48px, 6vw, 72px)', { lineHeight: '1.1', letterSpacing: '0.08em' }],
        'kicker': ['13px', { lineHeight: '1.4', letterSpacing: '0.22em' }]
      },
      boxShadow: {
        sm: '0 1px 3px rgba(0, 0, 0, 0.03)',
        md: '0 2px 8px rgba(0, 0, 0, 0.04)',
        lg: '0 4px 16px rgba(0, 0, 0, 0.06)',
        'sm-dark': '0 1px 3px rgba(0, 0, 0, 0.3)',
        'md-dark': '0 2px 8px rgba(0, 0, 0, 0.4)',
        'lg-dark': '0 4px 16px rgba(0, 0, 0, 0.5)'
      },
      backdropBlur: {
        nav: '20px'
      },
      maxWidth: {
        'layout': '1100px'
      },
      spacing: {
        '15': '60px',
        '22': '88px',
        '30': '120px'
      }
    }
  },
  plugins: []
}
