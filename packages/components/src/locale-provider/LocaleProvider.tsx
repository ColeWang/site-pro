import type { PropType } from 'vue'
import { defineComponent, provide, reactive, watch } from 'vue'
import type { BaseLocale, BaseStateLocale } from './typings.ts'
import { BaseLocaleKey } from './hooks/useLocaleReceiver'

export default defineComponent({
    inheritAttrs: false,
    name: 'SLocaleProvider',
    props: {
        locale: {
            type: Object as PropType<BaseLocale>,
            default: () => ({})
        }
    },
    setup (props, { slots }) {
        const state: BaseStateLocale = reactive({
            locale: { ...props.locale },
            __MARK__: 'internal'
        })

        provide(BaseLocaleKey, state)

        watch(() => props.locale, (locale) => {
            state.locale = { ...locale }
        }, { immediate: true })

        return () => {
            return slots.default && slots.default()
        }
    }
})
