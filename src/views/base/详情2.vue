<script setup lang="ts">
import dataSource from '@/service/dataSource'
import { onMounted, ref } from 'vue'

defineOptions({
  name: 'UserInfo',
})
const props = defineProps<{ id: number }>()
const data = ref()
const isLoading = ref(false)
const error = ref(null)
const queryUser = () => {
  isLoading.value = true
  dataSource
    .findOneId(props.id)
    .then((res) => {
      data.value = res
      error.value = null
      isLoading.value = false
    })
    .catch((err) => {
      error.value = err
      data.value = undefined
      isLoading.value = false
    })
}
onMounted(() => {
  queryUser()
})
</script>

<template>
  <p v-if="isLoading">加载中</p>
  <p v-if="error">请求错误</p>
  <p v-if="data">
    {{ data.username }}
    <el-button @click="queryUser">刷新</el-button>
  </p>
</template>
