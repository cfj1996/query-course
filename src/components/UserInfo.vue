<script lang="ts">
import { createQuery } from 'zan-mixin-query'
import dataSource from '@/service/dataSource'

const [userMixin, getUserState] = createQuery({
  queryKey() {
    return ['user-mixin', this.id]
  },
  queryFn() {
    return dataSource.findOneId(this.id)
  },
  enabled() {
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
  <el-card class="min-h-20" v-loading="userState.isLoading">
    <el-descriptions v-if="userState.data">
      <el-descriptions-item label="用户名">{{ userState.data.username }}</el-descriptions-item>
      <el-descriptions-item label="邮箱">{{ userState.data.email }}</el-descriptions-item>
      <el-descriptions-item label="性别">{{
        userState.data.sex ? '男' : '女'
      }}</el-descriptions-item>
      <el-descriptions-item label="年龄">{{ userState.data.age }}</el-descriptions-item>
      <el-descriptions-item label="描述">{{ userState.data.desc }}</el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>
