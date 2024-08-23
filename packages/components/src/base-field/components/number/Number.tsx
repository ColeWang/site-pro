import { defineComponent, Fragment } from 'vue'
import { InputNumber } from 'ant-design-vue'
import { getPropsSlot, getSlotVNode } from '@site-pro/utils'
import { useLocaleReceiver } from '../../../locale-provider'
import { fieldNumberProps } from './typings'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProFieldNumber',
    props: fieldNumberProps(),
    setup (props, { slots }) {
        const { t } = useLocaleReceiver(['global'])

        return () => {
            const { mode, text, emptyText, fieldProps } = props
            const placeholder = fieldProps.placeholder || t('inputPlaceholder')

            if (mode === 'read') {
                const prefixDom = getPropsSlot(slots, fieldProps, 'prefix')
                const suffixDom = getPropsSlot(slots, fieldProps, 'suffix')
                return (
                    <Fragment>
                        {prefixDom}
                        {text ?? emptyText}
                        {suffixDom}
                    </Fragment>
                )
            }
            const needFieldProps = {
                min: 0,
                ...fieldProps,
                placeholder: placeholder
            }
            const fieldDom = <InputNumber {...needFieldProps} v-slots={slots}/>
            // ----
            const slotScope = { props: props, slots: slots, dom: fieldDom }
            const renderFieldDom = getSlotVNode(slots, props, 'renderField', slotScope)

            return renderFieldDom || fieldDom
        }
    }
})
