import type { FullToken } from 'ant-design-vue/es/theme/internal'
import { genComponentStyleHook, mergeToken } from 'ant-design-vue/es/theme/internal'
import type { GlobalToken } from 'ant-design-vue/es/theme/interface'
import type { CSSInterpolation } from 'ant-design-vue/es/_util/cssinjs'
// --
import ThemeProvider from './ThemeProvider'
import type { ThemeProviderExpose, ThemeProviderInstance, ThemeProviderProps } from './typings'
import { themeProviderProps } from './typings'
import { useThemeProvider } from './hooks/useThemeProvider'

export { mergeToken, genComponentStyleHook }
// --
export { ThemeProvider, themeProviderProps }
export { useThemeProvider }

export type { GlobalToken, FullToken, CSSInterpolation }
// --
export type { ThemeProviderProps, ThemeProviderExpose, ThemeProviderInstance }
