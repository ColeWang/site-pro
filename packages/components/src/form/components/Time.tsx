import type { App, ComponentPublicInstance, ExtractPropTypes, Plugin, PropType, SlotsType } from 'vue'
import { defineComponent } from 'vue'
import { Form } from 'ant-design-vue'
import { formItemProps as antFormItemProps } from 'ant-design-vue/es/form'
import { pick } from 'lodash-es'
import type { FieldProps, FieldSlots } from './Field'
import Field, { fieldProps } from './Field'
import type {
    BaseFieldFormItemProps,
    BaseFieldValueType,
    FieldTimePickerFieldProps,
    FieldTimePickerSlots
} from '../../base-field'

const TIME_VALUE_TYPE: BaseFieldValueType = 'time'

export const timeProps = () => ({
    ...fieldProps(),
    ...antFormItemProps(),
    fieldProps: {
        type: Object as PropType<FieldTimePickerFieldProps>,
        default: () => ({})
    }
})

export type TimeSlots = FieldSlots & FieldTimePickerSlots;
export type TimeProps = Partial<ExtractPropTypes<ReturnType<typeof timeProps>>>;
export type TimeInstance = ComponentPublicInstance<TimeProps>;

const Time = defineComponent({
    inheritAttrs: false,
    name: 'ProTime',
    props: timeProps(),
    slots: Object as SlotsType<TimeSlots>,
    setup (props, { slots }) {
        return () => {
            const { formItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...pick(props, Object.keys(Form.Item.props)) as BaseFieldFormItemProps,
                ...formItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: TIME_VALUE_TYPE,
                formItemProps: needFormItemProps
            }
            return <Field {...needFieldProps} v-slots={slots}/>
        }
    }
})

Time.install = function (app: App): App {
    app.component(Time.name as string, Time)
    return app
}

export default Time as typeof Time & Plugin
