<template>
  <ProDrawerForm @form-ref="onFormRef" @after-close="onAfterClose">
    <template v-slot:trigger>
      <Button>点击</Button>
    </template>
    <ProText label="Text" :name="['data', 'text']" :style="{ padding: '14px' }">
      <template v-slot:addonAfter></template>
    </ProText>
    <ProDateTime label="DateTime" :name="['data', 'dateTime']"/>
  </ProDrawerForm>
</template>

<script setup lang="ts">
  import { Button } from 'ant-design-vue'
  import { ModalForm as ProDrawerForm, Text as ProText, DateTime as ProDateTime } from '../../src'
  
  function onFormRef (el: any) {
    console.log(el)
  }
  
  function onAfterClose () {
    console.log()
  }
</script>

<style scoped>

</style>
