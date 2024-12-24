import type { App, ComponentPublicInstance, ExtractPropTypes, Plugin, PropType, SlotsType } from 'vue'
import { defineComponent } from 'vue'
import { Form } from 'ant-design-vue'
import { formItemProps as antFormItemProps } from 'ant-design-vue/es/form'
import { pick } from 'lodash-es'
import type { FieldProps, FieldSlots } from '../Field'
import Field, { fieldProps } from '../Field'
import type {
    BaseFieldFormItemProps,
    BaseFieldValueType,
    FieldSliderFieldProps,
    FieldSliderSlots
} from '../../base-field'

const SLIDER_VALUE_TYPE: BaseFieldValueType = 'slider'

export const sliderProps = () => ({
    ...fieldProps(),
    ...antFormItemProps(),
    fieldProps: {
        type: Object as PropType<FieldSliderFieldProps>,
        default: () => ({})
    }
})

export type SliderSlots = FieldSlots & FieldSliderSlots;
export type SliderProps = Partial<ExtractPropTypes<ReturnType<typeof sliderProps>>>;
export type SliderInstance = ComponentPublicInstance<SliderProps>;

const Slider = defineComponent({
    inheritAttrs: false,
    name: 'ProSlider',
    props: sliderProps(),
    slots: Object as SlotsType<SliderSlots>,
    setup (props, { slots }) {
        return () => {
            const { formItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...pick(props, Object.keys(Form.Item.props)) as BaseFieldFormItemProps,
                ...formItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: SLIDER_VALUE_TYPE,
                formItemProps: needFormItemProps
            }
            return <Field {...needFieldProps} v-slots={slots}/>
        }
    }
})

Slider.install = function (app: App): App {
    app.component(Slider.name as string, Slider)
    return app
}

export default Slider as typeof Slider & Plugin
