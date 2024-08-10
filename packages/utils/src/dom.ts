import { ComponentPublicInstance, Ref, unref } from 'vue'

export function hasClass (node: Element, className: string): boolean {
    if (node.classList) {
        return node.classList.contains(className)
    }
    const originClass = node.className
    return ` ${originClass} `.indexOf(` ${className} `) > -1
}

export function addClass (node: Element, className: string): void {
    if (node.classList) {
        node.classList.add(className)
    } else {
        if (!hasClass(node, className)) {
            node.className = `${node.className} ${className}`
        }
    }
}

export function removeClass (node: Element, className: string): void {
    if (node.classList) {
        node.classList.remove(className)
    } else {
        if (hasClass(node, className)) {
            const originClass = node.className
            node.className = ` ${originClass} `.replace(` ${className} `, ' ')
        }
    }
}

export function getElement (el: Ref<Element | ComponentPublicInstance | null>): Element | undefined {
    const target = unref(el)
    if (target) {
        return (target as ComponentPublicInstance).$el || target
    }
    return undefined
}

export function getWindowSize (): number[] {
    // @todo visualViewport
    return [window.innerWidth, window.innerHeight]
}
