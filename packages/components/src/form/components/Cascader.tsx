import { defineComponent, PropType } from 'vue'
import { Form } from 'ant-design-vue'
import { pick } from 'lodash-es'
import type { FieldProps } from './Field'
import Field, { fieldProps } from './Field'
import { formItemProps } from '../../ant-typings'
import type { BaseFieldFieldProps, BaseFieldFormItemProps, BaseFieldValueType } from '../../base-field'
import { withInstall } from '../../tools'

const valueType: BaseFieldValueType = 'cascader'

const cascaderProps = () => ({
    ...fieldProps(),
    ...formItemProps(),
    fieldProps: {
        type: Object as PropType<BaseFieldFieldProps<'cascader'>>,
        default: () => ({})
    }
})

const Cascader = defineComponent({
    inheritAttrs: false,
    name: 'ProCascader',
    props: cascaderProps(),
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

export default withInstall(Cascader)
