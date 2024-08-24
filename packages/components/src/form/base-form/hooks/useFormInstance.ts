import type { InjectionKey } from 'vue'
import { inject, provide } from 'vue'
import type { BaseFormExpose } from '../typings'

export type InjectBaseFormInstance = Partial<BaseFormExpose>;

export const FormInstanceKey: InjectionKey<InjectBaseFormInstance> = Symbol('FormInstance')

export function createFromInstance (instance: BaseFormExpose): void {
    provide(FormInstanceKey, instance)
}

export function useFormInstance (): InjectBaseFormInstance {
    return inject(FormInstanceKey, {})
}
