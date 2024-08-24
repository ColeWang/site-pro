import type { InjectionKey } from 'vue'
import { inject, provide } from 'vue'
import type { BaseFormExpose } from '../typings'

export type InjectFormInstance = Partial<BaseFormExpose>;

export const FormInstanceKey: InjectionKey<InjectFormInstance> = Symbol('FormInstance')

export function createFromInstance (instance: BaseFormExpose): void {
    provide(FormInstanceKey, instance)
}

export function useFormInstance (): InjectFormInstance {
    return inject(FormInstanceKey, {})
}
