import type { SlotsType, VNodeChild } from 'vue'
import { defineComponent, Fragment } from 'vue'
import { Slider as AntSlider } from 'ant-design-vue'
import type { Recordable } from '@site-pro/utils'
import { getSlotVNode } from '@site-pro/utils'
import { isArray } from 'lodash-es'
import type { FieldSliderFieldProps, FieldSliderSlots } from './typings'
import { fieldSliderProps } from './typings'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProFieldSlider',
    props: fieldSliderProps(),
    slots: Object as SlotsType<FieldSliderSlots>,
    setup (props, { slots }) {
        return () => {
            const { mode, text, emptyText, fieldProps } = props

            if (mode === 'read') {
                const [startText, endText] = isArray(text) ? text : [text, text]

                const readDom: VNodeChild = isArray(text) ? (
                    <Fragment>
                        {startText ?? emptyText}
                        {'~'}
                        {endText ?? emptyText}
                    </Fragment>
                ) : (
                    <Fragment>{text ?? emptyText}</Fragment>
                )
                // ----
                const slotProps: Recordable = { text, props: fieldProps, slots, dom: readDom }
                const fieldDom: VNodeChild = getSlotVNode(slots, props, 'renderRead', slotProps)

                return fieldDom || readDom
            }
            const needFieldProps: FieldSliderFieldProps = {
                style: { minWidth: 100, ...fieldProps.style },
                ...fieldProps
            }
            const editDom: VNodeChild = <AntSlider {...needFieldProps} v-slots={slots}/>
            // ----
            const slotProps: Recordable = { text, props: fieldProps, slots, dom: editDom }
            const fieldDom: VNodeChild = getSlotVNode(slots, props, 'renderEdit', slotProps)

            return fieldDom || editDom
        }
    }
})
