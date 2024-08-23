import { computed, defineComponent, unref } from 'vue'
import { Checkbox } from 'ant-design-vue'
import { enumToOptions, enumToText, getSlotVNode, optionsToEnum } from '@site-pro/utils'
import { isUndefined } from 'lodash-es'
import { fieldCheckboxProps } from './typings'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProFieldCheckbox',
    props: fieldCheckboxProps(),
    setup (props, { slots }) {
        const options = computed(() => {
            if (isUndefined(props.valueEnum)) {
                return props.fieldProps.options || []
            }
            return enumToOptions(props.valueEnum)
        })

        return () => {
            const { mode, text, emptyText, valueEnum, fieldProps } = props

            if (mode === 'read') {
                const { options: propsOptions } = fieldProps
                const optionsValueEnum = optionsToEnum(propsOptions as any, {})
                const valueText = enumToText(text, valueEnum || optionsValueEnum)
                return valueText ?? emptyText
            }
            const needFieldProps = {
                options: unref(options) as any,
                ...fieldProps
            }
            const fieldDom = <Checkbox.Group {...needFieldProps} v-slots={slots}/>
            // ----
            const slotScope = { props: props, slots: slots, dom: fieldDom }
            const renderFieldDom = getSlotVNode(slots, props, 'renderField', slotScope)

            return renderFieldDom || fieldDom
        }
    }
})
