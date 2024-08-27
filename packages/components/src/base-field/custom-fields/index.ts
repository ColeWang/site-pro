import type { App } from 'vue'
import CustomFields from './CustomFields'
import useCustomFields from './hooks/useCustomFields'
import { customFieldsProps } from './typings'

CustomFields.install = function (app: App): App {
    app.component(CustomFields.name as string, CustomFields)
    return app
}

export { CustomFields, useCustomFields, customFieldsProps }

export type { InjectCustomFields } from './hooks/useCustomFields'
export type {
    CustomFieldsValueTypeMap,
    CustomFieldsProps,
    CustomFieldsExpose,
    CustomFieldsInstance
} from './typings'
