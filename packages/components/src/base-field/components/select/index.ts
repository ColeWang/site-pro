import type { App } from 'vue'
import Select from './Select'
import { fieldSelectProps, fieldSelectSlots } from './typings'

Select.install = function (app: App): App {
    app.component(Select.name as string, Select)
    return app
}

export { Select as FieldSelect, fieldSelectProps, fieldSelectSlots }

export type { FieldSelectFieldProps, FieldSelectProps, FieldSelectInstance } from './typings'
