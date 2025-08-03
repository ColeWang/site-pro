import type { App, Plugin, Ref, SlotsType } from 'vue'
import { defineComponent, unref } from 'vue'
import { useMemo } from '@site-pro/hooks'
import type { Recordable } from '@site-pro/utils'
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
        const { formProps, getModelValue, model } = useFormInstance()

        const cache: Ref<any> = useMemo(() => {
            return reduce(props.name, (result, namePath) => {
                if (namePath && getModelValue && isFunction(getModelValue)) {
                    const value: Recordable = getModelValue(namePath)
                    return set(result, namePath, value)
                }
                return result
            }, {})
        }, [() => props.name, () => model && model.value], { deep: true })

        return () => {
            const { colProps } = props
            const { grid } = unref(formProps) || {}

            const colWrapperProps: ColWrapperProps = {
                ...colProps,
                grid: grid
            }
            return (
                <ColWrapper {...colWrapperProps}>
                    {slots.default && slots.default(unref(cache))}
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
