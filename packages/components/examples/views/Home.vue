<template>
  <div>
      <ConfigProvider>
          <Table></Table>
      </ConfigProvider>
  </div>
</template>

<script setup lang="ts">
    import { ConfigProvider } from 'ant-design-vue'
    import { Table } from '../../src'
</script>

<style scoped>

</style>
