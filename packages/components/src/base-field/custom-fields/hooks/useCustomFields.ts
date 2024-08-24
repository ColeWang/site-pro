import type { InjectionKey } from 'vue'
import { inject } from 'vue'
import type { CustomFieldsExpose } from '../typings'

export type InjectCustomFields = Partial<CustomFieldsExpose>;

export const CustomFieldsKey: InjectionKey<InjectCustomFields> = Symbol('CustomFields')

function useCustomFields (): InjectCustomFields {
    return inject(CustomFieldsKey, {})
}

export default useCustomFields
