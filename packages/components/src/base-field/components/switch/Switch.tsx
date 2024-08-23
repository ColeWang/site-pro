import { defineComponent } from 'vue'
import { Switch } from 'ant-design-vue'
import { getSlotVNode } from '@site-pro/utils'
import { isFunction } from 'lodash-es'
import { useLocaleReceiver } from '../../../locale-provider'
import { fieldSwitchProps } from './typings'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProFieldSwitch',
    props: fieldSwitchProps(),
    setup (props, { slots }) {
        const { t } = useLocaleReceiver(['global'])

        function onUpdateChecked (value: boolean | string | number) {
            const { fieldProps } = props
            if (isFunction(fieldProps['onUpdate:value'])) {
                fieldProps['onUpdate:value'](value)
            }
        }

        return () => {
            const { mode, text, fieldProps } = props
            const { value, checked, style, ...restFieldProps } = fieldProps

            if (mode === 'read') {
                const open = fieldProps.checkedChildren ?? t('open')
                const close = fieldProps.unCheckedChildren ?? t('close')
                return text ? open : close
            }
            const needFieldProps = {
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
            const slotScope = { text, props: { mode, ...fieldProps }, slots, dom: fieldDom }
            const renderFieldDom = getSlotVNode(slots, props, 'renderField', slotScope)

            return renderFieldDom || fieldDom
        }
    }
})
