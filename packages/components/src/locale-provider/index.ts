import type { App } from 'vue'
import LocaleProvider from './LocaleProvider'
import { localeProviderProps } from './typings'
import useLocaleReceiver from './hooks/useLocaleReceiver'

LocaleProvider.install = function (app: App): App {
    app.component(LocaleProvider.name as string, LocaleProvider)
    return app
}

export { LocaleProvider, localeProviderProps }
export { useLocaleReceiver }
export type { InjectLocaleReceiver } from './hooks/useLocaleReceiver'
export type { LocaleType, LocaleProviderProps, LocaleProviderExpose, LocaleProviderInstance } from './typings'
