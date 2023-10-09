// This file needs to exist for Tailwind CSS IntelliSense plugin to activate

// Reference:
// - Tailwind size naming conventions: xs, sm, md(/base/DEFAULT), lg, xl, 2xl, 3xl, ...

const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    
    /// Additions
    `./css/**/*.css`,
    
    /// Default. Src: https://tailwindcss.nuxtjs.org/tailwind/config
    `./components/**/*.{vue,js,ts}`,
    `./layouts/**/*.vue`,
    `./pages/**/*.vue`,
    `./composables/**/*.{js,ts}`,
    `./plugins/**/*.{js,ts}`,
    `./utils/**/*.{js,ts}`,
    `./App.{js,ts,vue}`,
    `./app.{js,ts,vue}`,
    `./Error.{js,ts,vue}`,
    `./error.{js,ts,vue}`,
    `./app.config.{js,ts}`
  ],
  safelist: [
    'shadow-mdd',
  ],
  theme: {

    boxShadow: {
      
      /* vvv From Feedback Assistant */
      'sm-inset': '0px 0.5px 3px 1px rgba(0, 0, 0, 0.1), 0 1px 8px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.30)', 
      'md-inset': '0 2px 4px 0 rgba(0, 0, 0, 0.08), 0 4px 16px 0 rgba(0, 0, 0, 0.08), 0 8px 32px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.30)',
      
      /* vvv Like Feedback Assistant shadows but without inset – otherwise tailwind shadow coloring colors the inset */
      'sm': '0px 0.5px 3px 1px rgba(0, 0, 0, 0.1), 0 1px 8px 0 rgba(0, 0, 0, 0.08)',
      'md': '0 2px 4px 0 rgba(0, 0, 0, 0.08), 0 4px 16px 0 rgba(0, 0, 0, 0.08), 0 8px 32px 0 rgba(0, 0, 0, 0.08)',
      'md-raised': '0 2px 4px 10px rgba(0, 0, 0, 0.08), 0 4px 16px 10px rgba(0, 0, 0, 0.08), 0 8px 32px 10px rgba(0, 0, 0, 0.08)',
    },

    extend: {
      backgroundImage: (theme) => ({ 
        // 'gradient-blue': `linear-gradient(to bottom, ${theme('colors.cyan.400')}, ${theme('colors.blue.500')})`,        /* bg-gradient-to-b from-cyan-400 to-blue-500 */
        // 'gradient-orange': `linear-gradient(to bottom, ${theme('colors.amber.400')}, ${theme('colors.orange.500')})`,   /* bg-gradient-to-b from-amber-400 to-orange-500 */
        // 'gradient-pink': `linear-gradient(to bottom, ${theme('colors.rose.400')}, ${theme('colors.pink.500')})`,        /* bg-gradient-to-b from-rose-400 to-pink-500 */
      })
    }
  },
  plugins: [

    // plugin(function({ matchUtilities, theme }) {
    //   matchUtilities(
    //     {
    //       tab: (value) => ({
    //         tabSize: value
    //       }),
    //     },
    //     { values: theme('tabSize') }
    //   )
    // }),

    plugin(function ({ matchUtilities }) {

      /* `text-shadow-x` plugin */

      const newUtilities = {
        'text-shadow': (value) => {
          return {
            'textShadow': value
          }
        }
      }
      const options = {
        values: {
          sm: '0 0.02em 2px var(--tw-shadow-color), 0 0.01em 8px var(--tw-shadow-color)', // Alternative: '0 0.02em 1px var(--tw-shadow-color), 0 0.02em 4px var(--tw-shadow-color), 0 0.01em 28px var(--tw-shadow-color)',
          lg: '0 0.02em 1px var(--tw-shadow-color), 0 0.02em 4px var(--tw-shadow-color), 0 0.01em 20px var(--tw-shadow-color), 0 0.01em 24px var(--tw-shadow-color)',
          xl: '0 0.02em 1px var(--tw-shadow-color), 0 0.02em 4px var(--tw-shadow-color), 0 0.01em 20px var(--tw-shadow-color), 0 0.01em 24px var(--tw-shadow-color), 0 0.01em 28px var(--tw-shadow-color), 0 0.01em 32px var(--tw-shadow-color)',
        }
      }
      matchUtilities(newUtilities, options);
    }),

    plugin(function({ matchUtilities }) {
      
      /*    
      - `inline-space-[n]` plugin
      - Example usage:
        `<p>Here<span class="inline-space-[8]"/>There</p>`
      - Also see https://tailwindcss.com/docs/plugins
      - matchUtilities() implementation didn't work at first. See https://github.com/tailwindlabs/tailwindcss/discussions/11916.
      - This might break on other systems where the Apple font isn't available and the space width is therefore different.
      */

      const thinSpace = '\u200A'; /* 2009 is thinSpace, 200A is hair space. See https://jkorpela.fi/chars/spaces.html */

      const newUtilities = {
        'inline-space': (n) => {
          const cssRules = {
            '&::before': {
              'content': `'${thinSpace.repeat(n)}'`
            }
          }
          return cssRules
        },
      }
      const options = {
        values: {
          /* Could define default values here. But with can also use arbitrary values with [bracket syntax] */
          1: '1',
          2: '2',
        },
      }

      matchUtilities(newUtilities, options)
    }),
  ]
}