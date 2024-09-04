<template>
  <ProQueryFilter :label-width="90" :on-values-change="onValuesChange" :on-finish="onFinish">
    <ProText name="aaa" label="ProText" :label-width="150"></ProText>
    <ProText name="bbb" label="ProText" :label-width="100"></ProText>
    <ProText :name="['ccc', 'ddd']" label="ProText"></ProText>
  </ProQueryFilter>
</template>

<script setup lang="ts">
  import { QueryFilter as ProQueryFilter, Text as ProText } from '../../src'
  
  function onValuesChange (values: any) {
    console.log(values)
  }
  
  function onFinish (values: any) {
    console.log(values)
  }
</script>

<style scoped>

</style>
