export function addWindowEvt<K extends keyof WindowEventMap> (
    type: K,
    listener: (evt: WindowEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions
): void {
    window.addEventListener(type, listener, options)
}

export function cleanWindowEvt<K extends keyof WindowEventMap> (
    type: K,
    listener: (evt: WindowEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions
): void {
    window.removeEventListener(type, listener, options)
}

export function onceWindowEvt<K extends keyof WindowEventMap> (
    type: K,
    listener: (evt: WindowEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions
): void {
    function handler (evt: WindowEventMap[K]): void {
        listener.call(null, evt)
        cleanWindowEvt(type, handler, options)
    }

    addWindowEvt(type, handler, options)
}

export function addDocumentEvt<K extends keyof DocumentEventMap> (
    type: K,
    listener: (evt: DocumentEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions
): void {
    document.addEventListener(type, listener, options)
}

export function cleanDocumentEvt<K extends keyof DocumentEventMap> (
    type: K,
    listener: (evt: DocumentEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions
): void {
    document.removeEventListener(type, listener, options)
}

export function onceDocumentEvt<K extends keyof DocumentEventMap> (
    type: K,
    listener: (evt: DocumentEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions
): void {
    function handler (evt: DocumentEventMap[K]): void {
        listener.call(null, evt)
        cleanDocumentEvt(type, handler, options)
    }

    addDocumentEvt(type, handler, options)
}

export function addEvt<T extends HTMLElement, K extends keyof HTMLElementEventMap> (
    target: T,
    type: K,
    listener: (evt: HTMLElementEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions
): void {
    target.addEventListener(type, listener, options)
}

export function cleanEvt<T extends HTMLElement, K extends keyof HTMLElementEventMap> (
    target: T,
    type: K,
    listener: (evt: HTMLElementEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions
): void {
    target.removeEventListener(type, listener, options)
}

export function onceEvt<T extends HTMLElement, K extends keyof HTMLElementEventMap> (
    target: T,
    type: K,
    listener: (evt: HTMLElementEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions
): void {
    function handler (evt: HTMLElementEventMap[K]): void {
        listener.call(null, evt)
        cleanEvt(target, type, handler, options)
    }

    addEvt(target, type, handler, options)
}

export function stopPropagation (evt: Event): void {
    evt.stopPropagation()
}

export function preventDefault (evt: Event, isStopPropagation?: boolean): void {
    if (evt.cancelable) {
        evt.preventDefault()
    }
    if (isStopPropagation) {
        stopPropagation(evt)
    }
}

export function trigger<T> (target: EventTarget, type?: string): void {
    const event: CustomEvent<T> = new CustomEvent(type || 'HTMLEvents', {
        cancelable: true,
        bubbles: true
    })
    target.dispatchEvent(event)
}
