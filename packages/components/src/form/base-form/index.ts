import BaseForm from './BaseForm'
import type { BaseFormExpose, BaseFormInstance, BaseFormModel, BaseFormProps } from './typings'
import { baseFormProps } from './typings'
import type { SubmitterInstance, SubmitterProps } from './Submitter'
import Submitter, { submitterProps } from './Submitter'
import { createFromInstance, useFormInstance } from './hooks/useFormInstance'

export { BaseForm, baseFormProps }
export { Submitter, submitterProps }
export { useFormInstance, createFromInstance }

export type { BaseFormModel, BaseFormProps, BaseFormExpose, BaseFormInstance }
export type { SubmitterProps, SubmitterInstance }
