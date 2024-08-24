import BaseForm from './BaseForm'
import { baseFormProps } from './typings'
import Submitter, { submitterProps } from './Submitter'
import { createFromInstance, FormInstanceKey, useFormInstance } from './hooks/useFormInstance'

export { BaseForm, baseFormProps }
export { Submitter, submitterProps }
export { useFormInstance, createFromInstance, FormInstanceKey }

export type { Updater, BaseFormModel, BaseFormProps, BaseFormExpose, BaseFormInstance } from './typings'
export type { SubmitterProps, SubmitterInstance } from './Submitter'
export type { InjectFormInstance } from './hooks/useFormInstance'
