import type { App, Plugin, Ref } from 'vue'
import { defineComponent, toRef, unref } from 'vue'
import { ConfigProvider, theme } from 'ant-design-vue'
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
            const { token, components, hashed, inherit } = props

            const darkAlgorithm: ThemeAlgorithm[] = unref(dark) ? [theme.darkAlgorithm] : []
            const compactAlgorithm: ThemeAlgorithm[] = unref(compact) ? [theme.compactAlgorithm] : []

            const themeConfig: ThemeConfig = {
                algorithm: [...darkAlgorithm, ...compactAlgorithm],
                components: components,
                token: token,
                hashed: hashed,
                inherit: inherit
            }

            return (
                <ConfigProvider theme={themeConfig} v-slots={slots}/>
            )
        }
    }
})

ThemeProvider.install = function (app: App): App {
    app.component(ThemeProvider.name as string, ThemeProvider)
    return app
}

export default ThemeProvider as typeof ThemeProvider & Plugin
