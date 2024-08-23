import type { SlotsType, VNodeChild } from 'vue'
import { defineComponent } from 'vue'
import { Cascader } from 'ant-design-vue'
import { enumToText, getSlotVNode, optionsToEnum } from '@site-pro/utils'
import { useLocaleReceiver } from '../../../locale-provider'
import type { FieldProps } from './typings'
import { fieldCascaderProps } from './typings'
import type { BaseFieldFenderField } from '../../typings'

export default defineComponent({
    inheritAttrs: false,
    name: 'SFieldCascader',
    props: fieldCascaderProps(),
    slots: Object as SlotsType<{
        renderField?: BaseFieldFenderField;
    }>,
    setup (props, { slots }) {
        const { t } = useLocaleReceiver(['global'])

        return () => {
            const { mode, text, emptyText, fieldProps } = props
            const placeholder = fieldProps.placeholder || t('selectPlaceholder')

            if (mode === 'read') {
                const { options: propsOptions, fieldNames } = fieldProps
                const optionsValueEnum = optionsToEnum(propsOptions as any, fieldNames)
                const valueText = enumToText(text, optionsValueEnum)
                return valueText ?? emptyText
            }
            const needFieldProps: FieldProps = {
                allowClear: true,
                ...fieldProps,
                placeholder: placeholder
            }
            const fieldDom = <Cascader {...needFieldProps} v-slots={slots}/>
            // --
            const slotScope = { props: props, slots: slots, dom: fieldDom }
            const renderFieldDom = getSlotVNode<VNodeChild>(slots, props, 'renderField', slotScope)

            return renderFieldDom || fieldDom
        }
    }
})
