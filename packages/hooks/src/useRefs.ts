import type { Ref } from 'vue'
import { onBeforeUpdate, ref } from 'vue'
import type { BaseRefType, Recordable } from '@site-pro/utils'
import { get, set } from 'lodash-es'

export interface UseRefsResult {
    refs: Ref<Recordable<BaseRefType>>;
    setRef: (key: string | number) => (el: BaseRefType) => Recordable<BaseRefType>;
    getRef: (key: string | number) => BaseRefType;
}

function useRefs (): UseRefsResult {
    const refs: Ref<Recordable<BaseRefType>> = ref({})

    function setRef (key: string | number) {
        return (el: BaseRefType) => {
            return set(refs.value, key, el)
        }
    }

    function getRef (key: string | number): BaseRefType {
        return get(refs.value, key, null)
    }

    onBeforeUpdate(() => {
        // 重置 refs
        refs.value = {}
    })

    return { refs, setRef, getRef }
}

export default useRefs
