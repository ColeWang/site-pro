import type { App } from 'vue'
import Select from './Select'
import { fieldSelectProps } from './typings'

Select.install = (app: App) => {
    app.component(Select.name as string, Select)
}

export { Select as FieldSelect, fieldSelectProps }

export type { FieldSelectProps, FieldSelectInstance } from './typings'
