import { extendTheme, withDefaultColorScheme, type ThemeConfig } from '@chakra-ui/react'

// const config: ThemeConfig = {
//   initialColorMode: 'light',
//   useSystemColorMode: false,
// }

// 3. extend the theme
const theme = extendTheme(
  {
    colors: {
      primary : {
        500: '#43718f'
      },
      green: {
        500: '#33ac74'
      },
      orange: {
        500: '#f49215'
      },
      red: {
        500: '#b11810'
      },
      purple: {
        500: '#85408B'
      }
    },
  },
  withDefaultColorScheme({
    colorScheme: 'primary',
  })
)

export default theme