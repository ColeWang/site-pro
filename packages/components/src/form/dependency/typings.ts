import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import type { NamePath } from '@site-pro/utils'
import type { ColWrapperProps } from '../../base-form'

export const formDependencyProps = () => ({
    name: {
        type: Array as PropType<NamePath[]>,
        default: () => ([])
    },
    colProps: {
        type: Object as PropType<ColWrapperProps>,
        default: () => ({})
    }
})

export interface FormDependencySlots {
    default?: any;
}

export type FormDependencyProps = Partial<ExtractPropTypes<ReturnType<typeof formDependencyProps>>>;
export type FormDependencyInstance = ComponentPublicInstance<FormDependencyProps>;
