import { isBoolean } from 'lodash-es'

export function addEvt<T extends Element | HTMLElement> (
    el: T,
    type: string,
    listener: EventListener,
    options?: boolean | EventListenerOptions
): void {
    el.addEventListener(type, listener, options)
}

export function cleanEvt<T extends Element | HTMLElement> (
    el: T,
    type: string,
    listener: EventListener,
    options?: boolean | EventListenerOptions
): void {
    el.removeEventListener(type, listener, options)
}

export function onceEvt<T extends Element | HTMLElement> (
    el: T,
    type: string,
    listener: EventListener,
    options?: boolean | EventListenerOptions
): void {
    function handler (evt: Event) {
        listener.call(null, evt)
        cleanEvt(el, type, handler, options)
    }

    addEvt(el, type, handler, options)
}

export function stopPropagation (evt: Event): void {
    evt.stopPropagation()
}

export function preventDefault (evt: Event, isStopPropagation?: boolean): void {
    if (!isBoolean(evt.cancelable) || evt.cancelable) {
        evt.preventDefault()
    }
    if (isStopPropagation) {
        stopPropagation(evt)
    }
}

export function trigger<T extends Element | HTMLElement> (target: T, type: string): void {
    const inputEvent = document.createEvent('HTMLEvents')
    inputEvent.initEvent(type, true, true)
    target.dispatchEvent(inputEvent)
}
