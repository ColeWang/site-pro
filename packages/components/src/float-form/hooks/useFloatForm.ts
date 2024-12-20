import type { Ref, WatchStopHandle } from 'vue'
import { ref, unref, watch } from 'vue'
import { tryOnScopeDispose } from '@site-pro/hooks'
import type { Recordable } from '@site-pro/utils'
import { isFunction } from 'lodash-es'
import type { FloatFormProps } from '../typings'

interface UseFloatFormOptions {
    onOpen?: () => void;
    onCancel?: () => void;
    onUpdateOpen?: (value: boolean) => void;
}

interface UseFloatFormResult {
    sOpen: Ref<boolean>;
    loading: Ref<boolean>;
    onOpen: () => void;
    onCancel: () => void;
    onFinish: (values: Recordable) => Promise<void>;
}

function useFloatForm (props: FloatFormProps, options: UseFloatFormOptions): UseFloatFormResult {
    const sOpen: Ref<boolean> = ref(props.open!)
    const loading: Ref<boolean> = ref(false)

    const stopWatchOpen: WatchStopHandle = watch(() => props.open, (value) => {
        sOpen.value = value!
    }, { immediate: true })

    function setOpenValue (value: boolean): void {
        sOpen.value = value
        options.onUpdateOpen && options.onUpdateOpen(value)
    }

    function onOpen (): void {
        setOpenValue(true)
        options.onOpen && options.onOpen()
    }

    function onCancel (): void {
        if (unref(loading)) return
        setOpenValue(false)
        options.onCancel && options.onCancel()
    }

    async function onFinish (values: Recordable): Promise<void> {
        if (!isFunction(props.onFinish) || unref(loading)) return
        loading.value = true
        try {
            const result: any = await props.onFinish(values)
            loading.value = false
            result && onCancel()
        } catch (err) {
            loading.value = false
            console.warn(err)
        }
    }

    tryOnScopeDispose(() => {
        stopWatchOpen && stopWatchOpen()
    })

    return { sOpen, loading, onOpen, onCancel, onFinish }
}

export default useFloatForm
