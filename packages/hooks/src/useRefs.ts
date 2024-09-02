import type { Ref } from 'vue'
import { onBeforeUpdate, ref } from 'vue'
import type { BaseRefType, Recordable } from '@site-pro/utils'

export interface UseRefsResult {
    refs: Ref<Recordable<BaseRefType>>;
    setRef: (key: string | number) => (el: BaseRefType) => void;
}

function useRefs (): UseRefsResult {
    const refs: Ref<Recordable<BaseRefType>> = ref({})

    function setRef (key: string | number) {
        return (el: BaseRefType) => {
            refs.value[key] = el
        }
    }

    onBeforeUpdate(() => {
        refs.value = {}
    })

    return { refs, setRef }
}


export default useRefs
