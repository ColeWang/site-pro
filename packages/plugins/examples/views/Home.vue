<template>
  <div>
    <Button @click="onLoadingClick">Loading</Button>
    <Button @click="onProgressClick">Progress</Button>
    <Button @click="onFullscreenClick">Fullscreen</Button>
  </div>
</template>

<script setup lang="ts">
  import { watch } from 'vue'
  import { Button } from 'ant-design-vue'
  import { useSite } from '../../src'
  
  const $site = useSite()
  
  console.log($site)
  
  function onLoadingClick () {
    $site.loading.show()
    
    setTimeout(() => {
      $site.loading.hide({
        onAfterClose: () => {
          console.log('onAfterClose')
        }
      })
    }, 2000)
  }
  
  function onProgressClick () {
    $site.progress.start()

    setTimeout(() => {
      $site.progress.done()
    }, 200)
  }
  
  function onFullscreenClick () {
    $site.fullscreen.toggle()
  }
  
  watch(() => $site.screen.name, (value) => {
    console.log(value)
  })
</script>

<style scoped>

</style>
