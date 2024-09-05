import type { App, AppContext, ObjectPlugin, VNode } from 'vue'
import { cloneVNode, createVNode, render as vueRender } from 'vue'
import { omit } from 'lodash-es'
import { createDocumentFragment, createReactivePlugin } from '../plugin-utils'
import type { PluginLoadingProps } from './component'
import { PluginLoading } from './component'

interface LoadingInstallOptions extends PluginLoadingProps {
    parentContext?: AppContext;
    appContext?: AppContext;
    $site?: any;
}

const container: HTMLElement = createDocumentFragment('site-loading')
let instance: VNode | null = null
let configOptions: Omit<LoadingInstallOptions, '$site'> = {}
let configProps: PluginLoadingProps = {}

interface State {
    isActive: boolean;
}

interface Plugin extends ObjectPlugin {
    show: (this: State & Plugin) => void;
    hide: (this: State & Plugin, config: PluginLoadingProps) => void;
    update: (props: PluginLoadingProps) => void;
    destroy: () => void;
    render: (props: PluginLoadingProps, options: Omit<LoadingInstallOptions, '$site'>) => VNode | null;
    install: (this: State & Plugin, app: App, options: LoadingInstallOptions) => App;
}

const state: State = {
    isActive: false
}

const plugin: Plugin = {
    show (this: State & Plugin): void {
        instance = this.render(configProps, configOptions)
        // --
        this.isActive = true
        this.update({ visible: true })
    },
    hide (this: State & Plugin, config: PluginLoadingProps): void {
        if (!this.isActive) return
        // 动画结束
        const onAfterClose = () => {
            this.destroy()
            this.isActive = false
            config && config.onAfterClose && config.onAfterClose()
        }
        this.update({ visible: false, onAfterClose })
    },
    update (props: PluginLoadingProps): void {
        if (!container || !instance) return
        const nextVNode: VNode = cloneVNode(instance, { ...configProps, ...props })
        vueRender(nextVNode, container)
    },
    destroy (): void {
        if (!container || !instance) return
        vueRender(null, container)
        instance = null
    },
    render (props: PluginLoadingProps, options: Omit<LoadingInstallOptions, '$site'>): VNode | null {
        if (!container) return null
        const vm: VNode = createVNode(PluginLoading, { ...props })
        vm.appContext = options.parentContext || options.appContext || vm.appContext
        vueRender(vm, container)
        return vm
    },
    install (this: State & Plugin, app: App, options?: LoadingInstallOptions): App {
        const { $site } = options || {}

        $site && ($site.loading = this)

        configProps = omit(options, ['parentContext', 'appContext', '$site'])
        configOptions = omit(options, ['$site'])

        return app
    }
}

export default createReactivePlugin(state, plugin)
