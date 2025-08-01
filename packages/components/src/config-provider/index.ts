import ConfigProvider from './ConfigProvider'
import type { ConfigProviderExpose, ConfigProviderInstance, ConfigProviderProps, ConfigProviderSlots } from './typings'
import { configProviderProps } from './typings'
import { useConfigReceiver, useConfigReceiverExtended } from './hooks/useConfigReceiver'

export { ConfigProvider, configProviderProps }
export { useConfigReceiver, useConfigReceiverExtended }

export type { ConfigProviderSlots, ConfigProviderProps, ConfigProviderExpose, ConfigProviderInstance }
