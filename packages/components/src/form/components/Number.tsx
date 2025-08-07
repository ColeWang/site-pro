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
    FieldNumberFieldProps,
    FieldNumberSlots
} from '../../base-field'

const NUMBER_VALUE_TYPE: BaseFieldValueType = 'number'

export const numberProps = () => ({
    ...fieldProps(),
    ...antFormItemProps(),
    fieldProps: {
        type: Object as PropType<FieldNumberFieldProps>,
        default: () => ({})
    }
})

export type NumberSlots = FieldSlots & FieldNumberSlots;
export type NumberProps = Partial<ExtractPropTypes<ReturnType<typeof numberProps>>>;
export type NumberInstance = ComponentPublicInstance<NumberProps>;

const Number = defineComponent({
    compatConfig: { MODE: 3 },
    inheritAttrs: false,
    name: 'ProNumber',
    props: numberProps(),
    slots: Object as SlotsType<NumberSlots>,
    setup (props, { slots }) {
        return () => {
            const { formItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...pick(props, Object.keys(AntForm.Item.props)) as BaseFieldFormItemProps,
                ...formItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: NUMBER_VALUE_TYPE,
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

export default Number as typeof Number & Plugin
