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
    FieldDatePickerFieldProps,
    FieldDatePickerSlots
} from '../../base-field'

const DATE_YEAR_VALUE_TYPE: BaseFieldValueType = 'dateYear'

export const dateYearProps = () => ({
    ...fieldProps(),
    ...antFormItemProps(),
    fieldProps: {
        type: Object as PropType<FieldDatePickerFieldProps>,
        default: () => ({})
    }
})

export type DateYearSlots = FieldSlots & FieldDatePickerSlots;
export type DateYearProps = Partial<ExtractPropTypes<ReturnType<typeof dateYearProps>>>;
export type DateYearInstance = ComponentPublicInstance<DateYearProps>;

const DateYear = defineComponent({
    compatConfig: { MODE: 3 },
    inheritAttrs: false,
    name: 'ProDateYear',
    props: dateYearProps(),
    slots: Object as SlotsType<DateYearSlots>,
    setup (props, { slots }) {
        return () => {
            const { formItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...pick(props, Object.keys(AntForm.Item.props)) as BaseFieldFormItemProps,
                ...formItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: DATE_YEAR_VALUE_TYPE,
                formItemProps: needFormItemProps
            }
            return <Field {...needFieldProps} v-slots={slots}/>
        }
    }
})

DateYear.install = function (app: App): App {
    app.component(DateYear.name as string, DateYear)
    return app
}

export default DateYear as typeof DateYear & Plugin
