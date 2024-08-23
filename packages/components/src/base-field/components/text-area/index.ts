import type { App } from 'vue'
import TextArea from './TextArea'
import type { FieldTextAreaInstance, FieldTextAreaProps } from './typings'
import { fieldTextAreaProps } from './typings'

TextArea.install = (app: App) => {
    app.component(TextArea.name as string, TextArea)
}

export { TextArea as FieldTextArea, fieldTextAreaProps }

export type { FieldTextAreaProps, FieldTextAreaInstance }
