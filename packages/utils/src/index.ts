export const version: string = __VERSION__

export {
    isEmpty,
    isPromise,
    isEmptyObject,
    isEmptyElement,
    isValidElement
} from './is'
export {
    cloneProxyToRaw,
    omitNil,
    omitUndefined,
    toPx,
    namePathToString
} from './tools'
export {
    hasClass,
    addClass,
    removeClass,
    getElement,
    getWindowSize
} from './dom'
export {
    addEvt,
    cleanEvt,
    onceEvt,
    trigger,
    preventDefault,
    stopPropagation
} from './event'
export {
    flattenChildren,
    getSlot,
    getPropsSlot,
    getSlotVNode
} from './props-util'
export {
    optionsToEnum,
    enumToOptions,
    enumToText
} from './valueEnum'
export type {
    Dictionary,
    Recordable,
    IfAny,
    BaseNamePath,
    BaseSlot,
    BaseOptionType,
    BaseBadgeType,
    BaseEnumType,
    BaseFieldNames,
    LiteralUnion
} from './typings'
