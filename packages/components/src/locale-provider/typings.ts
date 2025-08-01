import type { ComponentPublicInstance, ExtractPropTypes, PropType, Ref } from 'vue'
import type { LocaleType } from '../locale'

export const localeProviderProps = () => ({
    locale: {
        type: Object as PropType<LocaleType>,
        default: () => ({})
    }
})

export interface LocaleProviderSlots {
    default?: any;
}

export type LocaleProviderProps = Partial<ExtractPropTypes<ReturnType<typeof localeProviderProps>>>;

export interface LocaleProviderExpose {
    locale: Ref<LocaleType>;
    __MARK__: string;
}

export type LocaleProviderInstance = ComponentPublicInstance<LocaleProviderProps, LocaleProviderExpose>;
