import type { InjectionKey } from 'vue'
import { inject } from 'vue'
import type { CustomFieldsExpose } from '../typings'

export const CustomFieldsKey: InjectionKey<Partial<CustomFieldsExpose>> = Symbol('CustomFields')

function useCustomFields (): Partial<CustomFieldsExpose> {
    return inject(CustomFieldsKey, {})
}

export default useCustomFields
