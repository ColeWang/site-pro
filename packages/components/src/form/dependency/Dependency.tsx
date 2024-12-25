import type { App, Plugin, SlotsType } from 'vue'
import { defineComponent, unref } from 'vue'
import type { Recordable } from '@site-pro/utils'
import { cloneProxyToRaw } from '@site-pro/utils'
import { isFunction, reduce, set } from 'lodash-es'
import type { ColWrapperProps } from '../../base-form'
import { ColWrapper, useFormInstance } from '../../base-form'
import type { FormDependencySlots } from './typings'
import { formDependencyProps } from './typings'

const FormDependency = defineComponent({
    inheritAttrs: false,
    name: 'ProFormDependency',
    props: formDependencyProps(),
    slots: Object as SlotsType<FormDependencySlots>,
    setup (props, { slots }) {
        const { formProps, getModelValue } = useFormInstance()

        return () => {
            const { name: namePathList, colProps } = props
            const { grid } = unref(formProps) || {}

            const slotProps: Recordable = reduce(namePathList, (result, namePath) => {
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
                    {slots.default && slots.default(slotProps)}
                </ColWrapper>
            )
        }
    }
})

FormDependency.install = function (app: App): App {
    app.component(FormDependency.name as string, FormDependency)
    return app
}

export default FormDependency as typeof FormDependency & Plugin
