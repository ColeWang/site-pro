import type { ComponentPublicInstance, ExtractPropTypes } from 'vue'
import { menuProps } from 'ant-design-vue/es/menu/src/Menu'

export const densityProps = () => ({
    ...menuProps()
})

export type DensityProps = Partial<ExtractPropTypes<ReturnType<typeof densityProps>>>;
export type DensityInstance = ComponentPublicInstance<DensityProps>;
