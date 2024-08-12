import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { Form } from 'ant-design-vue'
import type { BaseValueType } from '../../base-field/typings'
import Field from './Field'
import { pick } from 'lodash-es'

function HocField<T = any> (valueType: BaseValueType) {
    return defineComponent({
        inheritAttrs: false,
        props: {
            ...Field.props,
            ...Form.Item.props,
            fieldProps: {
                type: Object as PropType<T>,
                default: () => ({})
            }
        },
        setup (props, { slots }) {
            return () => {
                const { fieldProps, formItemProps } = props
                const needFormItemProps = {
                    ...pick(props, Object.keys(Form.Item.props)),
                    ...formItemProps,
                }
                const needFieldProps = {
                    ...props,
                    valueType: valueType,
                    fieldProps: fieldProps,
                    formItemProps: needFormItemProps
                }
                return <Field {...needFieldProps} v-slots={slots}/>
            }
        }
    })
}

export default HocField
