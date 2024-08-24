import type { ComputedRef } from 'vue'
import { computed, defineComponent, provide } from 'vue'
import { CustomFieldsKey } from './hooks/useCustomFields'
import type { BaseValueTypeMap, CustomFieldsExpose } from './typings'
import { customFieldsProps } from './typings'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProCustomFields',
    props: customFieldsProps(),
    setup (props, { slots, expose }) {
        const valueTypeMap: ComputedRef<BaseValueTypeMap> = computed(() => {
            return props.valueTypeMap
        })

        const customFieldsExpose: CustomFieldsExpose = {
            valueTypeMap: valueTypeMap
        }

        provide(CustomFieldsKey, customFieldsExpose)
        expose(customFieldsExpose)

        return () => {
            return slots.default && slots.default()
        }
    }
})
