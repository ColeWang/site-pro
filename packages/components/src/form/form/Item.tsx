import type { App, ComponentPublicInstance, ExtractPropTypes, PropType, SlotsType } from 'vue'
import { defineComponent, unref } from 'vue'
import { Form } from 'ant-design-vue'
import { formItemProps as antFormItemProps } from 'ant-design-vue/es/form'
import type { BaseSlot } from '@site-pro/utils'
import { pick } from 'lodash-es'
import { useFormInstance } from '../base-form'
import type { ColWrapProps } from '../helpers/ColWrap'
import ColWrap from '../helpers/ColWrap'

export const formItemProps = () => ({
    ...antFormItemProps(),
    colProps: {
        type: Object as PropType<ColWrapProps>,
        default: () => ({})
    }
})

export type FormItemProps = Partial<ExtractPropTypes<ReturnType<typeof formItemProps>>>;
export type FormItemInstance = ComponentPublicInstance<FormItemProps>;

const FormItem = defineComponent({
    inheritAttrs: false,
    name: 'ProFormItem',
    props: formItemProps(),
    slots: Object as SlotsType<{
        default?: BaseSlot;
        extra?: BaseSlot;
        help?: BaseSlot;
        label?: BaseSlot;
        tooltip?: BaseSlot;
    }>,
    setup (props, { slots, attrs }) {
        const { formProps } = useFormInstance()

        return () => {
            const { colProps } = props
            const { grid } = unref(formProps) || {}

            const colWrapProps: ColWrapProps = {
                ...colProps,
                grid: grid
            }
            const formItemProps: FormItemProps = {
                ...pick(props, Object.keys(Form.Item.props as FormItemProps)),
                ...attrs
            }
            return (
                <ColWrap {...colWrapProps}>
                    <Form.Item {...formItemProps} v-slots={slots}/>
                </ColWrap>
            )
        }
    }
})

FormItem.install = function (app: App): App {
    app.component(FormItem.name as string, FormItem)
    return app
}

export default FormItem
