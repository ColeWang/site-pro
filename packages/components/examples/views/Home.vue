<template>
  <ProForm @values-change="onValuesChange" @form-ref="onFormRef">
    <ProText label="Text" :name="['data', 'text']" :style="{ padding: '14px' }"/>
    <ProDateTime label="DateTime" :name="['data', 'dateTime']"/>
  </ProForm>
</template>

<script setup lang="ts">
  import { Form as ProForm, Text as ProText, DateTime as ProDateTime } from '../../src'
  
  function onFormRef (el: any) {
    console.log(el)
  }
  
  function onValuesChange (values: any) {
    console.log(values)
  }
</script>

<style scoped>

</style>
