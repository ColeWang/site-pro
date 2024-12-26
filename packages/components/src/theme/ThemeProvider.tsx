import type { App, Plugin, Ref } from 'vue'
import { defineComponent, toRef, unref } from 'vue'
import { ConfigProvider as AntConfigProvider, theme as antTheme } from 'ant-design-vue'
import { omit } from 'lodash'
import { createThemeProvider } from './hooks/useThemeProvider'
import type { ThemeAlgorithm, ThemeConfig } from '../ant-typings'
import type { ThemeProviderExpose } from './typings'
import { themeProviderProps } from './typings'

const ThemeProvider = defineComponent({
    inheritAttrs: false,
    name: 'ProThemeProvider',
    props: themeProviderProps(),
    setup (props, { slots, expose }) {
        const dark: Ref<boolean> = toRef(() => props.dark)
        const compact: Ref<boolean> = toRef(() => props.compact)

        const themeProviderExpose: ThemeProviderExpose = {
            dark: dark,
            compact: compact
        }

        createThemeProvider(themeProviderExpose)
        expose(themeProviderExpose)

        return () => {
            const darkAlgorithm: ThemeAlgorithm[] = unref(dark) ? [antTheme.darkAlgorithm] : []
            const compactAlgorithm: ThemeAlgorithm[] = unref(compact) ? [antTheme.compactAlgorithm] : []

            const themeConfig: ThemeConfig = {
                ...omit(props, ['dark', 'compact']) as ThemeConfig,
                algorithm: [...darkAlgorithm, ...compactAlgorithm]
            }

            return (
                <AntConfigProvider theme={themeConfig} v-slots={slots}/>
            )
        }
    }
})

ThemeProvider.install = function (app: App): App {
    app.component(ThemeProvider.name as string, ThemeProvider)
    return app
}

export default ThemeProvider as typeof ThemeProvider & Plugin
