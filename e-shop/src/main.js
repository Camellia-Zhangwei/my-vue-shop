// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './routers'

import './assets/styles/common.css'

// 按需引入Vant组件
import { 
  Button, NavBar, Tabbar, TabbarItem, Swipe, SwipeItem, Grid, GridItem, Divider, Search, Tag, Empty, Checkbox, CheckboxGroup, SwipeCell, SubmitBar, ActionBar, ActionBarIcon, ActionBarButton, Toast, Dialog, Icon, Cell, CellGroup, Stepper, Badge, List, PullRefresh, Tab, Tabs, Field, Form, Card,
  Sidebar, SidebarItem, Loading, ImagePreview
} from 'vant'

// 引入Vant样式
import 'vant/lib/index.css'

// 创建Vue实例
const app = createApp(App)
const pinia = createPinia()

// 修正: 正确注册Vant组件 - 直接调用组件函数
[
  Button, NavBar, Tabbar, TabbarItem, Swipe, SwipeItem, Grid, GridItem, Divider, Search, Tag, Empty, Checkbox, CheckboxGroup, SwipeCell, SubmitBar, ActionBar, ActionBarIcon, ActionBarButton, Icon, Cell, CellGroup, Stepper, Badge, List, PullRefresh, Tab, Tabs, Field, Form, Card,
  Sidebar, SidebarItem, Loading
].forEach(component => {
  component(app) // 这是关键！
})

// 全局注册Toast、Dialog、ImagePreview
app.config.globalProperties.$toast = Toast
app.config.globalProperties.$dialog = Dialog
app.config.globalProperties.$imagePreview = ImagePreview

// 使用Pinia和Router
app.use(pinia)
app.use(router)

// 挂载应用
app.mount('#app')

// 全局错误处理
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue error:', err)
  console.error('Error info:', info)
}