import type { ComputedRef, InjectionKey } from 'vue'
import { computed, inject, unref } from 'vue'
import type { NamePath } from '@site-pro/utils'
import zhCN from '@site-pro/locale/zh-CN'
import { get, has } from 'lodash-es'
import type { LocaleProviderExpose, LocaleType } from '../typings'

interface UseLocaleReceiverReturnType {
    locale: ComputedRef<LocaleType>;
    t: (namePath: NamePath) => string | number | undefined;
}

export const LocaleReceiverKey: InjectionKey<Partial<LocaleProviderExpose>> = Symbol('LocaleReceiver')

function useLocaleReceiver (namePath?: NamePath, propsLocale?: LocaleType): UseLocaleReceiverReturnType {
    const { locale } = inject(LocaleReceiverKey, {})

    const mergeLocale: ComputedRef<LocaleType> = computed(() => {
        const needLocale: LocaleType = { ...zhCN, ...(unref(locale) || {}) }
        if (namePath && has(needLocale, namePath)) {
            const stateLocale: LocaleType = get(needLocale, namePath, {})
            return { ...stateLocale, ...unref(propsLocale) }
        }
        return { ...needLocale, ...unref(propsLocale) }
    })

    function translate (namePath: NamePath): string | number | undefined {
        return get(unref(mergeLocale), namePath, namePath)
    }

    return { locale: mergeLocale, t: translate }
}

export default useLocaleReceiver
