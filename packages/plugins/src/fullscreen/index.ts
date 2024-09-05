import { App, ObjectPlugin } from 'vue'
import { addDocumentEvt } from '@site-pro/utils'
import { createReactivePlugin } from '../plugin-utils'

interface Native {
    request: 'requestFullscreen';
    exit: 'exitFullscreen';
}

const native: Native = {
    request: ['requestFullscreen', 'msRequestFullscreen', 'mozRequestFullScreen', 'webkitRequestFullscreen'].find((request) => {
        return !!(document.documentElement as any)[request]
    }) as 'requestFullscreen',
    exit: ['exitFullscreen', 'msExitFullscreen', 'mozCancelFullScreen', 'webkitExitFullscreen'].find((exit) => {
        return !!(document as unknown as any)[exit]
    }) as 'exitFullscreen',
}

interface FullscreenInstallOptions {
    $site?: any;
}

interface State {
    isActive: boolean;
    activeEl: HTMLElement | null;
}

interface Plugin extends ObjectPlugin {
    request: (this: State & Plugin, target?: HTMLElement) => Promise<void>;
    exit: (this: State & Plugin) => Promise<void>;
    toggle: (this: State & Plugin, target?: HTMLElement) => Promise<void>;
    install: (this: State & Plugin, app: App, options: FullscreenInstallOptions) => App;
}

function getFullElement (): HTMLElement | null {
    return (
        (document as unknown as any).fullscreenElement
        || (document as unknown as any).mozFullScreenElement
        || (document as unknown as any).webkitFullscreenElement
        || (document as unknown as any).msFullscreenElement
        || null
    )
}

function promisify (target: any, event: string): Promise<void> {
    try {
        const result = target[event]()
        return result ? result : Promise.resolve()
    } catch (err) {
        return Promise.reject(err)
    }
}

const state: State = {
    isActive: false,
    activeEl: null
}

const plugin: Plugin = {
    request (this: State & Plugin, target?: HTMLElement): Promise<void> {
        const el: HTMLElement = target || document.documentElement
        if (this.activeEl === el) return Promise.resolve()
        // --
        const result = this.activeEl && el.contains(this.activeEl)
            ? this.exit()
            : Promise.resolve()

        return result.finally(() => promisify(el, native.request))
    },
    exit (this: State & Plugin): Promise<void> {
        return this.isActive ? promisify(document, native.exit) : Promise.resolve()
    },
    toggle (this: State & Plugin, target?: HTMLElement): Promise<void> {
        return this.isActive ? this.exit() : this.request(target)
    },
    install (this: State & Plugin, app: App, options?: FullscreenInstallOptions): App {
        const { $site } = options || {}

        $site && ($site.fullscreen = this)

        const onUpdateActiveEl = () => {
            this.activeEl = !this.isActive ? null : getFullElement()
        }

        const onFullscreenChange = () => {
            this.isActive = !this.isActive
            onUpdateActiveEl()
        }

        this.isActive = !!getFullElement()
        this.isActive && onUpdateActiveEl()

        ;['fullscreenchange', 'MSFullscreenChange', 'mozfullscreenchange', 'webkitfullscreenchange'].forEach((type) => {
            addDocumentEvt(type as 'fullscreenchange', onFullscreenChange)
        })

        return app
    }
}

export default createReactivePlugin(state, plugin)
