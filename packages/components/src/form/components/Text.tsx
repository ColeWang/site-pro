import type { App, ComponentPublicInstance, ExtractPropTypes, Plugin, PropType, SlotsType } from 'vue'
import { defineComponent } from 'vue'
import { Form as AntForm } from 'ant-design-vue'
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

export type TextSlots = FieldSlots & FieldTextSlots;
export type TextProps = Partial<ExtractPropTypes<ReturnType<typeof textProps>>>;
export type TextInstance = ComponentPublicInstance<TextProps>;

const Text = defineComponent({
    inheritAttrs: false,
    name: 'ProText',
    props: textProps(),
    slots: Object as SlotsType<TextSlots>,
    setup (props, { slots }) {
        return () => {
            const { formItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...pick(props, Object.keys(AntForm.Item.props)) as BaseFieldFormItemProps,
                ...formItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: TEXT_VALUE_TYPE,
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

export default Text as typeof Text & Plugin
