import type { App } from 'vue'
import CustomFields from './CustomFields'
import type { InjectCustomFields } from './hooks/useCustomFields'
import useCustomFields from './hooks/useCustomFields'
import type { BaseValueTypeMap, CustomFieldsExpose, CustomFieldsInstance, CustomFieldsProps } from './typings'
import { customFieldsProps } from './typings'

CustomFields.install = (app: App) => {
    app.component(CustomFields.name as string, CustomFields)
}

export { CustomFields, useCustomFields, customFieldsProps }
export type { InjectCustomFields, BaseValueTypeMap, CustomFieldsProps, CustomFieldsExpose, CustomFieldsInstance }
