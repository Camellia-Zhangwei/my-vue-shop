<!-- src/views/CartView.vue -->
<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart.store'
import { useProductStore } from '@/stores/product.store'
import { Toast, Dialog } from 'vant'
import AppNavbar from '@/components/AppNavbar.vue'
import AppFooter from '@/components/AppFooter.vue'

const router = useRouter()
const cartStore = useCartStore()
const productStore = useProductStore()

const refreshing = ref(false)
const checkoutLoading = ref(false)

const cartItems = computed(() => cartStore.cartItems)
const selectedItems = computed(() => cartStore.selectedItems)
const totalAmount = computed(() => cartStore.totalAmount)
const hasItems = computed(() => cartItems.value.length > 0)
const isAllSelected = computed(() => cartStore.isAllSelected)
const selectedItemsCount = computed(() => selectedItems.value.length)

const isItemSelected = (itemId) => cartStore.isItemSelected(itemId)
const toggleSelectItem = (itemId) => cartStore.toggleSelectItem(itemId)
const toggleSelectAll = () => cartStore.toggleSelectAll()
const updateQuantity = (itemId, quantity) => cartStore.updateQuantity(itemId, quantity)
const removeItem = (itemId) => cartStore.removeItem(itemId)
const handleClearCart = () => cartStore.clearCart()

const goHome = () => router.push('/')
const onRefresh = () => {
  setTimeout(() => {
    refreshing.value = false
  }, 1000)
}

const handleCheckout = () => {
  if (selectedItemsCount.value === 0) {
    Toast('请选择要结算的商品')
    return
  }
  checkoutLoading.value = true
  setTimeout(() => {
    cartStore.checkout()
    checkoutLoading.value = false
    Toast.success('结算成功！')
    router.push('/orders')
  }, 1000)
}
</script>

<template>
  <div class="cart-view">
    <!-- 导航栏 -->
    <AppNavbar title="购物车">
      <template #right v-if="hasItems">
        <van-button size="mini" type="default" @click="handleClearCart" class="clear-button">
          清空
        </van-button>
      </template>
    </AppNavbar>

    <!-- 空购物车状态 -->
    <div v-if="!hasItems" class="empty-cart">
      <van-empty image="cart" description="购物车空空如也">
        <van-button round type="primary" @click="goHome">去首页逛逛</van-button>
      </van-empty>
    </div>

    <!-- 购物车列表 -->
    <div v-else class="cart-content">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <div class="cart-list">
          <div v-for="item in cartItems" :key="item.id" class="cart-item-wrapper">
            <van-checkbox :model-value="isItemSelected(item.id)" @update:model-value="toggleSelectItem(item.id)" class="item-checkbox" />
            <van-card
              :price="item.price"
              :desc="item.description"
              :title="item.name"
              :thumb="item.image"
              class="item-card"
            >
              <template #footer>
                <van-stepper
                  v-model="item.quantity"
                  @change="(value) => updateQuantity(item.id, value)"
                  integer
                  min="1"
                  max="99"
                />
                <van-button size="small" type="danger" @click="removeItem(item.id)" class="delete-btn">
                  删除
                </van-button>
              </template>
            </van-card>
          </div>
        </div>
      </van-pull-refresh>
    </div>

    <!-- 结算栏 -->
    <van-submit-bar
      v-if="hasItems"
      :price="totalAmount * 100"
      button-text="去结算"
      :loading="checkoutLoading"
      @submit="handleCheckout"
      safe-area-inset-bottom
    >
      <van-checkbox v-model="isAllSelected" @click="toggleSelectAll">全选</van-checkbox>
      <template #tip v-if="selectedItemsCount > 0">
        你的收货地址不支持同城送, <span>修改地址</span>
      </template>
    </van-submit-bar>

    <!-- 底部导航 -->
    <AppFooter />
  </div>
</template>

<style scoped>
.cart-view {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f5f5;
}

.empty-cart {
  padding-top: 100px;
  text-align: center;
}

.cart-content {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.cart-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cart-item-wrapper {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 8px;
  padding: 10px;
}

.item-checkbox {
  margin-right: 10px;
}

.item-card {
  flex: 1;
  background: transparent;
}

.delete-btn {
  margin-left: 10px;
}

:deep(.van-submit-bar__tip) {
  padding-bottom: 8px;
}

:deep(.van-submit-bar__tip span) {
  color: #1989fa;
}

:deep(.van-card) {
  padding: 0;
}

:deep(.van-card__footer) {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
}
</style>