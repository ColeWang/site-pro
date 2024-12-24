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
    FieldDatePickerFieldProps,
    FieldDatePickerSlots
} from '../../base-field'

const DATE_WEEK_VALUE_TYPE: BaseFieldValueType = 'dateWeek'

export const dateWeekProps = () => ({
    ...fieldProps(),
    ...antFormItemProps(),
    fieldProps: {
        type: Object as PropType<FieldDatePickerFieldProps>,
        default: () => ({})
    }
})

export type DateWeekSlots = FieldSlots & FieldDatePickerSlots;
export type DateWeekProps = Partial<ExtractPropTypes<ReturnType<typeof dateWeekProps>>>;
export type DateWeekInstance = ComponentPublicInstance<DateWeekProps>;

const DateWeek = defineComponent({
    inheritAttrs: false,
    name: 'ProDateWeek',
    props: dateWeekProps(),
    slots: Object as SlotsType<DateWeekSlots>,
    setup (props, { slots }) {
        return () => {
            const { formItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...pick(props, Object.keys(Form.Item.props)) as BaseFieldFormItemProps,
                ...formItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: DATE_WEEK_VALUE_TYPE,
                formItemProps: needFormItemProps
            }
            return <Field {...needFieldProps} v-slots={slots}/>
        }
    }
})

DateWeek.install = function (app: App): App {
    app.component(DateWeek.name as string, DateWeek)
    return app
}

export default DateWeek as typeof DateWeek & Plugin
