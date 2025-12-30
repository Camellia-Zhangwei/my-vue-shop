// src/routers/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user.store'
import { Toast } from 'vant'

const HomeView = () => import('@/views/HomeView.vue')
const CategoryView = () => import('@/views/CategoryView.vue')
const ProductDetailView = () => import('@/views/ProductDetailView.vue')
const CartView = () => import('@/views/CartView.vue')
const ProfileView = () => import('@/views/ProfileView.vue')
const OrderView = () => import('@/views/OrderView.vue')
const LoginView = () => import('@/views/LoginView.vue')

const routes = [
  { path: '/', name: 'Home', component: HomeView, meta: { title: 'E-Shop - 首页', requiresAuth: false, showFooter: true, keepAlive: true } },
  { path: '/category', name: 'Category', component: CategoryView, meta: { title: 'E-Shop - 分类', requiresAuth: false, showFooter: true, keepAlive: true } },
  { path: '/product/:id', name: 'ProductDetail', component: ProductDetailView, meta: { title: 'E-Shop - 商品详情', requiresAuth: false, showFooter: false, keepAlive: false }, props: true },
  { path: '/cart', name: 'Cart', component: CartView, meta: { title: 'E-Shop - 购物车', requiresAuth: false, showFooter: true, keepAlive: false } },
  { path: '/profile', name: 'Profile', component: ProfileView, meta: { title: 'E-Shop - 个人中心', requiresAuth: false, showFooter: true, keepAlive: true } },
  { path: '/orders', name: 'Orders', component: OrderView, meta: { title: 'E-Shop - 我的订单', requiresAuth: true, showFooter: false, keepAlive: false } },
  { path: '/login', name: 'Login', component: LoginView, meta: { title: 'E-Shop - 登录', requiresAuth: false, showFooter: false, keepAlive: false } },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 全局路由守卫
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  // ⚠️ 关键修正：必须 await checkAuth()
  if (!userStore.isLoggedIn) {
    await userStore.checkAuth()
  }

  if (to.meta.title) {
    document.title = to.meta.title
  }

  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    Toast({ message: '请先登录', duration: 1500 })
    next('/login')
    return
  }

  if (to.name === 'Login' && userStore.isLoggedIn) {
    Toast({ message: '您已登录', duration: 1500 })
    next('/')
    return
  }

  next()
})

export default router