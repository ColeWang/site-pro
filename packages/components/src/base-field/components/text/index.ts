import type { App } from 'vue'
import Text from './Text'
import type { FieldTextInstance, FieldTextProps } from './typings'
import { fieldTextProps } from './typings'

Text.install = (app: App) => {
    app.component(Text.name as string, Text)
}

export { Text as FieldText, fieldTextProps }

export type { FieldTextProps, FieldTextInstance }
