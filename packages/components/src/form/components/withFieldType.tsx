import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { Form } from 'ant-design-vue'
import { pick } from 'lodash-es'
import type { BaseFieldFieldProps, BaseFieldFormItemProps, BaseFieldValueType } from '../../base-field'
import type { FieldProps } from './Field'
import Field, { fieldProps } from './Field'
import { formItemProps } from '../../ant-typings'

function withFieldType<T extends BaseFieldValueType, F = BaseFieldFieldProps<T>> (valueType: T, fieldName: string) {
    return defineComponent({
        inheritAttrs: false,
        name: fieldName,
        props: {
            ...fieldProps(),
            ...formItemProps(),
            fieldProps: {
                type: Object as PropType<F>,
                default: () => ({})
            }
        },
        setup (props, { slots }) {
            return () => {
                const { fieldProps: propsFieldProps, formItemProps: propsFormItemProps } = props
                const needFormItemProps: BaseFieldFormItemProps = {
                    ...(pick(props, Object.keys(Form.Item.props)) as BaseFieldFormItemProps),
                    ...propsFormItemProps,
                }
                const needFieldProps: FieldProps = {
                    ...props,
                    valueType: valueType,
                    fieldProps: propsFieldProps,
                    formItemProps: needFormItemProps
                }
                return <Field {...needFieldProps} v-slots={slots}/>
            }
        }
    })
}

export default withFieldType
