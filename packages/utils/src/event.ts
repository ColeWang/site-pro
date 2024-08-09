import { isBoolean } from 'lodash-es'

export function addEvt (
    el: Element,
    type: string,
    listener: EventListener,
    options?: boolean | EventListenerOptions
) {
    el.addEventListener(type, listener, options)
}

export function cleanEvt (
    el: Element,
    type: string,
    listener: EventListener,
    options?: boolean | EventListenerOptions
) {
    el.removeEventListener(type, listener, options)
}

export function onceEvt (
    el: Element,
    type: string,
    listener: EventListener,
    options?: boolean | EventListenerOptions
) {
    function handler (evt: Event) {
        listener.call(null, evt)
        cleanEvt(el, type, handler, options)
    }

    addEvt(el, type, handler, options)
}

export function stopPropagation (evt: Event) {
    evt.stopPropagation()
}

export function preventDefault (evt: Event, isStopPropagation: boolean) {
    if (!isBoolean(evt.cancelable) || evt.cancelable) {
        evt.preventDefault()
    }
    if (isStopPropagation) {
        stopPropagation(evt)
    }
}

export function trigger (target: Element, type: string) {
    const inputEvent = document.createEvent('HTMLEvents')
    inputEvent.initEvent(type, true, true)
    target.dispatchEvent(inputEvent)
}
