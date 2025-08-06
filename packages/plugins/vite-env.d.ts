/// <reference types="vite/client" />

import 'vue/jsx'

declare global {
    export const __VERSION__: string
}

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}
