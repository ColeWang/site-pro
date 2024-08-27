import type { App } from 'vue'
import Text from './Text'
import { fieldTextProps, fieldTextSlots } from './typings'

Text.install = function (app: App): App {
    app.component(Text.name as string, Text)
    return app
}

export { Text as FieldText, fieldTextProps, fieldTextSlots }

export type { FieldTextFieldProps, FieldTextProps, FieldTextInstance } from './typings'
