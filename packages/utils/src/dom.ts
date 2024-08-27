import type { ComponentPublicInstance, CSSProperties, MaybeRef } from 'vue'
import { unref } from 'vue'

export function hasClass<T extends Element | HTMLElement> (node: T, className: string): boolean {
    if (node.classList) {
        return node.classList.contains(className)
    }
    const originClass = node.className
    return ` ${originClass} `.indexOf(` ${className} `) > -1
}

export function addClass<T extends Element | HTMLElement> (node: T, className: string): void {
    if (node.classList) {
        node.classList.add(className)
    } else {
        if (!hasClass(node, className)) {
            node.className = `${node.className} ${className}`
        }
    }
}

export function removeClass<T extends Element | HTMLElement> (node: T, className: string): void {
    if (node.classList) {
        node.classList.remove(className)
    } else {
        if (hasClass(node, className)) {
            const originClass = node.className
            node.className = ` ${originClass} `.replace(` ${className} `, ' ')
        }
    }
}

export function setStyle<T extends Element | HTMLElement> (node: T, style: CSSProperties): CSSProperties {
    const keys = Object.keys(style)
    const oldStyle: CSSProperties = {}
    keys.forEach((key) => {
        oldStyle[key as any] = (node as HTMLElement).style[key as any]
    })
    keys.forEach((key) => {
        ;(node as any).style[key] = style[key as any]
    })
    return oldStyle
}

export function getElement<E extends ComponentPublicInstance | Element | HTMLElement, T = MaybeRef<E | null>> (el: T): E {
    const target = unref(el) as E | null
    if (target && (target as ComponentPublicInstance).$el) {
        return (target as ComponentPublicInstance).$el
    }
    return target as E
}

export function getWindowSize (): number[] {
    // @todo visualViewport
    return [window.innerWidth, window.innerHeight]
}
