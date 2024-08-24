import BaseForm from './BaseForm'
import type { BaseFormExpose, BaseFormInstance, BaseFormModel, BaseFormProps, Updater } from './typings'
import { baseFormProps } from './typings'
import type { InjectFormInstance } from './hooks/useFormInstance'
import { createFromInstance, FormInstanceKey, useFormInstance } from './hooks/useFormInstance'
import type { SubmitterInstance, SubmitterProps } from './Submitter'
import Submitter, { submitterProps } from './Submitter'

export { BaseForm, baseFormProps }
export type { Updater, BaseFormModel, BaseFormProps, BaseFormExpose, BaseFormInstance }
export { useFormInstance, createFromInstance, FormInstanceKey }
export type { InjectFormInstance }
export { Submitter, submitterProps }
export type { SubmitterProps, SubmitterInstance }
