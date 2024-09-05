import { addEvt, addClass, getWindowSize, removeClass } from '@site-pro/utils'
import { debounce, pick } from 'lodash-es'
import { createReactivePlugin } from '../plugin-utils'

const SIZE_LIST = ['sm', 'md', 'lg', 'xl', 'xxl']


const state = {
    width: 0,
    height: 0,
    name: 'xs',
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

const plugin = {
    install (this: typeof state, app, options, $site) {
        const { sizes = {}, delay = 16, classes } = options || {}

        $site && ($site.screen = this)

        this.sizes = pick({ ...this.sizes, ...sizes }, SIZE_LIST)

        const update = () => {
            const [width, height] = getWindowSize()
            const { sizes } = this

            this.width = width
            this.height = height

            this.lt.sm = width < sizes.sm
            this.lt.md = width < sizes.md
            this.lt.lg = width < sizes.lg
            this.lt.xl = width < sizes.xl
            this.lt.xxl = width < sizes.xxl

            this.gt.xs = width >= sizes.sm
            this.gt.sm = width >= sizes.md
            this.gt.md = width >= sizes.lg
            this.gt.lg = width >= sizes.xl
            this.gt.xl = width >= sizes.xxl

            this.xs = this.lt.sm
            this.sm = this.gt.xs && this.lt.md
            this.md = this.gt.sm && this.lt.lg
            this.lg = this.gt.md && this.lt.xl
            this.xl = this.gt.lg && this.lt.xxl
            this.xxl = this.gt.xl

            const name = (this.xs && 'xs')
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

        const updateEvent = debounce(update, delay)
        // @todo visualViewport
        addEvt(window as unknown as HTMLElement, 'resize', updateEvent, { passive: true })

        update()

        if (classes === true && this.name === 'xs') {
            addClass(document.body, `screen--xs`)
        }
    }
}

export default createReactivePlugin(state, plugin)
