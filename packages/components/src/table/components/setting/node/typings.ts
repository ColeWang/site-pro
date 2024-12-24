import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'

export const nodeProps = () => ({
    columnKey: {
        type: String as PropType<string>,
        default: undefined
    },
    title: {
        type: String as PropType<string>,
        default: undefined
    },
    fixed: {
        type: String as PropType<string>,
        default: undefined
    },
    disabledSettingIcon: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    onChange: {
        type: Function as PropType<(key: string, fixed: boolean) => void>,
        default: undefined
    }
})

export type NodeProps = Partial<ExtractPropTypes<ReturnType<typeof nodeProps>>>;
export type NodeInstance = ComponentPublicInstance<NodeProps>;
