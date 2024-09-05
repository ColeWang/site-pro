import type { App, AppContext, CSSProperties, ObjectPlugin, VNode } from 'vue'
import { cloneVNode, createVNode, render as vueRender } from 'vue'
import { omit } from 'lodash-es'
import { createDocumentFragment, createReactivePlugin } from '../plugin-utils'
import type { PluginProgressProps } from './component'
import { PluginProgress } from './component'

interface ProgressInstallOptions {
    parentContext?: AppContext;
    appContext?: AppContext;
    speed?: number;
    easing?: string;
    $site?: any;
}

const container: HTMLElement = createDocumentFragment('site-progress')
let instance: VNode | null = null
let configOptions: Omit<ProgressInstallOptions, '$site'> = {}

let timer: any = null

function clamp (value: number, min: number, max: number): number {
    if (value < min) return min
    if (value > max) return max
    return value
}

function step (value: number): number {
    if (value >= 0 && value < 20) return 10
    if (value >= 20 && value < 50) return 4
    if (value >= 50 && value < 80) return 2
    if (value >= 80 && value < 99) return 0.5
    return 0
}

function barCSS (status: number, speed?: number, easing?: string): CSSProperties {
    const offset: number = status - 100
    return {
        transition: `all ${speed || 200}ms ${easing || 'linear'} 0s`,
        transform: `translate3d(${offset}%, 0, 0)`,
        opacity: 1
    }
}

interface State {
    isActive: boolean;
    status: number;
}

interface Plugin extends ObjectPlugin {
    start: (this: State & Plugin) => void;
    done: (this: State & Plugin) => void;
    trickle: (this: State & Plugin) => void;
    setStatus: (this: State & Plugin, value: number) => void;
    update: (props: PluginProgressProps) => void;
    destroy: () => void;
    render: (props: PluginProgressProps, options: Omit<ProgressInstallOptions, '$site'>) => VNode | null;
    install: (this: State & Plugin, app: App, options?: ProgressInstallOptions) => App;
}

const state: State = {
    isActive: false,
    status: 0
}

const plugin: Plugin = {
    start (this: State & Plugin): void {
        const { speed, easing } = configOptions

        this.status = 0
        instance = this.render({ style: barCSS(this.status, speed, easing) }, configOptions)
        // --
        this.isActive = true
        this.trickle()
    },
    done (this: State & Plugin): void {
        if (!this.isActive || this.status >= 100) return
        // --
        clearTimeout(timer)
        this.setStatus(100)
    },
    trickle (this: State & Plugin): void {
        const { speed } = configOptions
        const nextStatus: number = this.status + step(this.status)
        const status: number = clamp(nextStatus, 0, 99.5)
        this.setStatus(status)
        timer = setTimeout(() => {
            if (this.status < 100) {
                this.trickle()
            }
        }, speed || 200)
    },
    setStatus (this: State & Plugin, value: number): void {
        const { speed, easing } = configOptions
        this.status = clamp(value, 8, 100)
        this.update({ style: barCSS(this.status, speed, easing) })
        if (this.status >= 100) {
            setTimeout(() => {
                const style: CSSProperties = barCSS(this.status, speed, easing)
                this.update({ style: { ...style, opacity: 0 } })
                setTimeout(() => {
                    this.destroy()
                    this.status = 0
                    this.isActive = false
                }, speed)
            }, speed)
        }
    },
    update (props: PluginProgressProps): void {
        if (!container || !instance) return
        const nextVNode = cloneVNode(instance, { ...props })
        vueRender(nextVNode, container)
    },
    destroy (): void {
        if (!container || !instance) return
        vueRender(null, container)
        instance = null
    },
    render (props: PluginProgressProps, options: Omit<ProgressInstallOptions, '$site'>): VNode | null {
        if (!container) return null
        const vm: VNode = createVNode(PluginProgress, { ...props })
        vm.appContext = options.parentContext || options.appContext || vm.appContext
        vueRender(vm, container)
        return vm
    },
    install (this: State & Plugin, app: App, options?: ProgressInstallOptions): App {
        const { $site } = options || {}

        $site && ($site.progress = this)

        configOptions = omit(options, ['$site'])

        return app
    }
}

export default createReactivePlugin(state, plugin)
