import type { App, SlotsType, VNodeChild } from 'vue'
import { defineComponent } from 'vue'
import { Switch } from 'ant-design-vue'
import { getPropsSlotVNode, getSlotVNode } from '@site-pro/utils'
import { isFunction } from 'lodash-es'
import { useLocaleReceiver } from '../../../locale'
import type { FieldSwitchFieldProps, FieldSwitchSlots } from './typings'
import { fieldSwitchProps } from './typings'

const FieldSwitch = defineComponent({
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
                return text ? open : close
            }
            const needFieldProps: FieldSwitchFieldProps = {
                ...restFieldProps,
                checked: checked || value,
                ['onUpdate:checked']: onUpdateChecked
            }
            const fieldDom: VNodeChild = (
                <div style={style}>
                    <Switch {...needFieldProps} v-slots={slots}/>
                </div>
            )
            // ----
            const slotScope: any = { text, props: { mode, ...fieldProps }, slots, dom: fieldDom }
            const renderFieldDom: VNodeChild = getSlotVNode(slots, props, 'renderField', slotScope)

            return renderFieldDom || fieldDom
        }
    }
})

FieldSwitch.install = function (app: App): App {
    app.component(FieldSwitch.name as string, FieldSwitch)
    return app
}

export default FieldSwitch
