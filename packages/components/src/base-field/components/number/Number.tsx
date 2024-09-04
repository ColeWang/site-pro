import type { App, SlotsType, VNodeChild } from 'vue'
import { defineComponent, Fragment } from 'vue'
import { InputNumber } from 'ant-design-vue'
import { getPropsSlot, getSlotVNode } from '@site-pro/utils'
import { useLocaleReceiver } from '../../../locale-provider'
import type { FieldNumberFieldProps, FieldNumberSlots } from './typings'
import { fieldNumberProps } from './typings'

const FieldNumber = defineComponent({
    inheritAttrs: false,
    name: 'ProFieldNumber',
    props: fieldNumberProps(),
    slots: Object as SlotsType<FieldNumberSlots>,
    setup (props, { slots }) {
        const { t } = useLocaleReceiver(['global'])

        return () => {
            const { mode, text, emptyText, fieldProps } = props
            const placeholder: string = fieldProps.placeholder || t('inputPlaceholder')!

            if (mode === 'read') {
                const prefixDom: VNodeChild = getPropsSlot(slots, fieldProps, 'prefix')
                const suffixDom: VNodeChild = getPropsSlot(slots, fieldProps, 'suffix')
                return (
                    <Fragment>
                        {prefixDom}
                        {text ?? emptyText}
                        {suffixDom}
                    </Fragment>
                )
            }
            const needFieldProps: FieldNumberFieldProps = {
                min: 0,
                ...fieldProps,
                placeholder: placeholder
            }
            const fieldDom = <InputNumber {...needFieldProps} v-slots={slots}/>
            // ----
            const slotScope: any = { text, props: { mode, ...fieldProps }, slots, dom: fieldDom }
            const renderFieldDom = getSlotVNode(slots, props, 'renderField', slotScope)

            return renderFieldDom || fieldDom
        }
    }
})

FieldNumber.install = function (app: App): App {
    app.component(FieldNumber.name as string, FieldNumber)
    return app
}

export default FieldNumber
