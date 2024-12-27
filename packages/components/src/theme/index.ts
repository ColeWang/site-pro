import { genComponentStyleHook, mergeToken } from 'ant-design-vue/es/theme/internal'
import ThemeProvider from './ThemeProvider'
import type { ThemeProviderExpose, ThemeProviderInstance, ThemeProviderProps } from './typings'
import { themeProviderProps } from './typings'
import { useThemeProvider } from './hooks/useThemeProvider'
import type { CSSInterpolation, ThemeFullToken, ThemeGlobalToken } from '../ant-typings'

export { genComponentStyleHook, mergeToken }
export { useThemeProvider }
export { ThemeProvider, themeProviderProps }

export type { ThemeGlobalToken, ThemeFullToken, CSSInterpolation }
export type { ThemeProviderProps, ThemeProviderExpose, ThemeProviderInstance }
