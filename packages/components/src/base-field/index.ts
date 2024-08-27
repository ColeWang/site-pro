import type { App } from 'vue'
import BaseField from './BaseField'
import { baseFieldProps } from './typings'

BaseField.install = function (app: App): App {
    app.component(BaseField.name as string, BaseField)
    return app
}

export { BaseField, baseFieldProps }
export type {
    BaseFieldValueTypeWithFieldProps,
    BaseFieldValueType,
    BaseFieldFieldProps,
    BaseFieldFormItemProps,
    BaseFieldProps,
    BaseFieldInstance
} from './typings'

export * from './custom-fields'
export * from './components'
