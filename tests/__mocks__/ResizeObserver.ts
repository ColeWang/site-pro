export default class ResizeObserver<T extends Element = Element> {
    readonly callback: ResizeObserverCallback
    observations: T[] = []

    constructor (callback: ResizeObserverCallback) {
        this.callback = callback
    }

    observe (element: T): void {
        this.observations.push(element)
    }

    unobserve (element: T): void {
        this.observations = this.observations.filter((obs) => obs !== element)
    }

    disconnect (): void {
        this.observations = []
    }

    notify (entries: ResizeObserverEntry[]): void {
        this.callback(entries, this)
    }
}

// describe('Component', () => {
//     it('updates width and height when ResizeObserver notifies', async () => {
//         const wrapper = mount(Component)
//         // 获取模拟的 ResizeObserver 实例
//         const resizeObserver = global.ResizeObserver.instances[0]
//
//         // 手动触发 ResizeObserver 的回调
//         resizeObserver.notify([
//             {
//                 contentRect: { width: 200, height: 300 },
//                 target: wrapper.find('.resize-element').element,
//             },
//         ])
//
//         // 等待 Vue 的 DOM 更新队列清空
//         await wrapper.vm.$nextTick()
//
//         expect(wrapper.vm.width).toBe(200)
//         expect(wrapper.vm.height).toBe(300)
//     })
// })
