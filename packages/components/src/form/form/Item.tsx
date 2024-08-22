import { defineComponent, unref } from 'vue'
import { formItemProps } from 'ant-design-vue/es/form'
import ColWrap from '../helpers/ColWrap'
import { useFormInstance } from '../base-form'
import { pick } from 'lodash-es'

export default defineComponent({
    inheritAttrs: false,
    props: {
        ...formItemProps(),
        colProps: {
            type: Object,
            default: () => ({})
        }
    },
    setup (props, { slots, attrs }) {
        const { formProps = {} } = useFormInstance()

        return () => {
            const { colProps } = props
            const { grid } = unref(formProps)

            const colWrapProps = {
                ...colProps,
                grid: !!grid
            }
            const formItemProps = {
                ...attrs,
                ...pick(props, Object.keys(Form.Item.props))
            }
            return (
                <ColWrap {...colWrapProps}>
                    <Form.Item {...formItemProps} v-slots={slots}/>
                </ColWrap>
            )
        }
    }
})
