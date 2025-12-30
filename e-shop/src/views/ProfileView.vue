<!-- src/views/ProfileView.vue -->
<script setup>
defineOptions({ name: 'ProfileView' })

import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.store'
import AppNavbar from '@/components/AppNavbar.vue'
import AppFooter from '@/components/AppFooter.vue'
import { Dialog, Toast } from 'vant'

const router = useRouter()
const userStore = useUserStore()

// 修正: 优化计算属性
const isLoggedIn = computed(() => userStore.isLoggedIn)
const userName = computed(() => isLoggedIn.value ? (userStore.userInfo?.username || '用户') : '未登录用户')
const userAvatar = computed(() => isLoggedIn.value ? (userStore.userInfo?.avatar || 'https://via.placeholder.com/100/cccccc/ffffff?text=User') : 'https://via.placeholder.com/100/cccccc/ffffff?text=User')
const userId = computed(() => isLoggedIn.value ? (userStore.userInfo?.id?.toString() || '000000') : '000000')

const profileItems = [
  { icon: 'location-o', text: '收货地址', path: '/profile/address' },
  { icon: 'coupon-o', text: '我的优惠券', path: '/profile/coupons' },
  { icon: 'gift-o', text: '我的积分', path: '/profile/points' },
  { icon: 'setting-o', text: '设置', path: '/profile/settings' }
]

const orderItems = [
  { icon: 'pending-payment', text: '待付款', count: 0, path: '/orders?status=pending' },
  { icon: 'send-gift-o', text: '待发货', count: 0, path: '/orders?status=shipped' },
  { icon: 'logistics', text: '待收货', count: 0, path: '/orders?status=delivered' },
  { icon: 'comment-o', text: '待评价', count: 0, path: '/orders?status=review' }
]

const handleLogin = () => {
  router.push('/login')
}

const handleLogout = () => {
  Dialog.confirm({
    title: '确认退出',
    message: '确定要退出登录吗？'
  }).then(() => {
    userStore.logout()
    Toast('已退出登录')
  }).catch(() => {
    // 取消
  })
}

const navigateTo = (path) => {
  if (!isLoggedIn.value) {
    handleLogin()
    return
  }
  router.push(path)
}
</script>

<template>
  <div class="profile-view">
    <!-- 导航栏 -->
    <AppNavbar title="个人中心" />

    <!-- 用户信息区域 -->
    <div class="user-info" @click="isLoggedIn ? null : handleLogin()">
      <img :src="userAvatar" alt="头像" class="avatar" />
      <div class="user-details">
        <h2>{{ userName }}</h2>
        <p>ID: {{ userId }}</p>
      </div>
      <van-icon name="arrow" />
    </div>

    <!-- 订单快捷入口 -->
    <div class="order-section">
      <h3>我的订单</h3>
      <div class="order-grid">
        <div
          v-for="item in orderItems"
          :key="item.text"
          class="order-item"
          @click="navigateTo(item.path)"
        >
          <van-icon :name="item.icon" size="24" />
          <span>{{ item.text }}</span>
          <van-badge v-if="item.count > 0" :content="item.count" />
        </div>
      </div>
    </div>

    <!-- 功能列表 -->
    <div class="profile-section">
      <div
        v-for="item in profileItems"
        :key="item.text"
        class="profile-item"
        @click="navigateTo(item.path)"
      >
        <van-icon :name="item.icon" size="20" />
        <span>{{ item.text }}</span>
        <van-icon name="arrow" />
      </div>
    </div>

    <!-- 退出登录按钮 -->
    <div v-if="isLoggedIn" class="logout-section">
      <van-button block type="danger" @click="handleLogout">退出登录</van-button>
    </div>

    <!-- 底部导航 -->
    <AppFooter />
  </div>
</template>

<style scoped>
.profile-view {
  padding-bottom: 50px;
}

.user-info {
  display: flex;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  cursor: pointer;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
  object-fit: cover;
}

.user-details h2 {
  font-size: 18px;
  margin-bottom: 5px;
}

.order-section {
  padding: 20px;
  background: white;
  margin-top: 10px;
}

.order-section h3 {
  margin-bottom: 15px;
  font-size: 16px;
}

.order-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  text-align: center;
}

.order-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.profile-section {
  padding: 10px 20px;
  background: white;
  margin-top: 10px;
}

.profile-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.profile-item:last-child {
  border-bottom: none;
}

.profile-item van-icon:first-child {
  margin-right: 15px;
  color: #1989fa;
}

.profile-item van-icon:last-child {
  margin-left: auto;
  color: #999;
}

.logout-section {
  padding: 20px;
}
</style>