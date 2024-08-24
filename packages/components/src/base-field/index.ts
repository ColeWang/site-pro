import type { App } from 'vue'
import BaseField from './BaseField'
import type { BaseFieldInstance, BaseFieldProps, BaseFieldValueType, BaseFieldValueTypeWithFieldProps } from './typings'
import { baseFieldProps } from './typings'
import type { BaseValueTypeMap, CustomFieldsExpose, CustomFieldsInstance, CustomFieldsProps } from './custom-fields'
import { CustomFields, customFieldsProps, useCustomFields } from './custom-fields'

BaseField.install = (app: App) => {
    app.component(BaseField.name as string, BaseField)
}

export { BaseField, baseFieldProps }
export { CustomFields, customFieldsProps, useCustomFields }
export type { BaseFieldValueTypeWithFieldProps, BaseFieldValueType, BaseFieldProps, BaseFieldInstance }
export type { BaseValueTypeMap, CustomFieldsProps, CustomFieldsExpose, CustomFieldsInstance }
