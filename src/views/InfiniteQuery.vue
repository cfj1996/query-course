<script setup lang="ts">
import { useInfiniteQuery } from 'zan-mixin-query'
import dataSource from '@/service/dataSource'
import { computed } from 'vue'
import SuspenseLoading from '@/components/Loading.vue'

defineOptions({
  name: 'InfiniteQuery',
})
const setPageError = (page: number) => {
  localStorage.setItem(`error`, page ? page.toString() : '')
}
const {
  data,
  hasNextPage,
  isLoading,
  isError,
  error,
  isFetchingNextPage,
  isRefetching,
  refetch,
  isFetchNextPageError,
  isRefetchError,
  fetchNextPage,
} = useInfiniteQuery({
  queryKey: [`infinite-query`, 3],
  initialPageParam: 1,
  queryFn({ queryKey, pageParam }) {
    return dataSource.finPagedList({
      username: '',
      page: pageParam,
      pageSize: queryKey[1] as number,
    })
  },
  getNextPageParam: (lastPage) => {
    if (lastPage.currentPage < lastPage.pages) {
      return lastPage.currentPage + 1
    }
    return null
  },
})
const allList = computed(() => data.value?.pages?.map((i) => i.items).flat())
</script>

<template>
  <el-card>
    <el-button-group>
      <el-button @click="setPageError(0)">默认</el-button>
      <el-button @click="setPageError(1)">第一页报错</el-button>
      <el-button @click="setPageError(2)">获取下一页报错</el-button>
    </el-button-group>
    <SuspenseLoading v-if="isLoading" />
    <el-result
      v-if="isError && !isFetchNextPageError && !isRefetchError"
      icon="error"
      :title="error?.message"
    />
    <ul v-if="allList?.length">
      <li class="py-2" v-for="user in allList" :key="user.id">
        <el-text>姓名: {{ user.username }}</el-text>
      </li>
      <li v-if="hasNextPage">
        <el-button
          :disabled="isFetchingNextPage"
          :loading="isFetchingNextPage"
          @click="fetchNextPage"
        >
          <!--    获取下一页接口错误时      -->
          <template v-if="isFetchNextPageError"> （{{ error?.message }}），请点击重试 </template>
          <template v-else>
            {{ isFetchingNextPage ? '获取中...' : '获取下一页' }}
          </template>
        </el-button>
      </li>
      <li v-else>
        <el-button :disabled="isFetchingNextPage" :loading="isRefetching" @click="refetch()">
          {{ isRefetching ? '更新中...' : '已经到底了,刷新数据' }}
        </el-button>
      </li>
    </ul>
  </el-card>
</template>

<style scoped></style>
