import type { App, SlotsType } from 'vue'
import { defineComponent } from 'vue'
import { Switch } from 'ant-design-vue'
import { getPropsSlot, getSlotVNode } from '@site-pro/utils'
import { isFunction } from 'lodash-es'
import { useLocaleReceiver } from '../../../locale-provider'
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
                const open = getPropsSlot(slots, fieldProps, 'checkedChildren') ?? t('open')
                const close = getPropsSlot(slots, fieldProps, 'unCheckedChildren') ?? t('close')
                return text ? open : close
            }
            const needFieldProps: FieldSwitchFieldProps = {
                ...restFieldProps,
                checked: checked || value,
                ['onUpdate:checked']: onUpdateChecked
            }
            const fieldDom = (
                <div style={style}>
                    <Switch {...needFieldProps} v-slots={slots}/>
                </div>
            )
            // ----
            const slotScope: any = { text, props: { mode, ...fieldProps }, slots, dom: fieldDom }
            const renderFieldDom = getSlotVNode(slots, props, 'renderField', slotScope)

            return renderFieldDom || fieldDom
        }
    }
})

FieldSwitch.install = function (app: App): App {
    app.component(FieldSwitch.name as string, FieldSwitch)
    return app
}

export default FieldSwitch
