import type { App } from 'vue'
import TreeSelect from './TreeSelect'
import type { FieldTreeSelectInstance, FieldTreeSelectProps } from './typings'
import { fieldTreeSelectProps } from './typings'

TreeSelect.install = (app: App) => {
    app.component(TreeSelect.name as string, TreeSelect)
}

export { TreeSelect as FieldTreeSelect, fieldTreeSelectProps }

export type { FieldTreeSelectProps, FieldTreeSelectInstance }
