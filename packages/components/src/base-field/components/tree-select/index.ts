import type { App } from 'vue'
import TreeSelect from './TreeSelect'
import { fieldTreeSelectProps, fieldTreeSelectSlots } from './typings'

TreeSelect.install = function (app: App): App {
    app.component(TreeSelect.name as string, TreeSelect)
    return app
}

export { TreeSelect as FieldTreeSelect, fieldTreeSelectProps, fieldTreeSelectSlots }

export type { FieldTreeSelectFieldProps, FieldTreeSelectProps, FieldTreeSelectInstance } from './typings'
