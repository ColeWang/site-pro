import type { ComputedRef, InjectionKey, PropType, Slot, VNode, VNodeChild } from 'vue'
import { computed, defineComponent, inject, provide } from 'vue'
import type { BaseValueType } from './typings'

interface RenderParams {
    props: BaseValueType;
    slots: Record<string, Slot | undefined>
}

interface BaseValueTypeMap {
    [key: string]: (params: RenderParams) => VNode | VNode[] | VNodeChild | JSX.Element | string | null | undefined;
}

const BaseCustomFieldsKey: InjectionKey<{ valueTypeMap?: ComputedRef<BaseValueTypeMap> }> = Symbol('CustomFields')

export function useCustomFields () {
    return inject(BaseCustomFieldsKey, {})
}

export default defineComponent({
    inheritAttrs: false,
    props: {
        valueTypeMap: {
            type: Object as PropType<BaseValueTypeMap>,
            default: () => ({})
        }
    },
    setup (props, { slots }) {
        const valueTypeMap = computed(() => {
            return props.valueTypeMap
        })

        provide(BaseCustomFieldsKey, { valueTypeMap })

        return () => {
            return slots.default && slots.default()
        }
    }
})
