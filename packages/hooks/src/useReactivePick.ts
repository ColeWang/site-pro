import type { Reactive, UnwrapRef } from 'vue'
import { reactive, toRef } from 'vue'
import { fromPairs } from 'lodash-es'

export type UseReactivePickResult<T extends object, K extends keyof T> = Reactive<{ [S in K]: UnwrapRef<T[S]> }>;

export function useReactivePick<T extends object, K extends keyof T> (source: T, keys: K[]): UseReactivePickResult<T, K> {
    const entries: any = fromPairs(keys.map((key) => [key, toRef(source, key)]))

    return reactive(entries) as UseReactivePickResult<T, K>
}

export default useReactivePick
