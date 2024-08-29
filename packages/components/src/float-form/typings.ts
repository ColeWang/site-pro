import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import type { BaseSlot, DrawerProps, ModalProps } from '@site-pro/utils'
import type { BaseFormInstance, BaseFormModel, SubmitterProps } from '../base-form'
import { baseFormProps } from '../base-form'

export const floatFormProps = () => ({
    ...baseFormProps(),
    layout: {
        type: String as PropType<'horizontal' | 'inline' | 'vertical'>,
        default: 'vertical'
    },
    open: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    title: {
        type: String as PropType<string>,
        default: undefined
    },
    width: {
        type: Number as PropType<number>,
        default: 512
    },
    maskClosable: {
        type: Boolean as PropType<boolean>,
        default: true
    },
    destroyOnClose: {
        type: Boolean as PropType<boolean>,
        default: true
    },
    extraProps: {
        type: Object as PropType<any>,
        default: () => ({})
    },
    submitter: {
        type: Object as PropType<SubmitterProps>,
        default: () => ({})
    },
    trigger: {
        type: Function as PropType<BaseSlot>,
        default: undefined
    },
    onFinish: {
        type: Function as PropType<(values: BaseFormModel) => Promise<boolean>>,
        default: undefined
    },
    onFormRef: {
        type: Function as PropType<(el: BaseFormInstance | null) => void>,
        default: undefined
    },
    onOpen: {
        type: Function as PropType<() => void>,
        default: undefined
    },
    onCancel: {
        type: Function as PropType<() => void>,
        default: undefined
    },
    onAfterClose: {
        type: Function as PropType<() => void>,
        default: undefined
    },
    onOpenChange: {
        type: Function as PropType<(value: boolean) => void>,
        default: undefined
    },
    onLoadingChange: {
        type: Function as PropType<(value: boolean) => void>,
        default: undefined
    }
})

export type FloatFormProps = Partial<ExtractPropTypes<ReturnType<typeof floatFormProps>>>;

export interface FloatFormExpose {
    open: () => void;
    close: () => void;
}

export const modalFormProps = () => ({
    ...floatFormProps(),
    extraProps: {
        type: Object as PropType<ModalProps>,
        default: () => ({})
    }
})

export type ModalFormProps = Partial<ExtractPropTypes<ReturnType<typeof modalFormProps>>>;
export type ModalFormExpose = FloatFormExpose;
export type ModalFormInstance = ComponentPublicInstance<ModalFormProps, ModalFormExpose>;

export const drawerFormProps = () => ({
    ...floatFormProps(),
    extraProps: {
        type: Object as PropType<DrawerProps>,
        default: () => ({})
    }
})

export type DrawerFormProps = Partial<ExtractPropTypes<ReturnType<typeof drawerFormProps>>>;
export type DrawerFormExpose = FloatFormExpose;
export type DrawerFormInstance = ComponentPublicInstance<DrawerFormProps, DrawerFormExpose>;
