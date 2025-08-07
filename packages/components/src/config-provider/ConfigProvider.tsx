import type { App, Plugin, SlotsType } from 'vue'
import { defineComponent } from 'vue'
import { ConfigProvider as AntConfigProvider, theme as antTheme } from 'ant-design-vue'
import { pick } from 'lodash-es'
import { createConfigReceiver } from './hooks/useConfigReceiver'
import type { ConfigProviderSlots } from './typings'
import { configProviderProps } from './typings'
import type { ConfigProviderProps as AntConfigProviderProps, ThemeAlgorithm } from '../ant-typings'

const ConfigProvider = defineComponent({
    compatConfig: { MODE: 3 },
    inheritAttrs: false,
    name: 'ProConfigProvider',
    props: configProviderProps(),
    slots: Object as SlotsType<ConfigProviderSlots>,
    setup (props, { slots, expose }) {
        createConfigReceiver(props)
        expose(props)

        return () => {
            const { theme: customTheme, dark, compact, ...restProps } = props

            const algorithm: ThemeAlgorithm[] = [
                dark && antTheme.darkAlgorithm,
                compact && antTheme.compactAlgorithm
            ].filter((item): item is ThemeAlgorithm => {
                return !!item
            })

            const needProps: AntConfigProviderProps = {
                ...pick(restProps, Object.keys(AntConfigProvider.props)) as AntConfigProviderProps,
                theme: { ...customTheme, algorithm }
            }
            return (
                <AntConfigProvider {...needProps} v-slots={slots}/>
            )
        }
    }
})

ConfigProvider.install = function (app: App): App {
    app.component(ConfigProvider.name as string, ConfigProvider)
    return app
}

export default ConfigProvider as typeof ConfigProvider & Plugin
