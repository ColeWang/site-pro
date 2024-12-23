import type { ComputedRef, InjectionKey } from 'vue'
import { computed, inject, provide, unref } from 'vue'
import type { NamePath } from '@site-pro/utils'
import { zhCN } from '@site-pro/locale'
import { get, has } from 'lodash-es'
import type { LocaleProviderExpose, LocaleType } from '../typings'

interface UseLocaleReceiverResult {
    locale: ComputedRef<LocaleType>;
    t: (namePath: NamePath) => string | undefined;
}

export const LocaleReceiverKey: InjectionKey<Partial<LocaleProviderExpose>> = Symbol('LocaleReceiver')

export function createLocaleReceiver (value: LocaleProviderExpose): void {
    provide(LocaleReceiverKey, value)
}

export function useLocaleReceiver (namePath?: NamePath, propsLocale?: LocaleType): UseLocaleReceiverResult {
    const { locale } = inject(LocaleReceiverKey, {})

    const mergeLocale: ComputedRef<LocaleType> = computed(() => {
        const needLocale: LocaleType = { ...zhCN, ...(unref(locale) || {}) }
        if (namePath && has(needLocale, namePath)) {
            const stateLocale: LocaleType = get(needLocale, namePath, {})
            return { ...stateLocale, ...unref(propsLocale) }
        }
        return { ...needLocale, ...unref(propsLocale) }
    })

    function translate (namePath: NamePath): string | undefined {
        return get(unref(mergeLocale), namePath, namePath)
    }

    return { locale: mergeLocale, t: translate }
}
