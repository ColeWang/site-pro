import type { App, ComponentPublicInstance, ExtractPropTypes, Plugin, PropType, SlotsType } from 'vue'
import { defineComponent } from 'vue'
import { Form as AntForm } from 'ant-design-vue'
import { formItemProps as antFormItemProps } from 'ant-design-vue/es/form'
import { pick } from 'lodash-es'
import type { FieldProps, FieldSlots } from './Field'
import Field, { fieldProps } from './Field'
import type {
    BaseFieldFormItemProps,
    BaseFieldValueType,
    FieldTextareaFieldProps,
    FieldTextareaSlots
} from '../../base-field'

const TEXTAREA_VALUE_TYPE: BaseFieldValueType = 'textarea'

export const textareaProps = () => ({
    ...fieldProps(),
    ...antFormItemProps(),
    fieldProps: {
        type: Object as PropType<FieldTextareaFieldProps>,
        default: () => ({})
    }
})

export type TextareaSlots = FieldSlots & FieldTextareaSlots;
export type TextareaProps = Partial<ExtractPropTypes<ReturnType<typeof textareaProps>>>;
export type TextareaInstance = ComponentPublicInstance<TextareaProps>;

const Textarea = defineComponent({
    compatConfig: { MODE: 3 },
    inheritAttrs: false,
    name: 'ProTextarea',
    props: textareaProps(),
    slots: Object as SlotsType<TextareaSlots>,
    setup (props, { slots }) {
        return () => {
            const { formItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...pick(props, Object.keys(AntForm.Item.props)) as BaseFieldFormItemProps,
                ...formItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: TEXTAREA_VALUE_TYPE,
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

export default Textarea as typeof Textarea & Plugin
