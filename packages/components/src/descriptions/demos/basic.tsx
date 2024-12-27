import { defineComponent } from 'vue'
import { Descriptions } from '@site-pro/components'
import dayjs from 'dayjs'

export default defineComponent(() => {
    return () => {
        return (
            <Descriptions column={2} title={'定义列表'}>
                <Descriptions.Item
                    label={'文本'}
                    valueType={'text'}
                    tooltip={'Text'}
                    text={'这是一段很长很长超级超级长的无意义说明文本并且重复了很多没有意义的词语，就是为了让它变得很长很长超级超级长'}
                    span={2}
                    contentStyle={{
                        maxWidth: '80%',
                    }}
                />
                <Descriptions.Item
                    label={'选择框'}
                    valueType={'select'}
                    text={'open'}
                    valueEnum={{
                        all: { text: '全部', status: 'default' },
                        open: {
                            text: '未解决',
                            status: 'error',
                        },
                        closed: {
                            text: '已解决',
                            status: 'success',
                        },
                        processing: {
                            text: '解决中',
                            status: 'processing',
                        },
                    }}
                />
                <Descriptions.Item
                    label={'日期时间'}
                    valueType={'dateTime'}
                    text={dayjs().valueOf()}
                />
                <Descriptions.Item
                    label={'日期'}
                    valueType={'date'}
                    text={dayjs().valueOf()}
                />
                <Descriptions.Item
                    label={'日期区间'}
                    valueType={'dateTimeRange'}
                    text={[dayjs().add(-1, 'd').valueOf(), dayjs().valueOf()]}
                />
                <Descriptions.Item
                    label={'时间'}
                    valueType={'time'}
                    text={dayjs().valueOf()}
                />
            </Descriptions>
        )
    }
})
