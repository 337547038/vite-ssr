<template>
  <div>
    <div>pinia name:{{ usePinia.name }}</div>
    <div>
      <el-button @click="changeName">change name</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { piniaTest } from '../store'
  import { getRequest } from '/api'

  const usePinia = piniaTest()
  const changeName = () => {
    usePinia.changeName('修改后的值' + new Date().getTime())
  }
</script>
