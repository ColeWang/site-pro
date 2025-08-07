import type { App, Plugin, Ref, SlotsType } from 'vue'
import { defineComponent, ref, watch } from 'vue'
import { createLocaleReceiver } from './hooks/useLocaleReceiver'
import type { LocaleProviderExpose, LocaleProviderSlots } from './typings'
import { localeProviderProps } from './typings'
import type { LocaleType } from '../locale'

const LocaleProvider = defineComponent({
    compatConfig: { MODE: 3 },
    inheritAttrs: false,
    name: 'ProLocaleProvider',
    props: localeProviderProps(),
    slots: Object as SlotsType<LocaleProviderSlots>,
    setup (props, { slots, expose }) {
        const locale: Ref<LocaleType> = ref({ ...props.locale })

        watch(() => props.locale, (value) => {
            locale.value = { ...value }
        }, { immediate: true })

        const localeProviderExpose: LocaleProviderExpose = {
            locale: locale,
            __MARK__: 'internal'
        }

        createLocaleReceiver(localeProviderExpose)

        expose(localeProviderExpose)

        return () => {
            return slots.default && slots.default()
        }
    }
})

LocaleProvider.install = function (app: App): App {
    app.component(LocaleProvider.name as string, LocaleProvider)
    return app
}

export default LocaleProvider as typeof LocaleProvider & Plugin
