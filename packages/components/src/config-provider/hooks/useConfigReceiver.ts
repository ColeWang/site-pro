import type { ComputedRef, InjectionKey, Ref } from 'vue'
import { computed, inject, provide, toRef, unref } from 'vue'
import { useReactivePick } from '@site-pro/hooks'
import type { Recordable } from '@site-pro/utils'
import type { ConfigProviderExpose, ConfigProviderExtended } from '../typings'

export interface UseConfigReceiverExtendedThemeState {
    dark?: boolean;
    compact?: boolean;
}

export interface UseConfigReceiverExtendedResult<T extends keyof ConfigProviderExtended> {
    extended: Ref<ConfigProviderExtended[T] & UseConfigReceiverExtendedThemeState>;
}

export const ConfigReceiverKey: InjectionKey<Partial<ConfigProviderExpose>> = Symbol('ConfigReceiver')

export function createConfigReceiver (value: ConfigProviderExpose): void {
    provide(ConfigReceiverKey, value)
}

export function useConfigReceiver (): Partial<ConfigProviderExpose> {
    return inject(ConfigReceiverKey, {})
}

export function useConfigReceiverExtended<T extends keyof ConfigProviderExtended> (name: T, mergeProps?: Recordable): UseConfigReceiverExtendedResult<T> {
    const configReceiver: Partial<ConfigProviderExpose> = useConfigReceiver()

    const extended: Ref<ConfigProviderExtended | undefined> = toRef(() => configReceiver.extended)

    const themeState: UseConfigReceiverExtendedThemeState = useReactivePick(configReceiver, ['dark', 'compact'])

    const extendedState: ComputedRef<ConfigProviderExtended[T] & UseConfigReceiverExtendedThemeState> = computed(() => {
        const extendedValue: ConfigProviderExtended = unref(extended) || {}
        const configProps: ConfigProviderExtended[T] = extendedValue[name] || {}
        return { ...themeState, ...mergeProps, ...configProps }
    })

    return { extended: extendedState }
}
