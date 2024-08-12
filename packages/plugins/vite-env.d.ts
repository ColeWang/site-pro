/// <reference types="vite/client" />
import 'vue/jsx'

declare const __VERSION__: string

declare module '*.vue' {
    import { DefineComponent } from 'vue'
    // eslint-disable-next-line @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
}
