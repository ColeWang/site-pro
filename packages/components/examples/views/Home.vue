<template>
  <ProForm @form-ref="onFormRef">
    <ProText/>
  </ProForm>
</template>

<script setup lang="ts">
  import { Form as ProForm, Text as ProText } from '../../src'
  
  function onFormRef (el: any) {
    console.log(el)
  }
</script>

<style scoped>

</style>
