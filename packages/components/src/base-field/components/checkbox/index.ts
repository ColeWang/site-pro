import type { App } from 'vue'
import Checkbox from './Checkbox'
import { fieldCheckboxProps } from './typings'

Checkbox.install = (app: App) => {
    app.component(Checkbox.name as string, Checkbox)
}

export { Checkbox as FieldCheckbox, fieldCheckboxProps }

export type { FieldCheckboxProps, FieldCheckboxInstance } from './typings'
