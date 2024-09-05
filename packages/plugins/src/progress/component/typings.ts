import type { ComponentPublicInstance, CSSProperties, ExtractPropTypes, PropType } from 'vue'

export const pluginProgressProps = () => ({
    style: {
        type: Object as PropType<CSSProperties>,
        default: () => ({})
    }
})

export type PluginProgressProps = Partial<ExtractPropTypes<ReturnType<typeof pluginProgressProps>>>;
export type PluginProgressInstance = ComponentPublicInstance<PluginProgressProps>;
