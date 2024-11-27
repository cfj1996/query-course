<script lang="ts">
import { createQuery } from 'zan-mixin-query'
import dataSource from '@/service/dataSource.js'

const [userMixin, getUserState] = createQuery({
  queryKey() {
    return ['user', this.id]
  },
  queryFn() {
    return dataSource.findOneId(this.id)
  },
  enabled() {
    console.log('this', this)
    return Boolean(this.id)
  },
})
export default {
  name: 'UserInfo',
  props: {
    id: Number,
  },
  mixins: [userMixin],
  computed: {
    userState: getUserState,
  },
}
</script>

<template>
  <div>
    <p v-if="userState.isLoading">加载中</p>
    <p v-if="userState.isError">请求错误</p>
    <p v-if="userState.data">
      {{ userState.data.username }}
      <el-button @click="userState.refetch">刷新</el-button>
    </p>
  </div>
</template>
