<script lang="ts">
import { useQuery } from 'zan-mixin-query'
import dataSource from '@/service/dataSource'
import { ref } from 'vue'
import UserInfo from '@/components/UserInfo.vue'

export default {
  name: 'SuspenseQuery',
  components: { UserInfo },
  async setup() {
    const { data, suspense, refetch } = useQuery({
      suspense: true,
      queryKey: ['user-suspense'],
      queryFn(ctx) {
        return dataSource
          .finPagedList({
            username: 'w221',
            page: 1,
            pageSize: 5,
          })
          .then((res) => {
            if (res.items?.length === 0) {
              const error = new Error('暂无数据') as any
              error._query = ctx
              error._refetch = refetch
              throw error
            }
            return res
          })
      },
    })
    await suspense()
    const activeName = ref(data.value!.items[0].id)
    return { activeName, data }
  },
}
</script>

<template>
  <el-card title="Suspense 查询">
    <el-tabs v-model="activeName">
      <el-tab-pane
        v-for="item in data!.items"
        :label="item.username"
        :name="item.id"
        :key="item.id"
      />
    </el-tabs>
    <UserInfo :id="activeName" />
  </el-card>
</template>
