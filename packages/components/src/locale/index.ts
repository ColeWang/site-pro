import LocaleProvider from './LocaleProvider'
import type {
    LocaleProviderExpose,
    LocaleProviderInstance,
    LocaleProviderProps,
    LocaleProviderSlots,
    LocaleType
} from './typings'
import { localeProviderProps } from './typings'
import { useLocaleReceiver } from './hooks/useLocaleReceiver'

export { LocaleProvider, localeProviderProps }
export { useLocaleReceiver }

export type { LocaleType }
export type { LocaleProviderSlots, LocaleProviderProps, LocaleProviderExpose, LocaleProviderInstance }
