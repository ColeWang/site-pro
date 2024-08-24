import type { App } from 'vue'
import Textarea from './Textarea'
import type { FieldTextareaInstance, FieldTextareaProps } from './typings'
import { fieldTextareaProps } from './typings'

Textarea.install = (app: App) => {
    app.component(Textarea.name as string, Textarea)
}

export { Textarea as FieldTextarea, fieldTextareaProps }

export type { FieldTextareaProps, FieldTextareaInstance }
