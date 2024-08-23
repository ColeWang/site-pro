import { computed, defineComponent, provide } from 'vue'
import { BaseCustomFieldsKey } from './hooks/useCustomFields'
import { customFieldsProps } from './typings'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProCustomFields',
    props: customFieldsProps(),
    setup (props, { slots }) {
        const valueTypeMap = computed(() => {
            return props.valueTypeMap
        })

        provide(BaseCustomFieldsKey, { valueTypeMap })

        return () => {
            return slots.default && slots.default()
        }
    }
})
