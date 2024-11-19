import type { App, ComponentPublicInstance, ExtractPropTypes, PropType, SlotsType } from 'vue'
import { defineComponent } from 'vue'
import { Form } from 'ant-design-vue'
import { formItemProps as antFormItemProps } from 'ant-design-vue/es/form'
import { pick } from 'lodash-es'
import type { FieldProps, FieldSlots } from './Field'
import Field, { fieldProps } from './Field'
import type { BaseFieldFormItemProps, BaseFieldValueType, FieldTextFieldProps, FieldTextSlots } from '../../base-field'

const TEXT_VALUE_TYPE: BaseFieldValueType = 'text'

export const textProps = () => ({
    ...fieldProps(),
    ...antFormItemProps(),
    fieldProps: {
        type: Object as PropType<FieldTextFieldProps>,
        default: () => ({})
    }
})

export type TextProps = Partial<ExtractPropTypes<ReturnType<typeof textProps>>>;
export type TextInstance = ComponentPublicInstance<TextProps>;

const Text = defineComponent({
    inheritAttrs: false,
    name: 'ProText',
    props: textProps(),
    slots: Object as SlotsType<FieldSlots & FieldTextSlots>,
    setup (props, { slots }) {
        return () => {
            const { fieldProps: propsFieldProps, formItemProps: propsFormItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...pick(props, Object.keys(Form.Item.props)) as BaseFieldFormItemProps,
                ...propsFormItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: TEXT_VALUE_TYPE,
                fieldProps: propsFieldProps,
                formItemProps: needFormItemProps
            }
            return <Field {...needFieldProps} v-slots={slots}/>
        }
    }
})

Text.install = function (app: App): App {
    app.component(Text.name as string, Text)
    return app
}

export default Text
