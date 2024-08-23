import type { App } from 'vue'
import Number from './Number'
import type { FieldNumberInstance, FieldNumberProps } from './typings'
import { fieldNumberProps } from './typings'

Number.install = (app: App) => {
    app.component(Number.name as string, Number)
}

export { Number as FieldNumber, fieldNumberProps }

export type { FieldNumberProps, FieldNumberInstance }
