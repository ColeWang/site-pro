import type { App } from 'vue'
import useLocaleReceiver from './hooks/useLocaleReceiver'
import LocaleProvider from './LocaleProvider'
import { localeProviderProps } from './typings'

LocaleProvider.install = (app: App) => {
    app.component(LocaleProvider.name as string, LocaleProvider)
    return app
}

export { LocaleProvider, localeProviderProps, useLocaleReceiver }
export type { InjectLocaleReceiver } from './hooks/useLocaleReceiver'
export type { LocaleType, LocaleProviderProps, LocaleProviderExpose, LocaleProviderInstance } from './typings'
