import { App, ObjectPlugin } from 'vue'
import { addClass, addWindowEvt, getWindowSize, removeClass } from '@site-pro/utils'
import { debounce, pick } from 'lodash-es'
import { createReactivePlugin } from '../plugin-utils'

export type ScreenStateName = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export interface ScreenPluginInstallOptions {
    sizes?: Record<Exclude<ScreenStateName, 'xs'>, number>;
    delay?: number;
    classes?: boolean;
    $site?: any;
}

export interface ScreenState extends Record<ScreenStateName, boolean> {
    __installed: boolean;
    name: ScreenStateName;
    width: number;
    height: number;
    sizes: Record<Exclude<ScreenStateName, 'xs'>, number>;
    lt: Record<Exclude<ScreenStateName, 'xs'>, boolean>;
    gt: Record<Exclude<ScreenStateName, 'xxl'>, boolean>;
}

export interface ScreenPlugin extends ObjectPlugin {
    install: (this: ScreenState & ScreenPlugin, app: App, options?: ScreenPluginInstallOptions) => App;
}

const state: ScreenState = {
    __installed: false,
    name: 'xs',
    width: 0,
    height: 0,
    sizes: {
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        xxl: 1600
    },
    lt: {
        sm: true,
        md: true,
        lg: true,
        xl: true,
        xxl: true
    },
    gt: {
        xs: false,
        sm: false,
        md: false,
        lg: false,
        xl: false
    },
    xs: true,
    sm: false,
    md: false,
    lg: false,
    xl: false,
    xxl: false
}

const plugin: ScreenPlugin = {
    install (this: ScreenState & ScreenPlugin, app: App, options?: ScreenPluginInstallOptions): App {
        const { sizes: optionsSizes, delay, classes, $site } = options || {}

        this.__installed = true
        $site && ($site.screen = this)

        this.sizes = pick({ ...this.sizes, ...optionsSizes }, ['sm', 'md', 'lg', 'xl', 'xxl'])

        const update = () => {
            const { width, height } = getWindowSize()

            this.width = width
            this.height = height

            this.lt.sm = width < this.sizes.sm
            this.lt.md = width < this.sizes.md
            this.lt.lg = width < this.sizes.lg
            this.lt.xl = width < this.sizes.xl
            this.lt.xxl = width < this.sizes.xxl

            this.gt.xs = width >= this.sizes.sm
            this.gt.sm = width >= this.sizes.md
            this.gt.md = width >= this.sizes.lg
            this.gt.lg = width >= this.sizes.xl
            this.gt.xl = width >= this.sizes.xxl

            this.xs = this.lt.sm
            this.sm = this.gt.xs && this.lt.md
            this.md = this.gt.sm && this.lt.lg
            this.lg = this.gt.md && this.lt.xl
            this.xl = this.gt.lg && this.lt.xxl
            this.xxl = this.gt.xl

            const name: ScreenStateName = (this.xs && 'xs')
                || (this.sm && 'sm')
                || (this.md && 'md')
                || (this.lg && 'lg')
                || (this.xl && 'xl')
                || 'xxl'

            if (name !== this.name) {
                if (classes === true) {
                    removeClass(document.body, `screen--${this.name}`)
                    addClass(document.body, `screen--${name}`)
                }
                this.name = name
            }
        }

        const updateEvent = debounce(update, delay || 16)

        addWindowEvt('resize', updateEvent, { passive: true })

        update()

        if (classes === true && this.name === 'xs') {
            addClass(document.body, `screen--xs`)
        }

        return app
    }
}

export default createReactivePlugin(state, plugin)
