前言：整个网络请求可以分为推数据（数据变更），拉取数据（数据展示），以往的处理拉取数据采用主要编码实现采用的的事件编程，在组件对应的生命周期发送请求，会定义很多对应网络请求的变量，造成代码篇幅很长，且关联查询实现复杂，边界情况未处理(
请求时序等)。

# zan-mixin-query 使用介绍

## 关于拉取数据类： useQuery，useInfiniteQuery， useQueries， useIsFetching Api

Vue Query (只包含拉取数据这类api) 是一个数据获取、缓存和同步库，它通过提供高效、简单的数据获取和状态管理，极大地简化了与服务器交互的复杂性。Vue
Query 的核心原理涉及缓存、自动刷新、后台数据更新和页面之间的数据同步等。

## 关于数据推送类： useMutation， useIsMutating，useMutationState Api

主要场景创建新资源，更新现有资源，删除资源发送的请求，useMutation 在操作完成后提供了对操作结果的控制，可以对结果进行服务器更新、页面重新渲染、以及错误处理等

## useQuery 使用介绍

### api 参数

```tsx
import { useQuery } from 'zan-mixin-query'

const {
  data,
  dataUpdatedAt,
  error,
  errorUpdatedAt,
  failureCount,
  failureReason,
  fetchStatus,
  isError,
  isFetched,
  isFetchedAfterMount,
  isFetching,
  isInitialLoading,
  isLoading,
  isLoadingError,
  isPaused,
  isPending,
  isPlaceholderData,
  isRefetchError,
  isRefetching,
  isStale,
  isSuccess,
  promise,
  refetch,
  status,
} = useQuery(
  {
    queryKey,
    queryFn,
    gcTime,
    enabled,
    networkMode,
    initialData,
    initialDataUpdatedAt,
    notifyOnChangeProps,
    placeholderData,
    queryKeyHashFn,
    refetchInterval,
    refetchIntervalInBackground,
    refetchOnMount,
    refetchOnReconnect,
    refetchOnWindowFocus,
    retry,
    retryOnMount,
    retryDelay,
    select,
    staleTime,
    structuralSharing,
    throwOnError,
    meta,
  },
  // 没有时获取通过项目入口配置 QueryPlugin
  queryClient,
)
```

# useQuery 参数文档

| 参数名                           | 类型                                                                                         | 默认值             | 描述                                                                                                                                                                                     |
|-------------------------------|--------------------------------------------------------------------------------------------|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `queryKey`                    | `unknown[]`                                                                                | 必须传入            | 查询索引 建议使用这种格式: [名称， ...params]，可以传递响应式数据                                                                                                                                               |
| `queryFn`                     | `(context: QueryFunctionContext) => Promise<TData>`                                        | 必须传入            | 获取数据方法, QueryFunctionContext 为useQuery 的配置项目，需要正确的抛出错误，且不能返回 undefined.                                                                                                                |
| `enabled`                     | `boolean  \| (query: Query) => boolean`                                                    | `true`          | 设置为 false 可禁止此查询自动运行, 可以实现依赖查询, 可以传递响应式数据                                                                                                                                              |
| `networkMode`                 | `'online' \| 'always' \| 'offlineFirst'`                                                   | `online`        | 当 queryFn 不发送请求时，比如调用别的异步方法，可以设置为 always                                                                                                                                               |
| `retry`                       | `boolean \| number \| (failureCount: number, error: TError) => boolean`                    | `3`             | 错误重试次数                                                                                                                                                                                 |
| `retryOnMount`                | `boolean`                                                                                  | `true`          | 如果设置为 false，则如果查询包含错误，则不会在 mount 时重试查询。                                                                                                                                                |
| `retryDelay`                  | `number  \| (retryAttempt: number, error: TError) => number`                               | `0`             | 错误重试下次请求间隔时间                                                                                                                                                                           |
| `staleTime`                   | `number  \| ((query: Query) => number)`                                                    | `0`             | 数据过期时间，在这个时间内不会自动触发请求 ，过期后数据会被标记为不新鲜，query 会重新获取数据。                                                                                                                                    |
| `gcTime`                      | `number \   Infinity`                                                                      | `5 * 60 * 1000` | 当查询的数据未使用或不活动时，指定垃圾回收时间                                                                                                                                                                |
| `queryKeyHashFn`              | `(queryKey: QueryKey) => string`                                                           |                 | 指定 queryKey 系列化的方法                                                                                                                                                                     |
| `refetchInterval`             | `number   \| false \| ((query: Query) => number \| false \| undefined)`                    |                 | 轮询时间间隔                                                                                                                                                                                 |
| `refetchIntervalInBackground` | `boolean`                                                                                  |                 | 浏览器切换到后台时是否继续轮询                                                                                                                                                                        |
| `refetchOnMount`              | `boolean\| "always"\| ((query: Query) => boolean \| "always")`                             | `true`          | 设置为true，则当数据过时时，查询将在挂载时重新获取。设置为false，则查询将不会在挂载时重新获取。设置为“always”，查询将始终在挂载时重新获取。设置为函数，则该函数将与查询一起执行以计算值                                                                                   |
| `refetchOnWindowFocus`        | `boolean\| "always"\| ((query: Query) => boolean \| "always")`                             | `true`          | 如果设置为true，当数据过时时，查询将在窗口焦点上重新获取。如果设置为false，查询将不会在窗口焦点上重新获取。如果设置为“always”，查询将始终在窗口焦点上重新获取。如果设置为函数，则该函数将与查询一起执行以计算值                                                                       |
| `refetchOnReconnect`          | `boolean\| "always"\| ((query: Query) => boolean \| "always")`                             | `true`          | 如果设置为true，则当数据过时时，查询将在重新连接时重新获取。如果设置为false，则查询将不会在重新连接时重新获取。如果设置为“always”，查询将始终在重新连接时重新获取。如果设置为函数，则该函数将与查询一起执行以计算值 the function will be executed with the query to compute the value.  |
| `notifyOnChangeProps`         | `string[]\| "all" \| (() => string[] \| "all" \| undefined)`                               |                 | 如果设置，则仅当列出的任何属性发生变化时，组件才会重新渲染。例如，如果设置为['data', 'error'] ，则仅当数据或错误属性发生变化时，组件才会重新渲染。如果设置为“全部”，则组件将退出智能跟踪并在查询更新时重新渲染。如果设置为函数，则将执行该函数来计算属性列表。默认情况下，对属性的访问将被跟踪，并且仅当其中一个跟踪的属性发生变化时，组件才会重新渲染。 |
| `select`                      | `(data: TData) => unknown`                                                                 |                 | 对查询到的数据进行转换，不会影响到缓存中数据                                                                                                                                                                 |
| `suspense`                    | `boolean`                                                                                  |                 | suspense 模式                                                                                                                                                                            |
| `initialData`                 | `TData\| () => TData`                                                                      |                 | 该值将用作查询缓存的初始数据（只要查询尚未创建或缓存）如果设置为函数，该函数将在共享/根查询初始化期间被调用一次，并有望同步返回初始数据除非设置了staleTime，否则初始数据默认被视为过时数据。initialData 被持久化到缓存中                                                                |
| `initialDataUpdatedAt`        | `number\| (() => number \| undefined)`                                                     |                 | 该值将用作 initialData本身最后更新的时间                                                                                                                                                             |
| `placeholderData`             | `TData\| (previousValue: TData \| undefined; previousQuery: Query \| undefined,) => TData` |                 | 当查询仍处于(isPending=true)待处理状态时，该值将用作此特定查询观察者的占位符数据。placeholderData不会持久保存到缓存中如果为placeholderData提供一个函数，则第一个参数是之前监视的查询数据（如果可用），第二个参数是完整的 previousQuery 实例。                                  |
| `structuralSharing`           | `boolean\| (oldData: unknown\| undefined, newData: unknown) => unknown)`                   | `true`          | 性能优化，减少不必要渲染                                                                                                                                                                           |
| `throwOnError`                | `undefined\| boolean \| (error: TError, query: Query) => boolean`                          |                 | 如果希望在渲染阶段抛出错误并传播到最近的错误边界，请将其设置为true                                                                                                                                                    |
| `meta`                        | `Record<string, unknown>`                                                                  |                 | 附加数据                                                                                                                                                                                   |

### 常用返回值说明

| 字段名                   | Type                                                                                      | Description                                                                                                  |
|-----------------------|-------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------|
| `status`              | `Ref<QueryStatus>`                                                                        | pending: 没有缓存且查询尚未完成; error: 查询错误; success: 请求成功，有initialData时也是返回true                                       |
| `isPending`           | `Ref<boolean>`                                                                            | status 状态的衍生值                                                                                                |
| `isSuccess`           | `Ref<boolean>`                                                                            | status 状态的衍生值                                                                                                |
| `isError`             | `Ref<boolean>`                                                                            | status 状态的衍生值                                                                                                |
| `isLoadingError`      | `Ref<boolean>`                                                                            | 首次查询失败时                                                                                                      |
| `isRefetchError`      | `Ref<boolean>`                                                                            | 执行 refetch 失败时                                                                                               |
| `data`                | `Ref<TData>`                                                                              | queryKey 对应查询返回的值，注意：enabled 为 false 时不影响这个值                                                                 |
| `dataUpdatedAt`       | `Ref<number>`                                                                             | 查询最近返回状态为 “success” 的时间戳 .                                                                                   |
| `error`               | `Ref<null\| TError>`                                                                      | 查询的错误对象                                                                                                      |
| `errorUpdatedAt`      | `Ref<number>`                                                                             | 查询最近返回状态为 “error” 的时间戳。                                                                                      |
| `isStale`             | `Ref<boolean>`                                                                            | 如果缓存中的数据无效或数据早于给定的 staleTime，是否过期（enabled为false时，这个值始终为false），则为 true                                        |
| `isPlaceholderData`   | `Ref<boolean>`                                                                            | 如果显示的数据是占位符数据，则为 true                                                                                        |
| `isFetched`           | `Ref<boolean>`                                                                            | 如果已获取查询，则为 true.                                                                                             |
| `isFetchedAfterMount` | `Ref<boolean>`                                                                            | 如果在安装组件后已获取查询，则为 true。此属性可用于不显示任何以前缓存的数据                                                                     |
| `fetchStatus`         | `Ref<FetchStatus>`                                                                        | fetching: 每当 queryFn 正在执行时为 true，其中包括初始待处理和后台重新获取; paused: 查询已被暂停; idle: 请求空闲中                               |
| `isFetching`          | `Ref<boolean>`                                                                            | fetchStatus 状态的衍生值                                                                                           |
| `isPaused`            | `Ref<boolean>`                                                                            | fetchStatus 状态的衍生值                                                                                           |
| `isRefetching`        | `Ref<boolean>`                                                                            | fetchStatus 状态的衍生值                                                                                           |
| `isLoading`           | `Ref<boolean>`                                                                            | 每当查询的第一次获取在进行中时为 true, 与 isFetching & isPending 相同                                                           |
| `failureCount`        | `Ref<number>`                                                                             | 失败次数，每次失败都会增加，查询成功时重置 0                                                                                      |
| `failureReason`       | `Ref<null\| TError>`                                                                      | 查询重试的失败原因。查询成功时重置为 null。                                                                                     |
| `errorUpdateCount`    | `Ref<number>`                                                                             | 所有错误的总和                                                                                                      |
| `refetch`             | `(options: { throwOnError: boolean, cancelRefetch: boolean }) => Promise<UseQueryResult>` | 手动重新查询， throwOnError: 默认 false, 如果想要refetch方法抛出捕获设置throwOnError: true 选项 ；cancelRefetch: 默认：true，是否覆盖正在进行的请求 |
| `promise`             | `Ref<Promise<TData>>`                                                                     | 查询queryFn的Promise                                                                                            |
| `suspense`            | `Promise<TData>`                                                                          | suspense 模式                                                                                                  |

常用的配置项 queryKey, queryFn, enabled, initialData,

### enabled 依赖查询

```jsx
import { useQuery } from 'zan-mixin-query'
import { compile } from 'vue'

const isEnabled = ref(false)
const props = defineProps()
const { data, isLoading, error, isError } = useQuery({
  queryKey: ['user', props.id],
  queryFn({ queryKey }) {
    return server.getUser(queryKey[1])
  },
  // 直接绑定响应式数据
  enabled: compile(() => isEnabled.value && !!props.id)
  // 使用函数
  /*enabled() {
   return isEnabled.value && !!props.id
   }*/
})

```

```vue

<script>
  export default {
    name: "UserInfo",
    props: {
      id: Number
    },
    async setup(props) {
      const { data, suspense } = useQuery({
        queryKey: ['user', props.id],
        queryFn({ queryKey }) {
          return server.getUser(queryKey[1])
        },
        suspense: true
      })

      await suspense()
      return {
        // data 必存在
        data
      }
    }
  }
</script>

```

## useInfiniteQuery部分参数

| 字段名                    | 类型                                                                                        | 必填 | 描述                                                                                                                         |
|------------------------|-------------------------------------------------------------------------------------------|----|----------------------------------------------------------------------------------------------------------------------------|
| `queryKey`             | `QueryKey`                                                                                | 是  | 用于生成查询选项的查询键， 参数会由pageParam。                                                                                               |
| `queryFn`              | `(context: QueryFunctionContext) => Promise`                                              | 是  | 查询将用于请求数据的函数。接收一个 `QueryFunctionContext`，必须返回一个 Promise，该 Promise 要么解析数据，要么抛出错误。                                           |
| `initialPageParam`     | `TPageParam`                                                                              | 是  | 获取第一页时使用的默认页面参数。                                                                                                           |
| `getNextPageParam`     | `(lastPage, allPages, lastPageParam, allPageParams) => TPageParam \| undefined \| null`   | 是  | 当为此查询接收到新数据时，此函数接收无限数据列表的最后一页和所有页面的完整数组，以及 `pageParam` 信息。应返回一个变量，该变量将作为最后一个可选参数传递给查询函数。返回 `undefined` 或 `null` 表示没有下一页可用。 |
| `getPreviousPageParam` | `(firstPage, allPages, firstPageParam, allPageParams) => TPageParam \| undefined \| null` | 否  | 当为此查询接收到新数据时，此函数接收无限数据列表的第一页和所有页面的完整数组，以及 `pageParam` 信息。应返回一个变量，该变量将作为最后一个可选参数传递给查询函数。返回 `undefined` 或 `null` 表示没有上一页可用。  |
| `maxPages`             | `number \| undefined`                                                                     | 否  | 在无限查询数据中存储的最大页面数。当达到最大页面数时，获取新页面将导致从页面数组中删除第一页或最后一页，具体取决于指定的方向。如果未定义或等于 0，则页面数无限制。默认值为 `undefined`。                        |

## useInfiniteQuery返回值部分参数

| 字段名                        | 类型                                                | 描述                                                 |
|----------------------------|---------------------------------------------------|----------------------------------------------------|
| `data.pages`               | `Ref<TData[]>`                                    | 包含所有页面的数据的数组。                                      |
| `data.pageParams`          | `unknown[]`                                       | 包含所有页面的参数的数组。                                      |
| `fetchNextPage`            | `(options?: FetchNextPageOptions) => Promise`     | 该函数用于获取下一页的结果。                                     |
| `fetchPreviousPage`        | `(options?: FetchPreviousPageOptions) => Promise` | 该函数用于获取上一页的结果。                                     |
| `hasNextPage`              | `Ref<boolean>`                                    | 如果有下一页可获取，则为 `true`。                               |
| `hasPreviousPage`          | `Ref<boolean>`                                    | 如果有上一页可获取，则为 `true`。                               |
| `isFetchingNextPage`       | `Ref<boolean>`                                    | 当正在使用 `fetchNextPage` 获取下一页时为 `true`。              |
| `isFetchingPreviousPage`   | `Ref<boolean>`                                    | 当正在使用 `fetchPreviousPage` 获取上一页时为 `true`。          |
| `isFetchNextPageError`     | `Ref<boolean>`                                    | 如果在获取下一页时查询失败，则为 `true`。                           |
| `isFetchPreviousPageError` | `Ref<boolean>`                                    | 如果在获取上一页时查询失败，则为 `true`。                           |
| `isRefetching`             | `Ref<boolean>`                                    | 当后台重新获取数据时为 `true`，不包括初始挂起或获取下一页或上一页的情况。           |
| `isRefetchError`           | `Ref<boolean>`                                    | 如果在重新获取页面时查询失败，则为 `true`。                          |
| `promise`                  | `Ref<Promise>`                                    | 一个稳定的 Promise，解析为查询结果。可以与 `React.use()` 一起使用以获取数据。 |

这些字段是 `useInfiniteQuery` 返回的属性，帮助你管理和获取无限滚动或分页数据。

这些字段是 `useInfiniteQuery` 钩子中可用的选项和参数。根据需要配置这些字段以实现无限滚动或分页功能。

## useInfiniteQuery 使用介绍

```vue

<script setup>
  import { computed } from 'vue'

  const {
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    promise,
    data,
    isLoading,
    isError,
    error
  } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => fetchPage(pageParam).then(res => {
      return {
        // 当前页
        current,
        // 总页数
        pages,
        // 列表项
        records,
        // 分页大小
        size,
        // 总数量
        total,
      }
    }),
    initialPageParam: 1,
    ...queryOptions,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      if (lastPage.pages > lastPage.current) {
        return lastPageParam + 1
      }
      return false
    },
    getPreviousPageParam: (firstPage, allPages, firstPageParam, allPageParams) =>
      firstPage.prevCursor,
  })

  const allList = computed(() => data.pages?.map(i => i.records).flat())

</script>
<template>
  <div v-if="isLoading">loading ...</div>
  <div v-if="isError">{{ error }}</div>
  <ul v-if="data?.pages">
    <li v-for="user in allList" :key="user.id">
      {{user.name}}
    </li>
    <li v-if="hasNextPage">
      <el-button :disabled="isFetchingNextPage"
                 :loading="isFetchingNextPage"
                 @click="fetchNextPage">
        {{ isFetchingNextPage ? '获取中...' : '获取下一页' }}
      </el-button>
    </li>
    <li v-else>
      <el-button :disabled="isFetchingNextPage" :loading="isRefetching"
                 @click="refetch">
        {{ isRefetching ? '更新中...' : '更新页面' }}
      </el-button>
    </li>
  </ul>
</template>

```

## QueryClient 实例: useQueryClient

queryClient 主要用来操作缓存数据，获取数据等方法

```jsx
const queryClient = useQueryClient()
// 预请求查询数据, 与useQuery参数基本一样
queryClient.prefetchQuery({ queryKey, queryFn })
// 预请求Infinit查询预请求 与 useInfiniteQuery 参数基本一样
queryClient.prefetchInfiniteQuery({ queryKey, queryFn })
// 更新查询数据
queryClient.setQueryData(queryKey, updateData)
// 获取查询数据
queryClient.getQueryData(queryKey)
// 使查询的数据立即失效
await queryClient.invalidateQueries({ queryKey: ['posts'] },)
// 删除查询数据
queryClient.removeQueries({ queryKey, exact: true })
```

## 参数介绍

| 字段名            | 类型                                                                                   | 必填 | 描述                                                                            |
|----------------|--------------------------------------------------------------------------------------|----|-------------------------------------------------------------------------------|
| `mutationFn`   | `(variables: TVariables) => Promise`                                                 | 是  | 执行异步任务并返回 Promise 的函数。`variables` 是一个对象，将传递给 `mutationFn`。                    |
| `gcTime`       | `number \| Infinity`                                                                 | 否  | 未使用/非活动缓存数据在内存中保留的时间（毫秒）。当设置为 `Infinity` 时，将禁用垃圾回收。                           |
| `mutationKey`  | `unknown[]`                                                                          | 否  | 可选的 mutation 键，可以用于继承通过 `queryClient.setMutationDefaults` 设置的默认值。             |
| `networkMode`  | `'online' \| 'always' \| 'offlineFirst'`                                             | 否  | 默认为 `'online'`，用于指定网络模式。                                                      |
| `onMutate`     | `(variables: TVariables) => Promise \| TContext \| void`                             | 否  | 在 mutation 函数执行之前触发的函数，接收与 mutation 函数相同的变量。可用于执行乐观更新。                        |
| `onSuccess`    | `(data: TData, variables: TVariables, context: TContext) => unknown`                 | 否  | 当 mutation 成功时触发的函数，接收 mutation 的结果。                                          |
| `onError`      | `(err: TError, variables: TVariables, context?: TContext) => unknown`                | 否  | 当 mutation 遇到错误时触发的函数，接收错误信息。                                                 |
| `onSettled`    | `(data: TData, error: TError, variables: TVariables, context?: TContext) => unknown` | 否  | 当 mutation 成功或遇到错误时触发的函数，接收数据或错误信息。                                           |
| `retry`        | `boolean \| number \| (failureCount: number, error: TError) => boolean`              | 否  | 默认为 `0`。如果为 `false`，则失败的 mutation 不会重试；如果为 `true`，则无限重试；如果为数字，则重试直到失败次数达到该数字。 |
| `retryDelay`   | `number \| (retryAttempt: number, error: TError) => number`                          | 否  | 接收重试尝试次数和实际错误，返回下次尝试前的延迟时间（毫秒）。                                               |
| `scope`        | `{ id: string }`                                                                     | 否  | 默认为唯一 ID（所有 mutation 并行运行）。具有相同 scope ID 的 mutation 将串行运行。                    |
| `throwOnError` | `undefined \| boolean \| (error: TError) => boolean`                                 | 否  | 默认为全局查询配置的 `throwOnError` 值。设置为 `true` 时，mutation 错误将在渲染阶段抛出并传播到最近的错误边界。      |
| `meta`         | `Record`                                                                             | 否  | 如果设置，将在 mutation 缓存条目中存储附加信息，可在需要时使用。                                         |

## 返回值介绍

| 字段名             | 类型                                                                                | 必填 | 描述                                                       |
|-----------------|-----------------------------------------------------------------------------------|----|----------------------------------------------------------|
| `data`          | `undefined\| TData`                                                               | 否  | 最后成功解析的 mutation 数据。默认值为 `undefined`。                    |
| `error`         | `null\| TError`                                                                   | 否  | 如果遇到错误，则为 mutation 的错误对象。                                |
| `isIdle`        | `boolean`                                                                         | 否  | 如果 mutation 处于初始状态，则为 `true`。                            |
| `isPending`     | `boolean`                                                                         | 否  | 如果 mutation 当前正在执行，则为 `true`。                            |
| `isPaused`      | `boolean`                                                                         | 否  | 如果 mutation 已被暂停，则为 `true`。                              |
| `isSuccess`     | `boolean`                                                                         | 否  | 如果最后一次 mutation 尝试成功，则为 `true`。                          |
| `status`        | `string`                                                                          | 否  | mutation 的当前状态，可以是 `idle`、`pending`、`error` 或 `success`。 |
| `submittedAt`   | `number`                                                                          | 否  | mutation 提交的时间戳。默认值为 `0`。                                |
| `variables`     | `undefined\| TVariables`                                                          | 否  | 传递给 mutationFn 的变量对象。默认值为 `undefined`。                   |
| `failureCount`  | `number`                                                                          | 否  | mutation 的失败计数。每次 mutation 失败时递增。成功时重置为 `0`。             |
| `failureReason` | `null\| TError`                                                                   | 否  | mutation 重试的失败原因。成功时重置为 `null`。                          |
| `reset`         | `() => void`                                                                      | 否  | 清除 mutation 内部状态的函数（即将 mutation 重置为其初始状态）。               |
| `mutate`        | `(variables: TVariables, options?: { onSuccess, onSettled, onError }) => void`    | 是  | 触发 mutation 的函数，可以传递变量和可选的回调选项。                          |
| `mutateAsync`   | `(variables: TVariables, options?: { onSuccess, onSettled, onError }) => Promise` | 否  | 类似于 `mutate`，但返回一个可以被等待的 Promise。                        |

这些字段是 `useMutation` 返回的属性，帮助你管理和获取 mutation 的状态和结果。
这些字段是 `useMutation` 钩子中可用的选项和参数，帮助你配置和管理 mutation 操作。

## useMutation 使用介绍

```jsx
const {
  data,
  error,
  isError,
  isIdle,
  isPending,
  isPaused,
  isSuccess,
  failureCount,
  failureReason,
  mutate,
  mutateAsync,
  reset,
  status,
  submittedAt,
  variables,
} = useMutation(
  {
    // 请求函数，(必填)
    mutationFn,
    gcTime,
    meta,
    // 配合queryClient.setMutationDefaults使用(很少用)
    mutationKey,
    networkMode,
    // 请求错误时触发，可以做错误提示，或者覆写表单的错误验证
    onError,
    // 发送请求前触发，可以进行乐观更新（表单点击保存=>更新缓存=>请求失败数据回退）
    onMutate,
    // 请求成功或者失败都触发，可以在这刷新数据
    onSettled,
    // 请求成功触发，可以在这做操作提示或者返回页面
    onSuccess,
    // 默认 0
    retry,
    retryDelay,
    scope,
    throwOnError,
  },
  queryClient,
)

mutate(variables, {
  onError,
  onSettled,
  onSuccess,
})

```
