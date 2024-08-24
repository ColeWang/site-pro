import type { App } from 'vue'
import BaseField from './BaseField'
import { baseFieldProps } from './typings'
import { CustomFields, customFieldsProps, useCustomFields } from './custom-fields'

BaseField.install = (app: App) => {
    app.component(BaseField.name as string, BaseField)
}

export { BaseField, baseFieldProps }
export { CustomFields, customFieldsProps, useCustomFields }

export type {
    BaseFieldValueTypeWithFieldProps,
    BaseFieldValueType,
    BaseFieldProps,
    BaseFieldInstance
} from './typings'
export type {
    BaseValueTypeMap,
    CustomFieldsProps,
    CustomFieldsExpose,
    CustomFieldsInstance
} from './custom-fields'
