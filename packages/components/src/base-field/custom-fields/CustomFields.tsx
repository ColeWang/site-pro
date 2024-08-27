import type { App, ComputedRef } from 'vue'
import { computed, defineComponent, provide } from 'vue'
import { CustomFieldsKey } from './hooks/useCustomFields'
import type { CustomFieldsExpose, CustomFieldsValueTypeMap } from './typings'
import { customFieldsProps } from './typings'

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

CustomFields.install = function (app: App): App {
    app.component(CustomFields.name as string, CustomFields)
    return app
}

export default CustomFields
