import { defineComponent, Fragment, reactive } from 'vue'
import { Action, Table } from '@site-pro/components'

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
            title: 'Address',
            dataIndex: 'address'
        },
        {
            title: 'Action',
            customRender: () => {
                return (
                    <Action.Group max={3}>
                        <Action>操作1</Action>
                        <Action type={'error'}>操作2</Action>
                        <Action type={'warning'}>操作3</Action>
                        <Action>操作4</Action>
                        <Action>长长长长长长长长长长长长长长</Action>
                    </Action.Group>
                )
            }
        }
    ])

    function request (params: any) {
        return new Promise((resolve) => {
            console.log(params)

            const data = [
                {
                    key: '1',
                    name: 'John Brown',
                    age: '1',
                    address: 'New York No. 1 Lake Park',
                },
                {
                    key: '2',
                    name: 'Jim Green',
                    age: '2',
                    address: 'London No. 1 Lake Park',
                }
            ]

            setTimeout(() => {
                resolve({ data: data })
            }, 1000)
        })
    }

    return () => {
        return (
            <Fragment>
                <Table request={request} columns={columns}/>
            </Fragment>
        )
    }
})
