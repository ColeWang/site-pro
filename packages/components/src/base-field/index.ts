import type { App } from 'vue'
import BaseField from './BaseField'
import { baseFieldProps } from './typings'
import { CustomFields, customFieldsProps, useCustomFields } from './custom-fields'

BaseField.install = (app: App) => {
    app.component(BaseField.name as string, BaseField)
    return app
}

export { BaseField, baseFieldProps }
export { CustomFields, customFieldsProps, useCustomFields }

export type {
    BaseFieldValueTypeWithFieldProps,
    BaseFieldValueType,
    BaseFieldFieldProps,
    BaseFieldFormItemProps,
    BaseFieldProps,
    BaseFieldInstance
} from './typings'
export type {
    CustomFieldsValueTypeMap,
    CustomFieldsProps,
    CustomFieldsExpose,
    CustomFieldsInstance
} from './custom-fields'
