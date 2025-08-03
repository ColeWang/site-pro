import type { ComponentPublicInstance, CSSProperties, MaybeRef } from 'vue'
import { unref } from 'vue'
import type { BaseRefType } from './types'

export const isBrowserClient: boolean = isUseDom()

export function isUseDom (): boolean {
    return !!(typeof window !== 'undefined' && window.document && window.document.createElement)
}

export function hasClass (node: HTMLElement, className: string): boolean {
    if (node.classList) {
        return node.classList.contains(className)
    }
    const originClass: string = node.className
    return ` ${originClass} `.indexOf(` ${className} `) > -1
}

export function addClass (node: HTMLElement, className: string): void {
    if (node.classList) {
        node.classList.add(className)
    } else {
        if (!hasClass(node, className)) {
            node.className = `${node.className} ${className}`
        }
    }
}

export function removeClass (node: HTMLElement, className: string): void {
    if (node.classList) {
        node.classList.remove(className)
    } else {
        if (hasClass(node, className)) {
            const originClass = node.className
            node.className = ` ${originClass} `.replace(` ${className} `, ' ')
        }
    }
}

export function setStyle (node: HTMLElement, style: CSSProperties): CSSProperties {
    const keys: any[] = Object.keys(style)
    const oldStyle: CSSProperties = {}
    keys.forEach((key) => {
        oldStyle[key] = node.style[key]
    })
    keys.forEach((key) => {
        node.style[key] = style[key] as any
    })
    return oldStyle
}

export function getElement (el: MaybeRef<BaseRefType>): HTMLElement | null {
    const target: BaseRefType = unref(el)
    if (target && (target as ComponentPublicInstance).$el) {
        return (target as ComponentPublicInstance).$el
    }
    return target as (HTMLElement | null)
}

export function getWindowSize (): { width: number; height: number } {
    if (typeof window !== 'undefined' && typeof window.innerWidth === 'number') {
        return { width: window.innerWidth, height: window.innerHeight }
    }
    return { width: 0, height: 0 }
}
