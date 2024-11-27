<script setup lang="ts">
import { useQuery } from 'zan-mixin-query'
import dataSource from '@/service/dataSource'

defineOptions({
  name: 'UserInfo',
})
const props = defineProps<{ id: number }>()
const { data, isError, isLoading, refetch } = useQuery({
  queryKey: ['user-mixin', props.id],
  queryFn() {
    return dataSource.findOneId(props.id)
  },
})
</script>

<template>
  <p v-if="isLoading">加载中</p>
  <p v-if="isError">请求错误</p>
  <p v-if="data">
    {{ data.username }}
    <el-button @click="refetch">刷新</el-button>
  </p>
</template>
