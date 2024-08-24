import type { App } from 'vue'
import Textarea from './Textarea'
import { fieldTextareaProps } from './typings'

Textarea.install = (app: App) => {
    app.component(Textarea.name as string, Textarea)
}

export { Textarea as FieldTextarea, fieldTextareaProps }

export type { FieldTextareaProps, FieldTextareaInstance } from './typings'
