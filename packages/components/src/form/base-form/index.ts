import type { App } from 'vue'
import BaseForm from './BaseForm'
import { baseFormProps } from './typings'
import Submitter, { submitterProps } from './Submitter'
import { createFromInstance, FormInstanceKey, useFormInstance } from './hooks/useFormInstance'

BaseForm.install = function (app: App): App {
    app.component(BaseForm.name as string, BaseForm)
    return app
}

Submitter.install = function (app: App): App {
    app.component(Submitter.name as string, Submitter)
    return app
}

export { BaseForm, baseFormProps }
export { Submitter, submitterProps }
export { useFormInstance, createFromInstance, FormInstanceKey }

export type { BaseFormModel, BaseFormProps, BaseFormExpose, BaseFormInstance } from './typings'
export type { SubmitterProps, SubmitterInstance } from './Submitter'
export type { InjectFormInstance } from './hooks/useFormInstance'
