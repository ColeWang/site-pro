import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { configProviderProps as antConfigProviderProps } from 'ant-design-vue/es/config-provider/context'
import type { UseBreakPointOptions } from '../query-filter'

export interface ConfigProviderExtended {
    QueryFilter?: UseBreakPointOptions;
}

export const configProviderProps = () => ({
    ...antConfigProviderProps(),
    dark: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    compact: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    extended: {
        type: Object as PropType<ConfigProviderExtended>,
        default: () => ({})
    }
})

export interface ConfigProviderSlots {
    default?: any;
}

export type ConfigProviderProps = Partial<ExtractPropTypes<ReturnType<typeof configProviderProps>>>;

export type ConfigProviderExpose = ConfigProviderProps;

export type ConfigProviderInstance = ComponentPublicInstance<ConfigProviderProps, ConfigProviderExpose>;
