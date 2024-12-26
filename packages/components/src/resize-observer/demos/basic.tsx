import type { Ref } from 'vue'
import { defineComponent, Fragment, ref } from 'vue'

import { ResizeObserver } from '@site-pro/components'

export default defineComponent(() => {
    const rectSize: Ref<any> = ref({ width: 0, height: 0 })

    function onResize (size: any) {
        rectSize.value = size
    }

    return () => {
        return (
            <Fragment>
                <ResizeObserver onResize={onResize}>
                    <div style={{ height: '200px', background: 'pink' }}/>
                </ResizeObserver>
                <div>{JSON.stringify(rectSize.value)}</div>
            </Fragment>
        )
    }
})
