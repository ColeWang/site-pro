import type { ComponentPublicInstance, ExtractPropTypes } from 'vue'
import { menuProps as antMenuProps } from 'ant-design-vue/es/menu/src/Menu'

export const densityProps = () => ({
    ...antMenuProps()
})

export type DensityProps = Partial<ExtractPropTypes<ReturnType<typeof densityProps>>>;
export type DensityInstance = ComponentPublicInstance<DensityProps>;
