<template>
    <div>
        <Table
            title="Title"
            :columns="columns"
            :request="request"
            :before-search-submit="onBeforeSearchSubmit"
        />
    </div>
</template>

<script setup lang="ts">
    import type { Ref } from 'vue'
    import { ref } from 'vue'
    import type { TableColumn } from '@site-pro/components/table'
    import { Table } from '@site-pro/components'
    
    const columns: Ref<TableColumn[]> = ref([
        {
            title: 'Search',
            dataIndex: 'search',
            valueType: 'text',
            search: {
                transform: (value: any) => {
                    console.log(value)
                    return value + '666'
                }
            },
            hideInTable: true,
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age'
        }
    ])
    
    function onBeforeSearchSubmit (values: any): any {
        console.log(values)
        return { ...values, test: '123', search: values.search + '_123' }
    }
    
    function request (params: any, paginate: any) {
        console.log(params, paginate)
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ data: [] })
            }, 1000)
        })
    }
</script>

<style scoped>

</style>
