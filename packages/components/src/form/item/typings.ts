import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { formItemProps as antFormItemProps } from 'ant-design-vue/es/form/FormItem'
import type { ColWrapperProps } from '../../base-form'

export const formItemProps = () => ({
    ...antFormItemProps(),
    colProps: {
        type: Object as PropType<ColWrapperProps>,
        default: () => ({})
    }
})

export interface FormItemSlots {
    default?: any;
    extra?: any;
    help?: any;
    label?: any;
    tooltip?: any;
}

export type FormItemProps = Partial<ExtractPropTypes<ReturnType<typeof formItemProps>>>;
export type FormItemInstance = ComponentPublicInstance<FormItemProps>;
