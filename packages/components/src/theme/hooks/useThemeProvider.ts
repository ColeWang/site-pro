import type { InjectionKey } from 'vue'
import { inject, provide } from 'vue'
import type { ThemeProviderExpose } from '../typings'

export const ThemeProviderKey: InjectionKey<Partial<ThemeProviderExpose>> = Symbol('ThemeProvider')

export function createThemeProvider (value: ThemeProviderExpose): void {
    provide(ThemeProviderKey, value)
}

export function useThemeProvider (): Partial<ThemeProviderExpose> {
    return inject(ThemeProviderKey, {})
}
