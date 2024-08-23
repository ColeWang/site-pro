import { computed, defineComponent, unref } from 'vue'
import { Select } from 'ant-design-vue'
import { enumToOptions, enumToText, getSlotVNode, optionsToEnum } from '@site-pro/utils'
import { isUndefined } from 'lodash-es'
import { useLocaleReceiver } from '../../../locale-provider'
import { fieldSelectProps } from './typings'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProFieldSelect',
    props: fieldSelectProps(),
    setup (props, { slots }) {
        const { t } = useLocaleReceiver(['global'])

        const options = computed(() => {
            if (isUndefined(props.valueEnum)) {
                return props.fieldProps.options || []
            }
            return enumToOptions(props.valueEnum)
        })

        return () => {
            const { mode, text, emptyText, valueEnum, fieldProps } = props
            const placeholder = fieldProps.placeholder || t('selectPlaceholder')

            if (mode === 'read') {
                const { options: propsOptions, fieldNames } = fieldProps
                const optionsValueEnum = optionsToEnum(propsOptions as any, fieldNames)
                const valueText = enumToText(text, valueEnum || optionsValueEnum)
                return valueText ?? emptyText
            }
            const needFieldProps = {
                options: unref(options),
                allowClear: true,
                ...fieldProps,
                placeholder: placeholder
            }
            const fieldDom = <Select {...needFieldProps} v-slots={slots}/>
            // ----
            const slotScope = { text, props: { mode, ...fieldProps }, slots, dom: fieldDom }
            const renderFieldDom = getSlotVNode(slots, props, 'renderField', slotScope)

            return renderFieldDom || fieldDom
        }
    }
})
