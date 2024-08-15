import type { ComputedRef, InjectionKey } from 'vue'
import { computed, inject, unref } from 'vue'
import type { BaseNamePath } from '@site-pro/utils'
import type { BaseLocale, BaseStateLocale } from '../typings'
import { get } from 'lodash-es'
import zhCN from '../zhCN'

export const BaseLocaleKey: InjectionKey<BaseStateLocale> = Symbol('Locale')

function useLocaleReceiver (
    path: BaseNamePath,
    defaultLocale?: BaseLocale,
    propsLocale?: BaseLocale
) {
    const state: BaseStateLocale = inject(BaseLocaleKey, {})

    const locale: ComputedRef<BaseLocale> = computed(() => {
        const baseLocale = unref(defaultLocale) || get(zhCN, (path || ['global']), {})
        const providerLocale = (path && state.locale) ? get(state.locale, path, {}) : {}
        const needPropsLocale = unref(propsLocale) || {}
        return { ...baseLocale, ...providerLocale, ...needPropsLocale }
    })

    function translate (path: BaseNamePath): string {
        return get(unref(locale), path, path)
    }

    return { locale, t: translate }
}

export default useLocaleReceiver
