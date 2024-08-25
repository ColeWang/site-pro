import type { ComputedRef, InjectionKey } from 'vue'
import { computed, inject, unref } from 'vue'
import type { NamePath } from '@site-pro/utils'
import { get, has } from 'lodash-es'
import type { LocaleProviderExpose, LocaleType } from '../typings'

export type InjectLocaleReceiver = Partial<LocaleProviderExpose>;

interface UseLocaleReceiverReturnType {
    locale: ComputedRef<LocaleType>;
    t: (namePath: NamePath) => string | number | undefined;
}

export const LocaleReceiverKey: InjectionKey<InjectLocaleReceiver> = Symbol('LocaleReceiver')

function useLocaleReceiver (namePath?: NamePath, propsLocale?: LocaleType): UseLocaleReceiverReturnType {
    const { locale } = inject(LocaleReceiverKey, {})

    const mergeLocale: ComputedRef<LocaleType> = computed(() => {
        const needLocale: LocaleType = unref(locale) || {}
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
