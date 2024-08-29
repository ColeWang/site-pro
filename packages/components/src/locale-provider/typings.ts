import type { ComponentPublicInstance, ExtractPropTypes, PropType, Ref } from 'vue'

export interface LocaleType {
    [key: string]: string | LocaleType | LocaleType[];
}

// 默认值 zhCN
export const localeProviderProps = () => ({
    locale: {
        type: Object as PropType<LocaleType>,
        default: () => ({})
    }
})

export type LocaleProviderProps = Partial<ExtractPropTypes<ReturnType<typeof localeProviderProps>>>;

export interface LocaleProviderExpose {
    locale: Ref<LocaleType>;
    __MARK__: string;
}

export type LocaleProviderInstance = ComponentPublicInstance<LocaleProviderProps, LocaleProviderExpose>;

