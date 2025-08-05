import type { Ref } from 'vue'
import { ref, watch } from 'vue'
import { useMemo } from '@site-pro/hooks'
import { isEmpty, omitNil } from '@site-pro/utils'
import { compact, isArray, isFunction, isObject, map, reduce, set } from 'lodash-es'
import { BaseFieldOption, BaseFieldProps, BaseFieldRequest, BaseFieldValueEnum } from '../typings'

export interface UseFetchDataResult {
    loading: Ref<boolean>;
    options: Ref<BaseFieldOption[]>;
    valueEnum: Ref<BaseFieldValueEnum>;
    fetchData: (words?: string) => Promise<void>;
}

function valueEnumToOptions (valueEnum?: BaseFieldValueEnum): BaseFieldOption[] {
    const needValueEnum: BaseFieldValueEnum = omitNil(valueEnum)
    return map(needValueEnum, (item, key) => {
        if (isObject(item) && item.text) {
            return { label: item.text, value: key, disabled: item.disabled }
        }
        return { label: item, value: key }
    })
}

function optionsToValueEnum (options?: BaseFieldOption[]): BaseFieldValueEnum {
    const needOptions: BaseFieldOption[] = compact(options || [])

    const traverseOptions = (values: BaseFieldOption[], result: BaseFieldValueEnum) => {
        return reduce(values, (_, option) => {
            const { label, value, children } = option || {}
            if (!(isEmpty(value) || isEmpty(label))) {
                set(result, value, label)
            }
            if (isArray(children) && children.length !== 0) {
                traverseOptions(children, result)
            }
            return result
        }, result)
    }

    return traverseOptions(needOptions, {})
}

function detFieldOptions (props: BaseFieldProps): BaseFieldOption[] {
    const { valueEnum, fieldProps } = props
    if (isArray(fieldProps.options)) {
        return fieldProps.options
    }
    if (isArray(fieldProps.treeData)) {
        return fieldProps.treeData
    }
    return valueEnumToOptions(valueEnum)
}

function useBaseFieldOptions (request: BaseFieldRequest | undefined, props: BaseFieldProps): UseFetchDataResult {
    const loading: Ref<boolean> = ref(false)

    const defaultOptions: BaseFieldOption[] = detFieldOptions(props)
    const options: Ref<BaseFieldOption[]> = ref(defaultOptions)

    const valueEnum: Ref<BaseFieldValueEnum> = useMemo(() => {
        return optionsToValueEnum(options.value)
    }, [options])

    watch([() => props.fieldProps.options, () => props.fieldProps.treeData, () => props.valueEnum], () => {
        options.value = detFieldOptions(props)
    }, { deep: true })

    async function fetchData (words?: string): Promise<void> {
        if (!isFunction(request) || loading.value) return
        loading.value = true
        try {
            const params: any = { words: words }
            const { success, data } = await request(params)
            if (success !== false) {
                options.value = data
            }
        } finally {
            loading.value = false
        }
    }

    return { loading, options, valueEnum, fetchData }
}

export default useBaseFieldOptions
