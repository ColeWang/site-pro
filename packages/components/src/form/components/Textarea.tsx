import type { App, ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { defineComponent } from 'vue'
import { Form } from 'ant-design-vue'
import { formItemProps } from 'ant-design-vue/es/form'
import { pick } from 'lodash-es'
import type { FieldProps } from './Field'
import Field, { fieldProps, fieldSlots } from './Field'
import type { BaseFieldFormItemProps, BaseFieldValueType, FieldTextareaFieldProps } from '../../base-field'
import { fieldTextareaSlots } from '../../base-field'

const TEXTAREA_VALUE_TYPE: BaseFieldValueType = 'textarea'

export const textareaProps = () => ({
    ...fieldProps(),
    ...formItemProps(),
    fieldProps: {
        type: Object as PropType<FieldTextareaFieldProps>,
        default: () => ({})
    }
})

export type TextareaProps = Partial<ExtractPropTypes<ReturnType<typeof textareaProps>>>;
export type TextareaInstance = ComponentPublicInstance<TextareaProps>;

const Textarea = defineComponent({
    inheritAttrs: false,
    name: 'ProTextarea',
    props: textareaProps(),
    slots: Object.assign(fieldSlots, fieldTextareaSlots),
    setup (props, { slots }) {
        return () => {
            const { fieldProps: propsFieldProps, formItemProps: propsFormItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...(pick(props, Object.keys(Form.Item.props)) as BaseFieldFormItemProps),
                ...propsFormItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: TEXTAREA_VALUE_TYPE,
                fieldProps: propsFieldProps,
                formItemProps: needFormItemProps
            }
            return <Field {...needFieldProps} v-slots={slots}/>
        }
    }
})

Textarea.install = function (app: App): App {
    app.component(Textarea.name as string, Textarea)
    return app
}

export default Textarea
