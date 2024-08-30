import type { App, SlotsType } from 'vue'
import { defineComponent, Fragment } from 'vue'
import { Slider } from 'ant-design-vue'
import { getSlotVNode } from '@site-pro/utils'
import { isArray } from 'lodash-es'
import type { FieldSliderFieldProps, FieldSliderSlots } from './typings'
import { fieldSliderProps } from './typings'

const FieldSlider = defineComponent({
    inheritAttrs: false,
    name: 'ProFieldSlider',
    props: fieldSliderProps(),
    slots: Object as SlotsType<FieldSliderSlots>,
    setup (props, { slots }) {
        return () => {
            const { mode, text, emptyText, fieldProps } = props

            if (mode === 'read') {
                if (isArray(text)) {
                    const [startText, endText] = text
                    return (
                        <Fragment>
                            {startText ?? emptyText}
                            {'~'}
                            {endText ?? emptyText}
                        </Fragment>
                    )
                }
                return text ?? emptyText
            }
            const needFieldProps: FieldSliderFieldProps = {
                style: { minWidth: 100, ...fieldProps.style },
                ...fieldProps
            }
            const fieldDom = <Slider {...needFieldProps} v-slots={slots}/>
            // ----
            const slotScope: any = { text, props: { mode, ...fieldProps }, slots, dom: fieldDom }
            const renderFieldDom = getSlotVNode(slots, props, 'renderField', slotScope)

            return renderFieldDom || fieldDom
        }
    }
})

FieldSlider.install = function (app: App): App {
    app.component(FieldSlider.name as string, FieldSlider)
    return app
}

export default FieldSlider
