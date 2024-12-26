import type { SlotsType, VNodeChild } from 'vue'
import { defineComponent, Fragment } from 'vue'
import { Switch as AntSwitch } from 'ant-design-vue'
import type { Recordable } from '@site-pro/utils'
import { getPropsSlotVNode, getSlotVNode } from '@site-pro/utils'
import { isFunction } from 'lodash-es'
import { useLocaleReceiver } from '../../../locale'
import type { FieldSwitchFieldProps, FieldSwitchSlots } from './typings'
import { fieldSwitchProps } from './typings'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProFieldSwitch',
    props: fieldSwitchProps(),
    slots: Object as SlotsType<FieldSwitchSlots>,
    setup (props, { slots }) {
        const { t } = useLocaleReceiver(['global'])

        function onUpdateChecked (value: boolean | string | number): void {
            const { fieldProps } = props
            if (isFunction(fieldProps['onUpdate:value'])) {
                fieldProps['onUpdate:value'](value)
            }
        }

        return () => {
            const { mode, text, fieldProps } = props
            const { value, checked, style, ...restFieldProps } = fieldProps

            if (mode === 'read') {
                const open: VNodeChild = getPropsSlotVNode(slots, fieldProps, 'checkedChildren') ?? t('open')
                const close: VNodeChild = getPropsSlotVNode(slots, fieldProps, 'unCheckedChildren') ?? t('close')

                const readDom: VNodeChild = <Fragment>{text ? open : close}</Fragment>
                // ----
                const slotProps: Recordable = { text, props: fieldProps, slots, dom: readDom }
                const fieldDom: VNodeChild = getSlotVNode(slots, props, 'renderRead', slotProps)

                return fieldDom || readDom
            }
            const needFieldProps: FieldSwitchFieldProps = {
                ...restFieldProps,
                checked: checked || value,
                ['onUpdate:checked']: onUpdateChecked
            }
            const editDom: VNodeChild = (
                <div style={style}>
                    <AntSwitch {...needFieldProps} v-slots={slots}/>
                </div>
            )
            // ----
            const slotProps: Recordable = { text, props: fieldProps, slots, dom: editDom }
            const fieldDom: VNodeChild = getSlotVNode(slots, props, 'renderEdit', slotProps)

            return fieldDom || editDom
        }
    }
})
