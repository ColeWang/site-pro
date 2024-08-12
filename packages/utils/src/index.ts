import type { BasicTarget, Dictionary } from './typings'

const version: string = __VERSION__

export { version }

export * from './is'
export * from './tools'
export * from './dom'
export * from './event'
export * from './props-util'

export type { BasicTarget, Dictionary }
