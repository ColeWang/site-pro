import type { App } from 'vue'
import Password from './Password'
import { fieldPasswordProps, fieldPasswordSlots } from './typings'

Password.install = function (app: App): App {
    app.component(Password.name as string, Password)
    return app
}

export { Password as FieldPassword, fieldPasswordProps, fieldPasswordSlots }

export type { FieldPasswordFieldProps, FieldPasswordProps, FieldPasswordInstance } from './typings'
