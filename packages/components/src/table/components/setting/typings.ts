import type { ComponentPublicInstance, ExtractPropTypes } from 'vue'

export const settingProps = () => ({
    checkable: {
        type: Boolean,
        default: true
    },
    draggable: {
        type: Boolean,
        default: true
    }
})

export type SettingProps = Partial<ExtractPropTypes<ReturnType<typeof settingProps>>>;
export type SettingInstance = ComponentPublicInstance<SettingProps>;
