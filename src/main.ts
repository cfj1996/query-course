import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { QueryPlugin } from 'zan-mixin-query'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './index.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

const app = createApp(App)

app.use(router).use(QueryPlugin).use(ElementPlus)

app.mount('#app')
