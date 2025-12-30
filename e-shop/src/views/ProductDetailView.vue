<!-- src/views/ProductDetailView.vue -->
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/product.store'
import { useCartStore } from '@/stores/cart.store'
import { Toast } from 'vant'
import AppNavbar from '@/components/AppNavbar.vue'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const cartStore = useCartStore()

const product = ref(null)
const quantity = ref(1)
const showAddToCart = ref(false)

const loadProduct = () => {
  const productId = parseInt(route.params.id)
  const foundProduct = productStore.getProductById(productId)
  if (foundProduct) {
    product.value = {
      ...foundProduct,
      specs: foundProduct.specs || [],
      details: foundProduct.details || []
    }
  } else {
    Toast('商品不存在')
    // 修正: 如果没有历史记录，则跳转到首页
    if (window.history.state && window.history.state.back) {
      router.back()
    } else {
      router.push('/')
    }
  }
}

const addToCart = () => {
  if (product.value) {
    cartStore.addToCart({
      id: product.value.id,
      name: product.value.name,
      price: product.value.price,
      image: product.value.image,
      quantity: quantity.value
    })
    Toast.success('已加入购物车')
    showAddToCart.value = false
  }
}

const buyNow = () => {
  if (product.value) {
    cartStore.setCheckoutItems([{
      id: product.value.id,
      name: product.value.name,
      price: product.value.price,
      image: product.value.image,
      quantity: quantity.value
    }])
    router.push('/cart')
  }
}

onMounted(() => {
  loadProduct()
})
</script>

<template>
  <div class="product-detail-view" v-if="product">
    <!-- 导航栏 -->
    <AppNavbar title="商品详情" />

    <!-- 商品图片 -->
    <div class="product-image">
      <img :src="product.image" :alt="product.name" />
    </div>

    <!-- 商品信息 -->
    <div class="product-info">
      <h2>{{ product.name }}</h2>
      <p class="price">¥{{ product.price }}</p>
      <p class="description">{{ product.description }}</p>
      
      <!-- 规格选择 -->
      <div v-if="product.specs.length > 0" class="specs-section">
        <h4>规格</h4>
        <div class="specs">
          <van-button
            v-for="spec in product.specs"
            :key="spec"
            size="small"
            type="primary"
            plain
          >
            {{ spec }}
          </van-button>
        </div>
      </div>

      <!-- 数量选择 -->
      <div class="quantity-section">
        <h4>数量</h4>
        <van-stepper v-model="quantity" integer min="1" max="99" />
      </div>
    </div>

    <!-- 商品详情 -->
    <div class="product-details">
      <h3>商品详情</h3>
      <div v-for="(detail, index) in product.details" :key="index" class="detail-item">
        <img :src="detail" alt="Detail" />
      </div>
    </div>

    <!-- 底部操作栏 -->
    <van-action-bar safe-area-inset-bottom>
      <van-action-bar-icon icon="chat-o" text="客服" />
      <van-action-bar-icon icon="cart-o" text="购物车" @click="router.push('/cart')" />
      <van-action-bar-button type="warning" text="加入购物车" @click="showAddToCart = true" />
      <van-action-bar-button type="danger" text="立即购买" @click="buyNow" />
    </van-action-bar>

    <!-- 加入购物车确认弹窗 -->
    <van-dialog
      v-model:show="showAddToCart"
      title="加入购物车"
      show-cancel-button
      confirm-button-text="确定"
      @confirm="addToCart"
    >
      <p>确定要将 "{{ product.name }}" 加入购物车吗？</p>
      <p>数量: {{ quantity }}</p>
    </van-dialog>
  </div>
</template>

<style scoped>
.product-detail-view {
  padding-bottom: 50px;
}

.product-image img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.product-info {
  padding: 20px;
  background: white;
}

.product-info h2 {
  font-size: 18px;
  margin-bottom: 10px;
}

.price {
  color: #ee0a24;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.description {
  color: #666;
  margin-bottom: 20px;
}

.specs-section, .quantity-section {
  margin-bottom: 20px;
}

.specs-section h4, .quantity-section h4 {
  margin-bottom: 10px;
}

.specs {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.product-details {
  padding: 20px;
  background: white;
  margin-top: 10px;
}

.product-details h3 {
  margin-bottom: 15px;
}

.detail-item img {
  width: 100%;
  margin-bottom: 10px;
  border-radius: 8px;
}
</style>