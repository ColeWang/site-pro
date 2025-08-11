import type { App, ObjectPlugin } from 'vue'
import { addDocumentEvt, isBrowserClient } from '@site-pro/utils'
import { createReactivePlugin } from '../plugin-utils'

export interface FullscreenPluginInstallOptions {
    $site?: any;
}

export interface FullscreenState {
    isActive: boolean;
    activeEl: HTMLElement | null;
    __installed: boolean;
}

export interface FullscreenPlugin extends ObjectPlugin {
    request: (this: FullscreenState & FullscreenPlugin, target?: HTMLElement) => Promise<void>;
    exit: (this: FullscreenState & FullscreenPlugin) => Promise<void>;
    toggle: (this: FullscreenState & FullscreenPlugin, target?: HTMLElement) => Promise<void>;
    install: (this: FullscreenState & FullscreenPlugin, app: App, options?: FullscreenPluginInstallOptions) => App;
}

interface Native {
    request: 'requestFullscreen';
    exit: 'exitFullscreen';
}

const native: Partial<Native> = {}

if (isBrowserClient) {
    native.request = ['requestFullscreen', 'msRequestFullscreen', 'mozRequestFullScreen', 'webkitRequestFullscreen'].find((request) => {
        return !!(document.documentElement as any)[request]
    }) as 'requestFullscreen'
    native.exit = ['exitFullscreen', 'msExitFullscreen', 'mozCancelFullScreen', 'webkitExitFullscreen'].find((exit) => {
        return !!(document as unknown as any)[exit]
    }) as 'exitFullscreen'
}

function getFullElement (): HTMLElement | null {
    if (isBrowserClient) {
        return (
            (document as unknown as any).fullscreenElement
            || (document as unknown as any).mozFullScreenElement
            || (document as unknown as any).webkitFullscreenElement
            || (document as unknown as any).msFullscreenElement
            || null
        )
    }
    return null
}

function promisify (target: any, event: string): Promise<void> {
    try {
        const result: any = target[event]()
        return result === undefined ? Promise.resolve() : result
    } catch (err: any) {
        return Promise.reject(err)
    }
}

const state: FullscreenState = {
    __installed: false,
    isActive: false,
    activeEl: null
}

const plugin: FullscreenPlugin = {
    request (this: FullscreenState & FullscreenPlugin, target?: HTMLElement): Promise<void> {
        if (isBrowserClient && native.request) {
            const el: HTMLElement = target || document.documentElement
            if (this.activeEl === el) return Promise.resolve()
            // --
            const result: Promise<void> = this.activeEl && el.contains(this.activeEl)
                ? this.exit()
                : Promise.resolve()

            return result.finally(() => promisify(el, native.request!))
        }
        return Promise.reject(new Error('Fullscreen is not supported in this environment'))
    },
    exit (this: FullscreenState & FullscreenPlugin): Promise<void> {
        if (isBrowserClient && native.exit) {
            return this.isActive ? promisify(document, native.exit!) : Promise.resolve()
        }
        return Promise.reject(new Error('Fullscreen is not supported in this environment'))
    },
    toggle (this: FullscreenState & FullscreenPlugin, target?: HTMLElement): Promise<void> {
        return this.isActive ? this.exit() : this.request(target)
    },
    install (this: FullscreenState & FullscreenPlugin, app: App, options?: FullscreenPluginInstallOptions): App {
        const { $site } = options || {}

        this.__installed = true
        $site && ($site.fullscreen = this)

        const onUpdateActiveEl = () => {
            this.activeEl = !this.isActive ? null : getFullElement()
        }

        const onFullscreenChange = () => {
            this.isActive = !this.isActive
            onUpdateActiveEl()
        }

        if (isBrowserClient) {
            this.isActive = !!getFullElement()
            this.isActive && onUpdateActiveEl()

            ;['fullscreenchange', 'MSFullscreenChange', 'mozfullscreenchange', 'webkitfullscreenchange'].forEach((type) => {
                addDocumentEvt(type as 'fullscreenchange', onFullscreenChange)
            })
        }

        return app
    }
}

export default createReactivePlugin(state, plugin)
