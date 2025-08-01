import { defineComponent, reactive, ref, unref } from 'vue'
import { ConfigProvider, QueryFilter, Text } from '@site-pro/components'
import type { UseBreakPointConfig } from '@site-pro/components/query-filter'
import { Button } from 'ant-design-vue'

export default defineComponent(() => {
    const isChange = ref(false)

    const baseConfig: UseBreakPointConfig = {
        horizontal: [
            [Infinity, 6, 'vertical']
        ],
        vertical: [
            [Infinity, 6, 'vertical']
        ]
    }

    const changeConfig: UseBreakPointConfig = {
        horizontal: [
            [Infinity, 12, 'horizontal']
        ],
        vertical: [
            [Infinity, 12, 'horizontal']
        ]
    }

    const extended = reactive({
        QueryFilter: {
            breakPointConfig: baseConfig
        }
    })

    function onClickExtended () {
        if (unref(isChange)) {
            extended.QueryFilter = {
                breakPointConfig: baseConfig
            }
            isChange.value = false
        } else {
            extended.QueryFilter = {
                breakPointConfig: changeConfig
            }
            isChange.value = true
        }
    }

    return () => {
        return (
            <ConfigProvider extended={extended}>
                <QueryFilter>
                    <Text label={'Text1'} name={'text1'}/>
                    <Text label={'Text2'} name={'text2'}/>
                    <Text label={'Text3'} name={'text3'}/>
                    <Text label={'Text4'} name={'text4'}/>
                </QueryFilter>
                <Button onClick={onClickExtended}>Change Extended</Button>
            </ConfigProvider>
        )
    }
})
