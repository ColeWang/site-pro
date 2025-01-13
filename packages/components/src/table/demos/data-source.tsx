import { defineComponent, Fragment, reactive } from 'vue'
import { Table } from '@site-pro/components'

export default defineComponent(() => {
    const columns: any = reactive([
        {
            title: 'Test',
            search: true,
            initialValue: '123',
            dataIndex: ['data', 'test'],
            hideInTable: true
        },
        {
            title: 'Name',
            search: true,
            initialValue: '123',
            dataIndex: 'name',
            formItemProps: {
                required: true
            }
        },
        {
            title: 'Age',
            search: true,
            dataIndex: 'age',
            valueType: 'select',
            valueEnum: {
                '1': '选项一',
                '2': '选项二'
            }
        },
        {
            title: 'Address Address Address',
            dataIndex: 'address'
        }
    ])

    function request (params: any,) {
        return new Promise((resolve) => {
            console.log(params)
            const data = Array.apply(null, Array(100)).map((_, index) => {
                return {
                    key: index,
                    name: 'John Brown',
                    age: '1',
                    address: 'New York No. 1 Lake Park',
                }
            })
            setTimeout(() => {
                resolve({ data: data })
            }, 1000)
        })
    }

    return () => {
        return (
            <Fragment>
                <Table
                    search={{ showCollapse: true }}
                    request={request}
                    requestOnPaginateChange={false}
                    columns={columns}
                />
            </Fragment>
        )
    }
})
