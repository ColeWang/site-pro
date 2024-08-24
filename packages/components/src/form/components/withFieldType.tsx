import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { pick } from 'lodash-es'
import type { FieldProps } from './Field'
import Field, { fieldProps } from './Field'
import { formItemProps as antFormItemProps } from '../../ant-typings'
import type { BaseFieldValueType, BaseFieldValueTypeWithFieldProps } from '../../base-field/typings'

type FieldFormItemProps = FieldProps['formItemProps'];
type FieldType = BaseFieldValueTypeWithFieldProps;

const formItemProps = antFormItemProps()

function withFieldType<T extends BaseFieldValueType, F = FieldType[T]> (valueType: T, fieldName: string) {
    return defineComponent({
        inheritAttrs: false,
        name: fieldName,
        props: {
            ...fieldProps(),
            ...formItemProps,
            fieldProps: {
                type: Object as PropType<F>,
                default: () => ({})
            }
        },
        setup (props, { slots }) {
            return () => {
                const { fieldProps: propsFieldProps, formItemProps: propsFormItemProps } = props
                const needFormItemProps: FieldFormItemProps = {
                    ...pick(props, Object.keys(formItemProps)),
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
