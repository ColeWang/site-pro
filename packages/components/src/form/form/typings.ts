import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import type { BaseFormInstance, BaseFormSlots } from '../../base-form'
import { baseFormProps } from '../../base-form'

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
