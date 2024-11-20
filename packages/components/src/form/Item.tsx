import type { App, ComponentPublicInstance, ExtractPropTypes, PropType, SlotsType } from 'vue'
import { defineComponent, unref } from 'vue'
import { Form } from 'ant-design-vue'
import { formItemProps as antFormItemProps } from 'ant-design-vue/es/form'
import type { BaseAttrs } from '@site-pro/utils'
import { pick } from 'lodash-es'
import type { ColWrapperProps } from '../base-form'
import { ColWrapper, useFormInstance } from '../base-form'

export const formItemProps = () => ({
    ...antFormItemProps(),
    colProps: {
        type: Object as PropType<ColWrapperProps>,
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
        default?: any;
        extra?: any;
        help?: any;
        label?: any;
        tooltip?: any;
    }>,
    setup (props, { slots, attrs }) {
        const { formProps } = useFormInstance()

        return () => {
            const { colProps } = props
            const { grid } = unref(formProps) || {}

            const colWrapperProps: ColWrapperProps = {
                ...colProps,
                grid: grid
            }

            const formItemProps: FormItemProps & BaseAttrs = {
                ...pick(props, Object.keys(Form.Item.props)) as FormItemProps,
                ...attrs
            }
            return (
                <ColWrapper {...colWrapperProps}>
                    <Form.Item {...formItemProps} v-slots={slots}/>
                </ColWrapper>
            )
        }
    }
})

FormItem.install = function (app: App): App {
    app.component(FormItem.name as string, FormItem)
    return app
}

export default FormItem
