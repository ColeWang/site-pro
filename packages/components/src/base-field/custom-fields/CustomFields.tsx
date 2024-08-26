import type { ComputedRef } from 'vue'
import { computed, defineComponent, provide } from 'vue'
import { CustomFieldsKey } from './hooks/useCustomFields'
import type { CustomFieldsExpose, CustomFieldsValueTypeMap } from './typings'
import { customFieldsProps } from './typings'
import { withInstall } from '../../tools'

const CustomFields = defineComponent({
    inheritAttrs: false,
    name: 'ProCustomFields',
    props: customFieldsProps(),
    setup (props, { slots, expose }) {
        const valueTypeMap: ComputedRef<CustomFieldsValueTypeMap> = computed(() => {
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

export default withInstall(CustomFields)
