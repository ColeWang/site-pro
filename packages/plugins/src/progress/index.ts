import type { App, AppContext, CSSProperties, ObjectPlugin, VNode } from 'vue'
import { cloneVNode, createVNode, render as vueRender } from 'vue'
import { omit } from 'lodash-es'
import { createDocumentFragment, createReactivePlugin } from '../plugin-utils'
import type { ProgressProps } from './component'
import { Progress as ProgressComponent } from './component'

export interface ProgressPluginInstallOptions {
    parentContext?: AppContext;
    appContext?: AppContext;
    speed?: number;
    easing?: string;
    $site?: any;
}

export interface ProgressState {
    __installed: boolean;
    isActive: boolean;
    status: number;
}

export interface ProgressPlugin extends ObjectPlugin {
    start: (this: ProgressState & ProgressPlugin) => void;
    done: (this: ProgressState & ProgressPlugin) => void;
    trickle: (this: ProgressState & ProgressPlugin) => void;
    setStatus: (this: ProgressState & ProgressPlugin, value: number) => void;
    update: (props: ProgressProps) => void;
    destroy: () => void;
    render: (props: ProgressProps, options: Omit<ProgressPluginInstallOptions, '$site'>) => VNode | null;
    install: (this: ProgressState & ProgressPlugin, app: App, options?: ProgressPluginInstallOptions) => App;
}

const container: HTMLElement = createDocumentFragment('site-progress')
let instance: VNode | null = null
let configOptions: Omit<ProgressPluginInstallOptions, '$site'> = {}

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

function barCSS (status: number, speed: number, easing: string): CSSProperties {
    const offset: number = status - 100
    return {
        opacity: 1,
        transition: `all ${speed}ms ${easing} 0s`,
        transform: `translate3d(${offset}%, 0, 0)`
    }
}

const state: ProgressState = {
    __installed: false,
    isActive: false,
    status: 0
}

const plugin: ProgressPlugin = {
    start (this: ProgressState & ProgressPlugin): void {
        const { speed = 200, easing = 'linear' } = configOptions

        this.status = 0
        instance = this.render({ style: barCSS(this.status, speed, easing) }, configOptions)
        // --
        this.isActive = true
        this.trickle()
    },
    done (this: ProgressState & ProgressPlugin): void {
        if (!this.isActive || this.status >= 100) return
        // --
        clearTimeout(timer)
        this.setStatus(100)
    },
    trickle (this: ProgressState & ProgressPlugin): void {
        const { speed = 200 } = configOptions
        const nextStatus: number = this.status + step(this.status)
        const status: number = clamp(nextStatus, 0, 99.5)
        this.setStatus(status)
        timer = setTimeout(() => {
            if (this.status < 100) {
                this.trickle()
            }
        }, speed)
    },
    setStatus (this: ProgressState & ProgressPlugin, value: number): void {
        const { speed = 200, easing = 'linear' } = configOptions
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
    update (props: ProgressProps): void {
        if (!container || !instance) return
        const nextVNode: VNode = cloneVNode(instance, { ...props })
        vueRender(nextVNode, container)
    },
    destroy (): void {
        if (!container || !instance) return
        vueRender(null, container)
        instance = null
    },
    render (props: ProgressProps, options: Omit<ProgressPluginInstallOptions, '$site'>): VNode | null {
        if (!container) return null
        const vm: VNode = createVNode(ProgressComponent, { ...props })
        vm.appContext = options.parentContext || options.appContext || vm.appContext
        vueRender(vm, container)
        return vm
    },
    install (this: ProgressState & ProgressPlugin, app: App, options?: ProgressPluginInstallOptions): App {
        const { $site } = options || {}

        this.__installed = true
        $site && ($site.progress = this)

        configOptions = omit(options, ['$site'])

        return app
    }
}

export default createReactivePlugin(state, plugin)
