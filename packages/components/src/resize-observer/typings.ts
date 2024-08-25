import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'

export interface RectSizeType extends Partial<DOMRectReadOnly> {
    width: number;
    height: number;
}

export interface ResizeObserverOnResize {
    (size: RectSizeType): void;
}

export const resizeObserverProps = () => ({
    debounce: {
        type: Number as PropType<number>,
        default: 100
    },
    onResize: {
        type: Function as PropType<ResizeObserverOnResize>,
        default: undefined
    }
})

export type ResizeObserverProps = Partial<ExtractPropTypes<ReturnType<typeof resizeObserverProps>>>;
export type ResizeObserverInstance = ComponentPublicInstance<ResizeObserverProps>;

