<template>
    <div>
        <Table :columns="columns"/>
    </div>
</template>

<script setup lang="ts">
    import type { Ref } from 'vue'
    import { ref } from 'vue'
    import type { TableColumn } from '../../src'
    import { Table } from '../../src'
    
    const columns: Ref<TableColumn[]> = ref([
        {
            title: 'Search',
            dataIndex: 'search',
            valueType: 'text',
            search: true,
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
</script>

<style scoped>

</style>
