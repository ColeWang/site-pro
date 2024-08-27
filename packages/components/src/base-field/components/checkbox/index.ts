import type { App } from 'vue'
import Checkbox from './Checkbox'
import { fieldCheckboxProps, fieldCheckboxSlots } from './typings'

Checkbox.install = function (app: App): App {
    app.component(Checkbox.name as string, Checkbox)
    return app
}

export { Checkbox as FieldCheckbox, fieldCheckboxProps, fieldCheckboxSlots }

export type { FieldCheckboxFieldProps, FieldCheckboxProps, FieldCheckboxInstance } from './typings'
