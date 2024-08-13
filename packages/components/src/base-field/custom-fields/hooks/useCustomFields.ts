import type { ComputedRef, InjectionKey } from 'vue'
import { inject } from 'vue'
import type { BaseValueTypeMap } from '../typings'

export interface InjectValueTypeMap {
    valueTypeMap?: ComputedRef<BaseValueTypeMap>;
}

export const BaseCustomFieldsKey: InjectionKey<InjectValueTypeMap> = Symbol('CustomFields')

function useCustomFields () {
    return inject(BaseCustomFieldsKey, {})
}

export default useCustomFields
