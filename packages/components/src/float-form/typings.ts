import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import type { BaseSlot, Recordable } from '@site-pro/utils'
import type { BaseFormInstance, BaseFormSlots, SubmitterProps } from '../base-form'
import { baseFormProps } from '../base-form'
import type { DrawerProps, ModalProps } from '../ant-typings'

export const floatFormProps = () => ({
    ...baseFormProps(),
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
        type: Function as PropType<(values: Recordable) => Promise<boolean>>,
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

export interface FloatFormSlots extends BaseFormSlots {
    trigger?: any;
}

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

export type ModalFormSlots = FloatFormSlots;
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

export type DrawerFormSlots = FloatFormSlots;
export type DrawerFormProps = Partial<ExtractPropTypes<ReturnType<typeof drawerFormProps>>>;
export type DrawerFormExpose = FloatFormExpose;
export type DrawerFormInstance = ComponentPublicInstance<DrawerFormProps, DrawerFormExpose>;
