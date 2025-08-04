import type { Ref } from 'vue'
import { ref } from 'vue'
import { isFunction } from 'lodash-es'
import { valueEnumToOptions } from '../valueEnum'
import { BaseFieldProps, BaseFieldRequest, BaseFieldOption } from '../typings'

export interface UseFetchDataResult {
    loading: Ref<boolean>;
    options: Ref<BaseFieldOption[]>;
    fetchData: (params: any) => Promise<void>;
}

// function mergeOptions (options: BaseFieldOption[], ): BaseFieldOption[] {
//     if (props.valueEnum) {
//         return valueEnumToOptions(props.valueEnum)
//     }
//     return options || []
// }

function useFieldFetchData (request: BaseFieldRequest | undefined, props: BaseFieldProps): UseFetchDataResult {
    const loading: Ref<boolean> = ref(false)
    const options: Ref<BaseFieldOption[]> = ref(props.options || [])

    async function fetchData (params: any): Promise<void> {
        if (!isFunction(request) || loading.value) return
        loading.value = true
        try {
            const { success, data } = await request(params)
            if (success !== false) {
                options.value = data
            }
        } finally {
            loading.value = false
        }
    }

    return { loading, options, fetchData }
}

export default useFieldFetchData
