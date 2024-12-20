import type { App, ComputedRef, SlotsType } from 'vue'
import { computed, defineComponent, unref } from 'vue'
import { createBaseFieldProvider, useBaseFieldProvider } from './hooks/useBaseFieldProvider'
import type { BaseFieldProviderExpose, BaseFieldProviderSlots, BaseFieldProviderValueTypeMap } from './typings'
import { baseFieldProviderProps } from './typings'

const BaseFieldProvider = defineComponent({
    inheritAttrs: false,
    name: 'ProBaseFieldProvider',
    props: baseFieldProviderProps(),
    slots: Object as SlotsType<BaseFieldProviderSlots>,
    setup (props, { slots, expose }) {
        const { valueTypeMap: parentValueTypeMap } = useBaseFieldProvider()

        const valueTypeMap: ComputedRef<BaseFieldProviderValueTypeMap> = computed(() => {
            return { ...unref(parentValueTypeMap), ...props.valueTypeMap }
        })

        const baseFieldProviderExpose: BaseFieldProviderExpose = {
            valueTypeMap: valueTypeMap
        }

        createBaseFieldProvider(baseFieldProviderExpose)

        expose(baseFieldProviderExpose)

        return () => {
            return slots.default && slots.default()
        }
    }
})

BaseFieldProvider.install = function (app: App): App {
    app.component(BaseFieldProvider.name as string, BaseFieldProvider)
    return app
}

export default BaseFieldProvider
