import type { App, ComponentPublicInstance, ExtractPropTypes, PropType, SlotsType } from 'vue'
import { defineComponent } from 'vue'
import { Form } from 'ant-design-vue'
import { formItemProps as antFormItemProps } from 'ant-design-vue/es/form'
import { pick } from 'lodash-es'
import type { FieldProps, FieldSlots } from './Field'
import Field, { fieldProps } from './Field'
import type {
    BaseFieldFormItemProps,
    BaseFieldValueType,
    FieldDatePickerFieldProps,
    FieldDatePickerSlots
} from '../../base-field'

const DATE_QUARTER_VALUE_TYPE: BaseFieldValueType = 'dateQuarter'

export const dateQuarterProps = () => ({
    ...fieldProps(),
    ...antFormItemProps(),
    fieldProps: {
        type: Object as PropType<FieldDatePickerFieldProps>,
        default: () => ({})
    }
})

export type DateQuarterProps = Partial<ExtractPropTypes<ReturnType<typeof dateQuarterProps>>>;
export type DateQuarterInstance = ComponentPublicInstance<DateQuarterProps>;

const DateQuarter = defineComponent({
    inheritAttrs: false,
    name: 'ProDateQuarter',
    props: dateQuarterProps(),
    slots: Object as SlotsType<FieldSlots & FieldDatePickerSlots>,
    setup (props, { slots }) {
        return () => {
            const { fieldProps: propsFieldProps, formItemProps: propsFormItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...pick(props, Object.keys(Form.Item.props)) as BaseFieldFormItemProps,
                ...propsFormItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: DATE_QUARTER_VALUE_TYPE,
                fieldProps: propsFieldProps,
                formItemProps: needFormItemProps
            }
            return <Field {...needFieldProps} v-slots={slots}/>
        }
    }
})

DateQuarter.install = function (app: App): App {
    app.component(DateQuarter.name as string, DateQuarter)
    return app
}

export default DateQuarter
