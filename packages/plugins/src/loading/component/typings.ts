import type { PropType, ExtractPropTypes, ComponentPublicInstance } from 'vue'

export const pluginLoadingProps = () => ({
    visible: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    onAfterClose: {
        type: Function as PropType<() => void>,
        default: undefined
    }
})

export type PluginLoadingProps = Partial<ExtractPropTypes<ReturnType<typeof pluginLoadingProps>>>;
export type PluginLoadingInstance = ComponentPublicInstance<PluginLoadingProps>;
