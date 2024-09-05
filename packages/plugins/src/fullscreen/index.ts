import { App, ObjectPlugin } from 'vue'
import { addDocumentEvt } from '@site-pro/utils'
import { createReactivePlugin } from '../plugin-utils'

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

const native = {
    request: ['requestFullscreen', 'msRequestFullscreen', 'mozRequestFullScreen', 'webkitRequestFullscreen'].find((request) => !!document.documentElement[request]),
    exit: ['exitFullscreen', 'msExitFullscreen', 'mozCancelFullScreen', 'webkitExitFullscreen'].find((exit) => !!document[exit])
}

function getFullElement (): HTMLElement | null {
    return (
        document.fullscreenElement
        || document.mozFullScreenElement
        || document.webkitFullscreenElement
        || document.msFullscreenElement
        || null
    )
}

function promisify (target: HTMLElement, event: any) {
    try {
        const result = target[event]()
        return result || Promise.resolve()
    } catch (err) {
        return Promise.reject(err)
    }
}

const state: State = {
    isActive: false,
    activeEl: null
}

const plugin: Plugin = {
    request (this: State & Plugin, target?: HTMLElement) {
        const el = target || document.documentElement
        if (this.activeEl === el) return Promise.resolve()
        // --
        const result = this.activeEl !== null && el.contains(this.activeEl)
            ? this.exit()
            : Promise.resolve()

        return result.finally(() => promisify(el, native.request))
    },
    exit (this: State & Plugin) {
        return this.isActive
            ? promisify(document, native.exit)
            : Promise.resolve()
    },
    toggle (this: State & Plugin, target?: HTMLElement) {
        return this.isActive ? this.exit() : this.request(target)
    },
    install (this: State & Plugin, app: App, options?: FullscreenInstallOptions) {
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
