import CustomFields from './CustomFields'
import useCustomFields from './hooks/useCustomFields'
import { customFieldsProps } from './typings'

export { CustomFields, useCustomFields, customFieldsProps }

export type { InjectCustomFields } from './hooks/useCustomFields'
export type {
    CustomFieldsValueTypeMap,
    CustomFieldsProps,
    CustomFieldsExpose,
    CustomFieldsInstance
} from './typings'
