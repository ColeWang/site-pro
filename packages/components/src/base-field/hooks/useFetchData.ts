import type { Ref } from 'vue'
import { ref } from 'vue'
import type { BaseOptionType } from '@site-pro/utils'
import { BaseFieldProps } from '../typings'

export interface UseFetchDataResult {
    loading: Ref<boolean>;
    options: Ref<BaseOptionType[]>;
}

function useFetchData (props: BaseFieldProps): UseFetchDataResult {
    const loading: Ref<boolean> = ref(false)
    const options: Ref<BaseOptionType[]> = ref(props.fieldProps.options || [])

    async function fetchData (): Promise<void> {

    }

    fetchData()

    return { loading, options }
}

export default useFetchData
