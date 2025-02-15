import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

function mountTest (Component: any): void {
    describe(`mount and unmount`, () => {
        it(`component could be updated and unmounted without errors`, () => {
            const wrapper: VueWrapper = mount(() => <Component/>, {
                sync: false,
                attachTo: 'body'
            })
            const hasThrow = () => {
                wrapper.vm.$forceUpdate()
                wrapper.unmount()
            }
            expect(hasThrow).not.toThrow()
        })
    })
}

export default mountTest
