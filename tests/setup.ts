import { TextDecoder, TextEncoder } from 'node:util'
import { config } from '@vue/test-utils'
import ResizeObserver from './__mocks__/ResizeObserver'
import matchMedia from './__mocks__/matchMedia'
import { resizeWindow } from './util'

config.global.stubs = {
    'transition-group': false,
    'transition': false
}

global.ResizeObserver = ResizeObserver

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: matchMedia
})

Object.defineProperty(window, 'TextEncoder', {
    writable: true,
    value: TextEncoder,
})
Object.defineProperty(window, 'TextDecoder', {
    writable: true,
    value: TextDecoder,
})

const originGetComputedStyle = global.getComputedStyle
global.getComputedStyle = (ele: Element) => {
    return originGetComputedStyle(ele)
}

global.requestAnimationFrame = (callback: FrameRequestCallback) => {
    return setTimeout(callback, 0)
}

global.cancelAnimationFrame = (callback: number) => {
    return clearTimeout(callback)
}

window.resizeTo = resizeWindow

window.scrollTo = () => {
    return false
}

