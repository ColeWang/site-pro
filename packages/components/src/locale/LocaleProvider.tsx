import type { App, Ref, SlotsType } from 'vue'
import { defineComponent, ref, watch } from 'vue'
import { createLocaleReceiver } from './hooks/useLocaleReceiver'
import type { LocaleProviderExpose, LocaleProviderSlots, LocaleType } from './typings'
import { localeProviderProps } from './typings'

const LocaleProvider = defineComponent({
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

export default LocaleProvider
