import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'

export const collapseTransitionProps = () => ({
    appear: {
        type: Boolean as PropType<boolean>,
        default: false,
    }
})

export type CollapseTransitionProps = Partial<ExtractPropTypes<ReturnType<typeof collapseTransitionProps>>>;
export type CollapseTransitionInstance = ComponentPublicInstance<CollapseTransitionProps>;
