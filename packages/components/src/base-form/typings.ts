import type { ComponentPublicInstance, ComputedRef, ExtractPropTypes, PropType, Ref } from 'vue'
import { formProps as antFormProps } from 'ant-design-vue/es/form'
import type { FormInstance, FormProps, NamePath, Recordable, RowProps } from '@site-pro/utils'

export interface BaseFormUpdater {
    (value: any): any;
}

export type BaseFormModel = Recordable;

export interface BaseFormTransform {
    (values: BaseFormModel): BaseFormModel;
}

export interface BaseFormOnReset {
    (values: BaseFormModel): void;
}

export interface BaseFormOnValuesChange {
    (values: BaseFormModel): void;
}

export const baseFormProps = () => ({
    ...antFormProps(),
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
        type: Function as PropType<BaseFormTransform>,
        default: undefined
    },
    onSubmit: {
        type: Function as PropType<FormProps['onSubmit']>,
        default: undefined
    },
    onFinish: {
        type: Function as PropType<FormProps['onFinish']>,
        default: undefined
    },
    onFinishFailed: {
        type: Function as PropType<FormProps['onFinishFailed']>,
        default: undefined
    },
    onReset: {
        type: Function as PropType<BaseFormOnReset>,
        default: undefined
    },
    onValuesChange: {
        type: Function as PropType<BaseFormOnValuesChange>,
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