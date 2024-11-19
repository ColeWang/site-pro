import type { InjectionKey } from 'vue'
import { inject, provide } from 'vue'
import type { TableSharedContext } from '../typings'

const BaseKey: InjectionKey<Partial<TableSharedContext>> = Symbol('TableSharedContext')

export function createSharedContext (instance: TableSharedContext) {
    provide(BaseKey, instance)
}

export function useSharedContext (): Partial<TableSharedContext> {
    return inject(BaseKey, {})
}
