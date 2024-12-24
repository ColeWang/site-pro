import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'

export type ActionType = 'default' | 'primary' | 'warning' | 'error';

export const actionProps = () => ({
    type: {
        type: String as PropType<ActionType>,
        default: 'primary'
    },
    onClick: {
        type: Function as PropType<(evt: Event) => void>,
        default: undefined
    }
})

export interface ActionSlots {
    default?: any;
}

export type ActionProps = Partial<ExtractPropTypes<ReturnType<typeof actionProps>>>;
export type ActionInstance = ComponentPublicInstance<ActionProps>;

export const actionGroupProps = () => ({
    max: {
        type: Number as PropType<number>,
        default: 2
    },
    size: {
        type: Number as PropType<number>,
        default: undefined
    }
})

export interface ActionGroupSlots {
    default?: any;
}

export type ActionGroupProps = Partial<ExtractPropTypes<ReturnType<typeof actionGroupProps>>>;
export type ActionGroupInstance = ComponentPublicInstance<ActionGroupProps>;
