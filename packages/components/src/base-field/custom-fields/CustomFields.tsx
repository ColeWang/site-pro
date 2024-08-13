import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { computed, defineComponent, provide } from 'vue'
import { BaseCustomFieldsKey } from './hooks/useCustomFields'
import type { BaseValueTypeMap } from './typings'

const customFieldsProps = {
    valueTypeMap: {
        type: Object as PropType<BaseValueTypeMap>,
        default: () => ({})
    }
}

export type CustomFieldsProps = Partial<ExtractPropTypes<typeof customFieldsProps>>;
export type CustomFieldsExpose = {};
export type CustomFieldsInstance = ComponentPublicInstance<CustomFieldsProps, CustomFieldsExpose>;

export default defineComponent({
    inheritAttrs: false,
    name: 'SCustomFields',
    props: customFieldsProps,
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
