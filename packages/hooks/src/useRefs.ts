import type { Ref } from 'vue'
import { onBeforeUpdate, ref } from 'vue'
import type { BaseRefType } from '@site-pro/utils'

function useRefs () {
    const refs: Ref<Record<string, BaseRefType>> = ref({})

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
