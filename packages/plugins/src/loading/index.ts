import type { App, AppContext, ObjectPlugin, VNode } from 'vue'
import { cloneVNode, createVNode, render as vueRender } from 'vue'
import { omit } from 'lodash-es'
import { createDocumentFragment, createReactivePlugin } from '../plugin-utils'
import type { LoadingProps } from './component'
import { Loading as LoadingComponent } from './component'

export interface LoadingPluginInstallOptions {
    parentContext?: AppContext;
    appContext?: AppContext;
    $site?: any;
}

export interface LoadingState {
    __installed: boolean;
    isActive: boolean;
}

export interface LoadingPlugin extends ObjectPlugin {
    show: (this: LoadingState & LoadingPlugin) => void;
    hide: (this: LoadingState & LoadingPlugin, options?: LoadingProps) => void;
    update: (props: LoadingProps) => void;
    destroy: () => void;
    render: (props: LoadingProps, options: Omit<LoadingPluginInstallOptions, '$site'>) => VNode | null;
    install: (this: LoadingState & LoadingPlugin, app: App, options: LoadingPluginInstallOptions) => App;
}


const container: HTMLElement = createDocumentFragment('site-loading')
let instance: VNode | null = null
let configOptions: Omit<LoadingPluginInstallOptions, '$site'> = {}

const state: LoadingState = {
    __installed: false,
    isActive: false
}

const plugin: LoadingPlugin = {
    show (this: LoadingState & LoadingPlugin): void {
        instance = this.render({}, configOptions)
        // --
        this.isActive = true
        this.update({ visible: true })
    },
    hide (this: LoadingState & LoadingPlugin, options?: LoadingProps): void {
        if (!this.isActive) return
        // 动画结束
        const onAfterClose = () => {
            if (options && options.onAfterClose) {
                options.onAfterClose()
            }
            this.destroy()
            this.isActive = false
        }
        this.update({ visible: false, onAfterClose })
    },
    update (props: LoadingProps): void {
        if (!container || !instance) return
        const nextVNode: VNode = cloneVNode(instance, { ...props })
        vueRender(nextVNode, container)
    },
    destroy (): void {
        if (!container || !instance) return
        vueRender(null, container)
        instance = null
    },
    render (props: LoadingProps, options: Omit<LoadingPluginInstallOptions, '$site'>): VNode | null {
        if (!container) return null
        const vm: VNode = createVNode(LoadingComponent, { ...props })
        vm.appContext = options.parentContext || options.appContext || vm.appContext
        vueRender(vm, container)
        return vm
    },
    install (this: LoadingState & LoadingPlugin, app: App, options?: LoadingPluginInstallOptions): App {
        const { $site } = options || {}

        this.__installed = true
        $site && ($site.loading = this)

        configOptions = omit(options, ['$site'])

        return app
    }
}

export default createReactivePlugin(state, plugin)
