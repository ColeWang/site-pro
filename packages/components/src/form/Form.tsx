import type { App, ComponentPublicInstance, ExtractPropTypes, PropType, SlotsType } from 'vue'
import { defineComponent } from 'vue'
import type { BaseFormInstance, BaseFormProps, BaseFormSlots } from '../base-form'
import { BaseForm, baseFormProps } from '../base-form'

export const formProps = () => ({
    ...baseFormProps(),
    onFormRef: {
        type: Function as PropType<(el: BaseFormInstance | null) => void>,
        default: undefined
    }
})

export type FormSlots = BaseFormSlots;
export type FormProps = Partial<ExtractPropTypes<ReturnType<typeof formProps>>>;
export type FormInstance = ComponentPublicInstance<FormProps>;

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

export default Form
