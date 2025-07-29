import type { SlotsType, VNodeChild } from 'vue'
import { defineComponent, Fragment } from 'vue'
import { Input as AntInput } from 'ant-design-vue'
import type { Recordable } from '@site-pro/utils'
import { getPropsSlotVNode, getSlotVNode } from '@site-pro/utils'
import { useLocaleReceiver } from '../../../locale-provider'
import type { FieldTextFieldProps, FieldTextSlots } from './typings'
import { fieldTextProps } from './typings'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProFieldText',
    props: fieldTextProps(),
    slots: Object as SlotsType<FieldTextSlots>,
    setup (props, { slots }) {
        const { t } = useLocaleReceiver(['global'])

        return () => {
            const { mode, text, emptyText, fieldProps } = props
            const placeholder: string | number = fieldProps.placeholder || t('inputPlaceholder')!

            if (mode === 'read') {
                const prefix: VNodeChild = getPropsSlotVNode(slots, fieldProps, 'prefix')
                const suffix: VNodeChild = getPropsSlotVNode(slots, fieldProps, 'suffix')

                const readDom: VNodeChild = (
                    <Fragment>
                        {prefix}
                        {text ?? emptyText}
                        {suffix}
                    </Fragment>
                )
                // ----
                const slotProps: Recordable = { text, props: fieldProps, slots, dom: readDom }
                const fieldDom: VNodeChild = getSlotVNode(slots, props, 'renderRead', slotProps)

                return fieldDom || readDom
            }
            const needFieldProps: FieldTextFieldProps = {
                allowClear: true,
                ...fieldProps,
                placeholder: placeholder
            }
            const editDom: VNodeChild = <AntInput {...needFieldProps} v-slots={slots}/>
            // ----
            const slotProps: Recordable = { text, props: fieldProps, slots, dom: editDom }
            const fieldDom: VNodeChild = getSlotVNode(slots, props, 'renderEdit', slotProps)

            return fieldDom || editDom
        }
    }
})
