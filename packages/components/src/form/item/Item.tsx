import type { App, Plugin, SlotsType } from 'vue'
import { defineComponent, unref } from 'vue'
import { Form as AntForm } from 'ant-design-vue'
import type { BaseAttrs } from '@site-pro/utils'
import { pick } from 'lodash-es'
import type { ColWrapperProps } from '../../base-form'
import { ColWrapper, useFormInstance } from '../../base-form'
import type { FormItemProps, FormItemSlots } from './typings'
import { formItemProps } from './typings'

const FormItem = defineComponent({
    inheritAttrs: false,
    name: 'ProFormItem',
    props: formItemProps(),
    slots: Object as SlotsType<FormItemSlots>,
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
                ...pick(props, Object.keys(AntForm.Item.props)) as FormItemProps,
                ...attrs
            }
            return (
                <ColWrapper {...colWrapperProps}>
                    <AntForm.Item {...formItemProps} v-slots={slots}/>
                </ColWrapper>
            )
        }
    }
})

FormItem.install = function (app: App): App {
    app.component(FormItem.name as string, FormItem)
    return app
}

export default FormItem as typeof FormItem & Plugin
