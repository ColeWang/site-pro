import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'

export const extraProps = () => ({
    seize: {
        type: Number as PropType<number>,
        default: 1
    }
})

export interface ExtraSlots {
    default?: any;
}

export type ExtraProps = Partial<ExtractPropTypes<ReturnType<typeof extraProps>>>;
export type ExtraInstance = ComponentPublicInstance<ExtraProps>;
