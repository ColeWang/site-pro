import type { ComponentPublicInstance, ComputedRef, ExtractPropTypes, PropType, Ref } from 'vue'
import { formProps as antFormProps } from 'ant-design-vue/es/form'
import type { FormInstance, NamePath, Recordable, RowProps, ValidateErrorEntity } from '@site-pro/utils'

export type BaseFormModel = Recordable;

export interface BaseFormUpdater {
    (value: any): any;
}

export type BaseFormLayout = 'horizontal' | 'vertical' | 'inline';

export const baseFormProps = () => ({
    ...antFormProps(),
    layout: {
        type: String as PropType<BaseFormLayout>,
        default: 'horizontal'
    },
    initialValues: {
        type: Object as PropType<Recordable>,
        default: () => ({})
    },
    submitOnReset: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    grid: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    rowProps: {
        type: Object as PropType<RowProps>,
        default: () => ({})
    },
    transform: {
        type: Function as PropType<(values: BaseFormModel) => BaseFormModel>,
        default: undefined
    },
    onSubmit: {
        type: Function as PropType<(evt: Event) => void>,
        default: undefined
    },
    onFinish: {
        type: Function as PropType<(values: BaseFormModel) => void>,
        default: undefined
    },
    onFinishFailed: {
        type: Function as PropType<(errorInfo: ValidateErrorEntity) => void>,
        default: undefined
    },
    onReset: {
        type: Function as PropType<(values: BaseFormModel) => void>,
        default: undefined
    },
    onValuesChange: {
        type: Function as PropType<(values: BaseFormModel) => void>,
        default: undefined
    }
})

export type BaseFormProps = Partial<ExtractPropTypes<ReturnType<typeof baseFormProps>>>;

export interface BaseFormExpose {
    formInstanceRef: Ref<FormInstance | null>;
    model: Ref<BaseFormModel>;
    formProps: ComputedRef<BaseFormProps>;
    setModelValue: (namePath: NamePath, value: any) => BaseFormModel;
    getModelValue: (namePath: NamePath) => BaseFormModel;
    updateModelValue: (namePath: NamePath, updater: BaseFormUpdater) => BaseFormModel;
    deleteModelValue: (namePath: NamePath) => boolean;
    submit: () => void;
    validate: (names?: NamePath[]) => Promise<BaseFormModel>;
    resetFields: (names?: NamePath[]) => void;
}

export type BaseFormInstance = ComponentPublicInstance<BaseFormProps, BaseFormExpose>;
