import type { App, Plugin, SlotsType } from 'vue'
import { defineComponent } from 'vue'
import { Form as AForm } from 'ant-design-vue'
import { FormItem } from '../item'
import { FormGroup } from '../group'
import { FormDependency } from '../dependency'
import type { BaseFormProps } from '../../base-form'
import { BaseForm } from '../../base-form'
import type { FormSlots } from './typings'
import { formProps } from './typings'

const Form = defineComponent({
    inheritAttrs: false,
    name: 'ProForm',
    props: formProps(),
    slots: Object as SlotsType<FormSlots>,
    emits: ['formRef'],
    setup (props, { emit, slots, attrs }) {
        // 多层组件的数据或方法透传 Expose 并不直接提供帮助
        function onBaseFormRef (el: any): void {
            emit('formRef', el)
        }

        return () => {
            const baseFormProps: BaseFormProps = { ...attrs, ...props }
            return (
                <BaseForm {...baseFormProps} ref={onBaseFormRef} v-slots={slots}/>
            )
        }
    }
})

Form.install = function (app: App): App {
    app.component(Form.name as string, Form)
    return app
}

Form.useForm = AForm.useForm
Form.Item = FormItem
Form.Group = FormGroup
Form.Dependency = FormDependency

export default Form as typeof Form & Plugin & {
    readonly useForm: typeof AForm.useForm;
    readonly Item: typeof FormItem;
    readonly Group: typeof FormGroup;
    readonly Dependency: typeof FormDependency;
}
