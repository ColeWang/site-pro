import { defineComponent, Fragment } from 'vue'
import { Slider } from 'ant-design-vue'
import { getSlotVNode } from '@site-pro/utils'
import { isArray } from 'lodash-es'
import { fieldSliderProps } from './typings'
import type { SliderProps } from '../../../ant-typings'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProFieldSlider',
    props: fieldSliderProps(),
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
            const needFieldProps: SliderProps = {
                style: { minWidth: 120, ...fieldProps.style },
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
