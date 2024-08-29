<template>
  <ProDrawerForm @after-close="onAfterClose" @form-ref="onFormRef">
    <template v-slot:trigger>
      <Button>点击</Button>
    </template>
    <ProText label="Text" :name="['data', 'text']" :style="{ padding: '14px' }"/>
    <ProDateTime label="DateTime" :name="['data', 'dateTime']"/>
  </ProDrawerForm>
</template>

<script setup lang="ts">
  import { Button } from 'ant-design-vue'
  import { ModalForm as ProDrawerForm, Text as ProText, DateTime as ProDateTime } from '../../src'
  
  function onFormRef () {
    // console.log(el)
  }
  
  function onAfterClose (value: any) {
    console.log(value)
  }
</script>

<style scoped>

</style>
