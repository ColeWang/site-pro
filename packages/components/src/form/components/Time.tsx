import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { defineComponent } from 'vue'
import { Form } from 'ant-design-vue'
import { formItemProps } from 'ant-design-vue/es/form'
import { pick } from 'lodash-es'
import type { FieldProps } from './Field'
import Field, { fieldProps, fieldSlots } from './Field'
import type { BaseFieldFormItemProps, BaseFieldValueType, FieldTimePickerFieldProps } from '../../base-field'
import { fieldTimePickerSlots } from '../../base-field'

const TIME_VALUE_TYPE: BaseFieldValueType = 'time'

export const timeProps = () => ({
    ...fieldProps(),
    ...formItemProps(),
    fieldProps: {
        type: Object as PropType<FieldTimePickerFieldProps>,
        default: () => ({})
    }
})

export type TimeProps = Partial<ExtractPropTypes<ReturnType<typeof timeProps>>>;
export type TimeInstance = ComponentPublicInstance<TimeProps>;

export default defineComponent({
    inheritAttrs: false,
    name: 'ProTime',
    props: timeProps(),
    slots: Object.assign(fieldSlots, fieldTimePickerSlots),
    setup (props, { slots }) {
        return () => {
            const { fieldProps: propsFieldProps, formItemProps: propsFormItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...(pick(props, Object.keys(Form.Item.props)) as BaseFieldFormItemProps),
                ...propsFormItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: TIME_VALUE_TYPE,
                fieldProps: propsFieldProps,
                formItemProps: needFormItemProps
            }
            return <Field {...needFieldProps} v-slots={slots}/>
        }
    }
})
