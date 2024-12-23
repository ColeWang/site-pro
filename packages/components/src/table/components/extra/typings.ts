import type { ComponentPublicInstance, ExtractPropTypes } from 'vue'

export const extraProps = () => undefined

export interface ExtraSlots {
    default?: any;
}

export type ExtraProps = Partial<ExtractPropTypes<ReturnType<typeof extraProps>>>;
export type ExtraInstance = ComponentPublicInstance<ExtraProps>;
