import type { InjectionKey } from 'vue'
import { inject } from 'vue'
import type { BaseFieldProviderExpose } from '../typings'

export const BaseFieldProviderKey: InjectionKey<Partial<BaseFieldProviderExpose>> = Symbol('BaseFieldProvider')

function useBaseFieldProvider (): Partial<BaseFieldProviderExpose> {
    return inject(BaseFieldProviderKey, {})
}

export default useBaseFieldProvider
