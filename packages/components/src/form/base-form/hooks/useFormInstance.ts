import type { InjectionKey } from 'vue'
import { inject, provide } from 'vue'
import type { BaseFormExpose } from '../typings'

export const FormInstanceKey: InjectionKey<Partial<BaseFormExpose>> = Symbol('FormInstance')

export function createFromInstance (instance: BaseFormExpose): void {
    provide(FormInstanceKey, instance)
}

export function useFormInstance (): Partial<BaseFormExpose> {
    return inject(FormInstanceKey, {})
}
