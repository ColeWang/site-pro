import ThemeProvider from './ThemeProvider'
import type { ThemeProviderExpose, ThemeProviderInstance, ThemeProviderProps } from './typings'
import { themeProviderProps } from './typings'
import { useThemeProvider } from './hooks/useThemeProvider'
// --
import type { CSSInterpolation, FullToken, GlobalToken } from './internal'
import { genComponentStyleHook, mergeToken } from './internal'

export { ThemeProvider, themeProviderProps }
export { useThemeProvider }
// --
export { genComponentStyleHook, mergeToken }

export type { ThemeProviderProps, ThemeProviderExpose, ThemeProviderInstance }
// --
export type { GlobalToken, FullToken, CSSInterpolation }
