import type { App } from 'vue'
import Text from './Text'
import { fieldTextProps } from './typings'

Text.install = (app: App) => {
    app.component(Text.name as string, Text)
}

export { Text as FieldText, fieldTextProps }

export type { FieldTextProps, FieldTextInstance } from './typings'
