import type { App } from 'vue'
import Number from './Number'
import { fieldNumberProps, fieldNumberSlots } from './typings'

Number.install = function (app: App): App {
    app.component(Number.name as string, Number)
    return app
}

export { Number as FieldNumber, fieldNumberProps, fieldNumberSlots }

export type { FieldNumberFieldProps, FieldNumberProps, FieldNumberInstance } from './typings'
