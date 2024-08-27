import type { App, ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { defineComponent } from 'vue'
import { Form } from 'ant-design-vue'
import { formItemProps } from 'ant-design-vue/es/form'
import { pick } from 'lodash-es'
import type { FieldProps } from './Field'
import Field, { fieldProps, fieldSlots } from './Field'
import type { BaseFieldFormItemProps, BaseFieldValueType, FieldDatePickerFieldProps } from '../../base-field'
import { fieldDatePickerSlots } from '../../base-field'

const DATE_YEAR_VALUE_TYPE: BaseFieldValueType = 'dateYear'

export const dateYearProps = () => ({
    ...fieldProps(),
    ...formItemProps(),
    fieldProps: {
        type: Object as PropType<FieldDatePickerFieldProps>,
        default: () => ({})
    }
})

export type DateYearProps = Partial<ExtractPropTypes<ReturnType<typeof dateYearProps>>>;
export type DateYearInstance = ComponentPublicInstance<DateYearProps>;

const DateYear = defineComponent({
    inheritAttrs: false,
    name: 'ProDateYear',
    props: dateYearProps(),
    slots: Object.assign(fieldSlots, fieldDatePickerSlots),
    setup (props, { slots }) {
        return () => {
            const { fieldProps: propsFieldProps, formItemProps: propsFormItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...(pick(props, Object.keys(Form.Item.props)) as BaseFieldFormItemProps),
                ...propsFormItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: DATE_YEAR_VALUE_TYPE,
                fieldProps: propsFieldProps,
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

export default DateYear
