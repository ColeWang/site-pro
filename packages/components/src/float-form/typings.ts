import type { PropType } from 'vue'
import type { BaseSlot } from '@site-pro/utils'
import type { SubmitterProps } from '../base-form'
import { baseFormProps } from '../base-form'

export interface FloatFormOnOpen {
    (): void;
}

export interface FloatFormOnCancel {
    (): void;
}

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
        type: Function as PropType<FloatFormOnOpen>,
        default: undefined
    },
    onCancel: {
        type: Function as PropType<FloatFormOnCancel>,
        default: undefined
    },
    onAfterClose: {
        type: Function,
        default: undefined
    },
    onOpenChange: {
        type: Function,
        default: undefined
    },
    onLoadingChange: {
        type: Function,
        default: undefined
    }
})

