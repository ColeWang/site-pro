import type { App, ComponentPublicInstance, ExtractPropTypes, PropType, SlotsType } from 'vue'
import { defineComponent } from 'vue'
import type { BaseSlot } from '@site-pro/utils'
import type { BaseFormInstance, BaseFormProps } from '../base-form'
import { BaseForm, baseFormProps } from '../base-form'

export const formProps = () => ({
    ...baseFormProps(),
    layout: {
        type: String as PropType<'horizontal' | 'inline' | 'vertical'>,
        default: 'vertical'
    },
    onFormRef: {
        type: Function as PropType<(el: BaseFormInstance | null) => void>,
        default: undefined
    }
})

export type FormProps = Partial<ExtractPropTypes<ReturnType<typeof formProps>>>;
export type FormInstance = ComponentPublicInstance<FormProps>;

const Form = defineComponent({
    inheritAttrs: false,
    name: 'ProForm',
    props: formProps(),
    slots: Object as SlotsType<{
        default?: BaseSlot;
    }>,
    emits: ['formRef'],
    setup (props, { emit, slots, attrs }) {
        // 多层组件的数据或方法透传 Expose 并不直接提供帮助
        function onFormRef (el: any): void {
            emit('formRef', el as BaseFormInstance | null)
        }

        return () => {
            const baseFormProps: BaseFormProps = { ...attrs, ...props }
            return (
                <BaseForm {...baseFormProps} ref={onFormRef} v-slots={slots}/>
            )
        }
    }
})

Form.install = function (app: App): App {
    app.component(Form.name as string, Form)
    return app
}

export default Form
