import type { App, ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { defineComponent } from 'vue'
import { Form } from 'ant-design-vue'
import { formItemProps } from 'ant-design-vue/es/form'
import { pick } from 'lodash-es'
import type { FieldProps } from './Field'
import Field, { fieldProps, fieldSlots } from './Field'
import type { BaseFieldFormItemProps, BaseFieldValueType, FieldRadioFieldProps } from '../../base-field'
import { fieldRadioSlots } from '../../base-field'

const RADIO_VALUE_TYPE: BaseFieldValueType = 'radio'

export const radioProps = () => ({
    ...fieldProps(),
    ...formItemProps(),
    fieldProps: {
        type: Object as PropType<FieldRadioFieldProps>,
        default: () => ({})
    }
})

export type RadioProps = Partial<ExtractPropTypes<ReturnType<typeof radioProps>>>;
export type RadioInstance = ComponentPublicInstance<RadioProps>;

const Radio = defineComponent({
    inheritAttrs: false,
    name: 'ProRadio',
    props: radioProps(),
    slots: Object.assign(fieldSlots, fieldRadioSlots),
    setup (props, { slots }) {
        return () => {
            const { fieldProps: propsFieldProps, formItemProps: propsFormItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...(pick(props, Object.keys(Form.Item.props)) as BaseFieldFormItemProps),
                ...propsFormItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: RADIO_VALUE_TYPE,
                fieldProps: propsFieldProps,
                formItemProps: needFormItemProps
            }
            return <Field {...needFieldProps} v-slots={slots}/>
        }
    }
})

Radio.install = function (app: App): App {
    app.component(Radio.name as string, Radio)
    return app
}

export default Radio
