import type { ComponentPublicInstance, ComputedRef, ExtractPropTypes, PropType, Ref } from 'vue'
import type { BaseNamePath, Recordable } from '@site-pro/utils'
import type { FormInstance, FormProps, RowProps } from '../../ant-typings'
import { formProps } from '../../ant-typings'

export type BaseFormModel = Recordable;

export interface Updater {
    (value: any): any;
}

type BaseFormTransform = (values: BaseFormModel) => BaseFormModel;
type BaseFormOnReset = (values: BaseFormModel) => void;
type BaseFormOnValuesChange = (values: BaseFormModel) => void;

export const baseFormProps = () => ({
    ...formProps(),
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
    setModelValue: (namePath: BaseNamePath, value: any) => BaseFormModel;
    getModelValue: (namePath: BaseNamePath) => BaseFormModel;
    updateModelValue: (namePath: BaseNamePath, updater: Updater) => BaseFormModel;
    deleteModelValue: (namePath: BaseNamePath) => boolean;
    submit: () => void;
    validate: (names?: BaseNamePath[]) => Promise<BaseFormModel>;
    resetFields: (names?: BaseNamePath[]) => void;
}

export type BaseFormInstance = ComponentPublicInstance<BaseFormProps, BaseFormExpose>;
