import type { InjectionKey } from 'vue'
import { inject, provide } from 'vue'
import type { BaseFormExpose } from '../typings'

export const FormInstanceKey: InjectionKey<Partial<BaseFormExpose>> = Symbol('FormInstance')

export function createFromInstance (value: BaseFormExpose): void {
    provide(FormInstanceKey, value)
}

export function useFormInstance (): Partial<BaseFormExpose> {
    return inject(FormInstanceKey, {})
}
