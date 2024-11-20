import type { App, ComponentPublicInstance, ExtractPropTypes, PropType, SlotsType } from 'vue'
import { defineComponent, unref } from 'vue'
import type { NamePath, Recordable } from '@site-pro/utils'
import { cloneProxyToRaw } from '@site-pro/utils'
import { isFunction, reduce, set } from 'lodash-es'
import type { ColWrapperProps } from '../base-form'
import { ColWrapper, useFormInstance } from '../base-form'

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

export type FormDependencyProps = Partial<ExtractPropTypes<ReturnType<typeof formDependencyProps>>>;
export type FormDependencyInstance = ComponentPublicInstance<FormDependencyProps>;

const FormDependency = defineComponent({
    inheritAttrs: false,
    name: 'ProFormDependency',
    props: formDependencyProps(),
    slots: Object as SlotsType<{
        default?: any;
    }>,
    setup (props, { slots }) {
        const { formProps, getModelValue } = useFormInstance()

        return () => {
            const { name: namePathList, colProps } = props
            const { grid } = unref(formProps) || {}

            const slotScope: any = reduce(namePathList, (result, namePath) => {
                if (namePath && getModelValue && isFunction(getModelValue)) {
                    const value: Recordable = getModelValue(namePath)
                    return set(result, namePath, cloneProxyToRaw(value))
                }
                return result
            }, {})

            const colWrapperProps: ColWrapperProps = {
                ...colProps,
                grid: grid
            }
            return (
                <ColWrapper {...colWrapperProps}>
                    {slots.default && slots.default(slotScope)}
                </ColWrapper>
            )
        }
    }
})

FormDependency.install = function (app: App): App {
    app.component(FormDependency.name as string, FormDependency)
    return app
}

export default FormDependency
