import type { PropType } from 'vue'
import type { BaseSlot, DrawerProps, ModalProps } from '@site-pro/utils'
import type { SubmitterProps } from '../base-form'
import { baseFormProps } from '../base-form'

export const floatFormProps = () => ({
    ...baseFormProps(),
    layout: {
        type: String,
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

export const modalFormProps = () => ({
    ...floatFormProps(),
    extraProps: {
        type: Object as PropType<ModalProps>,
        default: () => ({})
    }
})

export const drawerFormProps = () => ({
    ...floatFormProps(),
    extraProps: {
        type: Object as PropType<DrawerProps>,
        default: () => ({})
    }
})

