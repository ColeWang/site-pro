import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'

export const loadingProps = () => ({
    visible: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    onAfterClose: {
        type: Function as PropType<() => void>,
        default: undefined
    }
})

export type LoadingProps = Partial<ExtractPropTypes<ReturnType<typeof loadingProps>>>;
export type LoadingInstance = ComponentPublicInstance<LoadingProps>;
