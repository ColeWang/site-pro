import type { App } from 'vue'
import CustomFields from './CustomFields'
import { customFieldsProps } from './typings'
import useCustomFields from './hooks/useCustomFields'

CustomFields.install = function (app: App): App {
    app.component(CustomFields.name as string, CustomFields)
    return app
}

export { CustomFields, customFieldsProps }
export { useCustomFields }

export type { InjectCustomFields } from './hooks/useCustomFields'
export type {
    CustomFieldsValueTypeMap,
    CustomFieldsProps,
    CustomFieldsExpose,
    CustomFieldsInstance
} from './typings'
