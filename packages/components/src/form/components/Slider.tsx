import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { defineComponent } from 'vue'
import { Form } from 'ant-design-vue'
import { formItemProps } from 'ant-design-vue/es/form'
import { pick } from 'lodash-es'
import type { FieldProps } from './Field'
import Field, { fieldProps, fieldSlots } from './Field'
import type { BaseFieldFormItemProps, BaseFieldValueType, FieldSliderFieldProps } from '../../base-field'
import { fieldSliderSlots } from '../../base-field'

const SLIDER_VALUE_TYPE: BaseFieldValueType = 'slider'

export const sliderProps = () => ({
    ...fieldProps(),
    ...formItemProps(),
    fieldProps: {
        type: Object as PropType<FieldSliderFieldProps>,
        default: () => ({})
    }
})

export type SliderProps = Partial<ExtractPropTypes<ReturnType<typeof sliderProps>>>;
export type SliderInstance = ComponentPublicInstance<SliderProps>;

export default defineComponent({
    inheritAttrs: false,
    name: 'ProSlider',
    props: sliderProps(),
    slots: Object.assign(fieldSlots, fieldSliderSlots),
    setup (props, { slots }) {
        return () => {
            const { fieldProps: propsFieldProps, formItemProps: propsFormItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...(pick(props, Object.keys(Form.Item.props)) as BaseFieldFormItemProps),
                ...propsFormItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: SLIDER_VALUE_TYPE,
                fieldProps: propsFieldProps,
                formItemProps: needFormItemProps
            }
            return <Field {...needFieldProps} v-slots={slots}/>
        }
    }
})
