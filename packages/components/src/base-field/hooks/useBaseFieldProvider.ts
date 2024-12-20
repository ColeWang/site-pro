import type { InjectionKey } from 'vue'
import { inject, provide } from 'vue'
import type { BaseFieldProviderExpose } from '../typings'

export const BaseFieldProviderKey: InjectionKey<Partial<BaseFieldProviderExpose>> = Symbol('BaseFieldProvider')

export function createBaseFieldProvider (value: BaseFieldProviderExpose): void {
    provide(BaseFieldProviderKey, value)
}

export function useBaseFieldProvider (): Partial<BaseFieldProviderExpose> {
    return inject(BaseFieldProviderKey, {})
}
