import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {
  type AsyncComponentLoader,
  defineAsyncComponent,
  defineComponent,
  h,
  onErrorCaptured,
  ref,
  Suspense,
} from 'vue'
import SuspenseLoading from '@/components/Loading.vue'
import NProgress from 'nprogress'
import ErrorBoundary from '@/components/ErrorBoundary.vue' // ts-disable

const withSuspenseComponent = (getAsyncComponent: AsyncComponentLoader) => {
  const AsyncComp = defineAsyncComponent({
    loader: getAsyncComponent,
    suspensible: true,
  })
  const SuspenseComp = defineComponent({
    setup(_, context) {
      const error = ref<Error | null>(null)
      onErrorCaptured((err) => {
        error.value = err
        console.dir(err)
        return false
      })
      return () =>
        h(
          Suspense,
          {
            timeout: 0,
            onResolve() {
              if (AsyncComp['__asyncResolved']) {
                SuspenseComp.name = AsyncComp['__asyncResolved']?.name
              }
            },
          },
          {
            default: () => {
              if (error.value) {
                return h(ErrorBoundary, {
                  error: error.value,
                  onSuccess() {
                    error.value = null
                  },
                })
              }
              return h(AsyncComp)
            },
            fallback: () => h(SuspenseLoading),
          },
        )
    },
  })
  return SuspenseComp
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/base',
      name: 'base',
      component: () => import('@/views/base/UserList.vue'),
    },
    {
      path: '/base/create',
      name: 'baseCreate',
      component: () => import('@/views/base/CreateUser.vue'),
    },
    {
      path: '/infiniteQuery',
      name: 'infiniteQuery',
      component: () => import('@/views/InfiniteQuery.vue'),
    },
    {
      path: '/base/create/:id',
      name: 'baseUpdate',
      component: () => import('@/views/base/CreateUser.vue'),
    },
    {
      path: '/base/:id',
      name: 'baseUserDetail',
      component: withSuspenseComponent(() => import('@/views/base/detail.vue')),
    },
    {
      path: '/linkQuery',
      name: 'linkQuery',
      component: () => import('@/views/LinkQuery.vue'),
    },
    {
      path: '/suspense',
      name: 'suspenseQuery',
      component: withSuspenseComponent(() => import('@/views/SuspenseQuery.vue')),
    },
  ],
})
router.beforeEach((_to, _from, next) => {
  console.log('1')
  NProgress?.start?.()
  next()
})

router.afterEach((_to) => {
  console.log('2')
  NProgress?.done?.()
})
export default router
