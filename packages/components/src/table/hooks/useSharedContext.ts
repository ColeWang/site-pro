import type { InjectionKey } from 'vue'
import { inject, provide } from 'vue'
import type { TableShared } from '../typings'

const BaseKey: InjectionKey<Partial<TableShared>> = Symbol('TableShared')

export function createSharedContext (instance: TableShared) {
    provide(BaseKey, instance)
}

export function useSharedContext () {
    return inject(BaseKey, {})
}
