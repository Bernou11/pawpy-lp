/** @type {import('tailwindcss').Config} */

// Design tokens issus du Figma Pawpy (node 4313:10166), via `get_variable_defs`.
// Les noms de gauche reprennent ceux des variables Figma pour garder la traçabilité.
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // typography/light-*
        ink: {
          DEFAULT: '#000000', // typography/light-primary
          soft: '#252826',    // couleur de la navigation
          60: '#0000008c',    // typography/light-secondary — noir 55 %
          40: '#77777780',    // typography/light-tertiary
        },
        // background/light-*
        surface: {
          DEFAULT: '#ffffff',
          muted: '#f5f5f5',
        },
        accent: '#ffccfb',  // brand/accent-500 — surlignage
        stroke: '#77777780', // stroke/primary

        // Conservé : Confirmation.vue et Unsubscribe.vue s'appuient encore dessus.
        monochrome: {
          100: '#ffffff',
          200: '#f5f5f7',
          400: '#dddddd',
          500: '#777777',
          800: '#252826',
          900: '#000000',
        },
      },

      fontFamily: {
        // font/familly/Primary — police payante, fichiers fournis séparément.
        // Playfair Display sert de repli tant que les .woff2 ne sont pas déposés.
        display: ['Coconat', '"Playfair Display"', 'Georgia', 'serif'],
        // font/familly/Secondary
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Typeramp Body / Subbody
        body: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },

      // Typeramp Figma. Les letterSpacing du Figma (-1, -2) sont des pourcentages.
      fontSize: {
        caption: ['11px', { lineHeight: '1.1' }],                              // font/size/xs
        label: ['14px', { lineHeight: '20px' }],                               // Subbody
        base: ['16px', { lineHeight: '22px' }],                                // Body
        lead: ['18px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],       // font/size/m
        title: ['34px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],      // font/size/2xl
        display: ['54px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],    // font/size/4xl
        numeral: ['94px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],    // chiffres des stats
      },

      maxWidth: {
        // Gabarit du Figma : page 1500px, contenu 1300px, gouttières de 100px.
        shell: '1300px',
      },

      boxShadow: {
        // token « shadow » : 5 couches #A6A6A6
        float: [
          '0 12px 26px 0 #A6A6A61A',
          '0 48px 48px 0 #A6A6A617',
          '0 108px 65px 0 #A6A6A60D',
          '0 193px 77px 0 #A6A6A603',
          '0 301px 84px 0 #A6A6A600',
        ].join(', '),
      },
    },
  },
  plugins: [],
}
