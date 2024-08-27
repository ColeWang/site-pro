import type { App } from 'vue'
import Textarea from './Textarea'
import { fieldTextareaProps, fieldTextareaSlots } from './typings'

Textarea.install = function (app: App): App {
    app.component(Textarea.name as string, Textarea)
    return app
}

export { Textarea as FieldTextarea, fieldTextareaProps, fieldTextareaSlots }

export type { FieldTextareaFieldProps, FieldTextareaProps, FieldTextareaInstance } from './typings'
