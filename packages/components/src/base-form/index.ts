import BaseForm from './BaseForm'
import type { BaseFormExpose, BaseFormInstance, BaseFormLayout, BaseFormProps, BaseFormSlots } from './typings'
import { baseFormProps } from './typings'
import { createFromInstance, useFormInstance } from './hooks/useFormInstance'

export { BaseForm, baseFormProps }
export { useFormInstance, createFromInstance }

export type { BaseFormLayout }
export type { BaseFormSlots, BaseFormProps, BaseFormExpose, BaseFormInstance }

export * from './helpers'
