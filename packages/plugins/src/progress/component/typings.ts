import type { ComponentPublicInstance, CSSProperties, ExtractPropTypes, PropType } from 'vue'

export const progressProps = () => ({
    style: {
        type: Object as PropType<CSSProperties>,
        default: () => ({})
    }
})

export type ProgressProps = Partial<ExtractPropTypes<ReturnType<typeof progressProps>>>;
export type ProgressInstance = ComponentPublicInstance<ProgressProps>;
