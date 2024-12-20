import ThemeProvider from './ThemeProvider'
import type { ThemeProviderExpose, ThemeProviderInstance, ThemeProviderProps } from './typings'
import { themeProviderProps } from './typings'
import { useThemeProvider } from './hooks/useThemeProvider'

export { ThemeProvider, themeProviderProps }
export { useThemeProvider }

export type { ThemeProviderProps, ThemeProviderExpose, ThemeProviderInstance }
