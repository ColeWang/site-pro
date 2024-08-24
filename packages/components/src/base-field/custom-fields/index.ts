import type { App } from 'vue'
import CustomFields from './CustomFields'
import useCustomFields from './hooks/useCustomFields'
import { customFieldsProps } from './typings'

CustomFields.install = (app: App) => {
    app.component(CustomFields.name as string, CustomFields)
}

export { CustomFields, useCustomFields, customFieldsProps }

export type { InjectCustomFields } from './hooks/useCustomFields'
export type { BaseValueTypeMap, CustomFieldsProps, CustomFieldsExpose, CustomFieldsInstance } from './typings'
