import type { App, ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { defineComponent } from 'vue'
import { Form } from 'ant-design-vue'
import { formItemProps } from 'ant-design-vue/es/form'
import { pick } from 'lodash-es'
import type { FieldProps } from './Field'
import Field, { fieldProps, fieldSlots } from './Field'
import type { BaseFieldFormItemProps, BaseFieldValueType, FieldNumberFieldProps } from '../../base-field'
import { fieldNumberSlots } from '../../base-field'

const NUMBER_VALUE_TYPE: BaseFieldValueType = 'number'

export const numberProps = () => ({
    ...fieldProps(),
    ...formItemProps(),
    fieldProps: {
        type: Object as PropType<FieldNumberFieldProps>,
        default: () => ({})
    }
})

export type NumberProps = Partial<ExtractPropTypes<ReturnType<typeof numberProps>>>;
export type NumberInstance = ComponentPublicInstance<NumberProps>;

const Number = defineComponent({
    inheritAttrs: false,
    name: 'ProNumber',
    props: numberProps(),
    slots: Object.assign(fieldSlots, fieldNumberSlots),
    setup (props, { slots }) {
        return () => {
            const { fieldProps: propsFieldProps, formItemProps: propsFormItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...(pick(props, Object.keys(Form.Item.props)) as BaseFieldFormItemProps),
                ...propsFormItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: NUMBER_VALUE_TYPE,
                fieldProps: propsFieldProps,
                formItemProps: needFormItemProps
            }
            return <Field {...needFieldProps} v-slots={slots}/>
        }
    }
})

Number.install = function (app: App): App {
    app.component(Number.name as string, Number)
    return app
}

export default Number
